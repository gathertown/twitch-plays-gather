import { API_KEY } from "./api-key";
import { Game, MoveDirection } from "@gathertown/gather-game-client";
global.WebSocket = require("isomorphic-ws");

const SPACE_ID = "oxrhEtb3sV7VutbQ\\GatherOffice";

// setup

const game = new Game(() => Promise.resolve({ apiKey: API_KEY }));
game.connect(SPACE_ID); // replace with your spaceId of choice
game.subscribeToConnection((connected) => console.log("connected?", connected));

//

// listen for chats and move
game.subscribeToEvent("playerChats", (data, _context) => {
	// console.log(data);
	const message = data.playerChats;
	if (message.messageType === "DM") {
		// do something
		switch (message.contents.toLowerCase()) {
			case "up":
				game.move(MoveDirection.Up);
				break;
			case "down":
				game.move(MoveDirection.Down);
				break;
			case "left":
				game.move(MoveDirection.Left);
				break;
			case "right":
				game.move(MoveDirection.Right);
				break;
			case "dance":
				game.move(MoveDirection.Dance);
				break;
			default:
				game.chat(
					message.senderId,
					[],
					"",
					"what? try sending up/down/left/right"
				);
		}
	}
});

// name and status setup
setTimeout(() => {
	game.engine.sendAction({
		$case: "setName",
		setName: {
			name: "Twitchy",
		},
	});
	game.engine.sendAction({
		$case: "setTextStatus",
		setTextStatus: {
			textStatus: "DM me to move!",
		},
	});
}, 2000); // wait two seconds before setting these just to give the game a chance to init
