const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const { parseCookies, setCookie, destroyCookie } = require("nookies");
const cookie = require("cookie");
const { disconnect } = require("process");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

let tokenList = ["d7031c0c-4404-48be-82a2-1c121b4cb985"];

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    let t = v.toString(16);
    return t;
  });
};

const randomFiches = Math.floor(Math.random() * Math.floor(21));
console.log("randomFiches : ", randomFiches);
let players = [
  {
    name: "bot",
    fiches: randomFiches,
    connected: false,
    token: "botToke",
    ready: true,
    socketId: null,
  },
  {
    name: "Jerem",
    fiches: 0,
    connected: true,
    token: "d7031c0c-4404-48be-82a2-1c121b4cb985",
    ready: false,
    socketId: null,
  },
];

io.sockets.on("connect", (socket) => {
  socket.emit("playersList", players);

  socket.on("new_player", (data) => {
    let nameArray = players.reduce((acc, cur) => {
      return [...acc, cur.name];
    }, []);
    let tokenArray = players.reduce((acc, cur) => {
      return [...acc, cur.token];
    }, []);

    const nameIndex = nameArray.indexOf(data.name);
    const tokenIndex = tokenArray.indexOf(data.token);
    if (nameIndex === -1) {
      players.push({
        name: data.name,
        fiches: 0,
        connected: true,
        token: data.token,
        ready: false,
        socketId: socket.id,
      });
      tokenList.push(data.token);
    } else if (tokenList.indexOf(data.token) !== -1) {
      if (tokenIndex !== -1) {
        players[tokenIndex] = {
          name: data.name,
          fiches: players[nameIndex].fiches,
          connected: true,
          token: data.token,
          ready: false,
          socketId: socket.id,
        };
      } else {
        players.push({
          name: data.name + (tokenIndex + 1).toString(),
          fiches: 0,
          connected: true,
          token: data.token,
          ready: false,
          socketId: socket.id,
        });
        tokenList.push(data.token);
      }
    } else {
      players.splice(nameIndex, 1);
    }
    io.emit("playersList", players);
  });

  socket.on("ready_status", ({ ready_status, token }) => {
    for (let i = 0; players[i]; ++i) {
      if (players[i].token === token) {
		players[i].ready = ready_status;
		break;
      }
	}
	io.emit("playersList", players);
	const startGame = players.reduce((acc, cur)=>{
		console.log('acc.ready : ', acc.ready, 'cur.ready : ', cur.ready, 'acc.ready & cur.ready : ', acc.ready & cur.ready)
		return {ready : acc.ready & cur.ready}
	}, {ready: true})
	console.log('game will start : ', startGame)
    
  });

  socket.on("reconnectPlayer", ({ token }) => {
    let change = false;
    for (let i = 0; players[i]; ++i) {
      if (players[i].token === token) {
        players[i].connected = true;
        players[i].socketId = socket.id;
		change = true;
		break;
      }
    }
    if (change === true) {
      io.emit("playersList", players);
    }
  });

  socket.on("disconnect", (err) => {
    let change = false;
    for (let i = 0; players[i]; ++i) {
      if (players[i].socketId === socket.id) {
        players[i].connected = false;
		change = true;
		break;
      }
    }
    if (change === true) {
      io.emit("playersList", players);
    }
  });
});

nextApp.prepare().then((_) => {
  app.get("*", (req, res) => {
    const parsedCookies = parseCookies({ req });
    // console.log('parsed SSR : ', parsedCookies)
    let token =
      !parsedCookies || !parsedCookies.token ? null : parsedCookies.token;
    console.log("SSR token : ", token);
    if (tokenList.indexOf(token) === -1) {
      token = null;
    }
    if (token === null) {
      token = uuidv4();
      tokenList = [...tokenList, token];
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        })
      );
    }

    return nextHandler(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log("ready - started server on http://localhost:3000");
  });
});
