const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const { parseCookies, setCookie, destroyCookie } = require("nookies");
const cookie = require("cookie");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

let tokenList = []

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
	  v = c == "x" ? r : (r & 0x3) | 0x8;
	  let t = v.toString(16)
	  console.log('t : ', t)
	tokenList.push(t)
    return t
  });
};

let players = [];

io.sockets.on("connect", (socket) => {
//   console.log("socket connect : ", socket.id);
  io.emit("playersList", players);

  socket.on("new_player", (data) => {
    let nameArray = players.reduce((acc, cur) => {
      return [...acc, cur.name];
	}, []);
	let tokenArray = players.reduce((acc, cur) => {
		return [...acc, cur.token];
	  }, []);

	const nameIndex = nameArray.indexOf(data.name);
	const tokenIndex = tokenArray.indexOf(data.token)
    if (nameIndex === -1) {
		players.push({
			name: data.name,
			fiches: 0,
			connected: true,
			token: data.token
		});
		tokenList.push(data.token)
    } else if (tokenList.indexOf(data.token) !== -1) {
		if (tokenIndex !== -1){
			players[tokenIndex] = {
				name: data.name,
				fiches: players[nameIndex],
				connected: true,
				token: data.token
			}
		} else {
			players.push({
				name: data.name + (tokenIndex+1).toString(),
				fiches: 0,
				connected: true,
				token: data.token
			});
			tokenList.push(data.token)
		}
    } else {
		players.splice(nameIndex, 1)
	}
	io.emit("playersList", players);
	console.log('tokenList : ', tokenList)
	console.log('players : ', players)
  });

  socket.on("disconnect", (data) => {
    for (var i = 0; players[i]; ++i) {
      if (players[i].id === socket.id) {
        players[i].connected = false;
      }
    }
    console.log("data disconnect: ", data);
    io.emit("playersList", players);
  });
});

nextApp.prepare().then((_) => {
  app.get("*", (req, res) => {
	// const parsedCookies = parseCookies({ req });
	// console.log('parsed SSR : ', parsedCookies)
    if (!parsedCookies || !parsedCookies.token) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", uuidv4(), { maxAge: 30 * 24 * 60 * 60, path: "/" })
      );
    }

    return nextHandler(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log("ready - started server on http://localhost:3000");
  });
});
