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
	console.log("setting name and status");
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
	// game.engine.sendAction({
	// 	$case: "setOutfitString",
	// 	setOutfitString: {
	// 		outfitString:
	// 			'{"skin":{"id":"KPK1RNe5O32vJ8IhOicy","type":"skin","isDefault":true,"color":"3","name":"typical","parts":[{"spritesheet Id":"dQCYs4n7O99ksXuBIe33","layerId":"skin front"}],"previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/BbNpZNRQylqIUmzc2QveW"},"hair":{"id":"oVHqqja061UDjdFbMaXY","type":"hair","color":"purple","previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/_bMY9TZosM6aO3j5uaEDt","parts":[{"layerId":"hair front","spritesheetId":"nxznoKKe5eI2XLkrhU8T"}],"isDefault":true,"name":"messy"},"facial_hair":{},"top":{"id":"1iczssuelMf8BcOMkWjr","parts":[{"layerId":"top front","spritesheetId":"5YkEGqYP4tm6C9J3HBtX"}],"color":"red","name":"shirt (half untucked)","previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/cYsgnqhSKY6JbdRIkX52D","isDefault":true,"type":"top"},"bottom":{"id":"Xx1p8Kjv0qEg6WPV6niD","name":"pants","type":"bottom","isDefault":true,"color":"white","previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/WeY5PGdf8025J8o2VE8kp","parts":[{"spritesheetId":"TChgCSU6xSHuNmR2PI7H","layerId":"bottom front"}]},"shoes":{"id":"jWRxPyatM2P0bdzSnf50","parts":[{"spritesheetId":"yFpcQh7UcvdChVN8WvIW","layerId":"shoes front"}],"isDefault":true,"previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/kgDMGDXcC-ChLVRhOr7TZ","name":"generic","color":"black","type":"shoes"},"hat":{},"glasses":{"id":"KdFp1XwJet15FjqdQa38","isDefault":false,"parts":[{"layerId":"glasses front","spritesheetId":"py34w1ylAbJPYocLYKkq"}],"previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/_hDx5L7uo8UOmsyFeSrZz","type":"glasses","color":"black","name":"sunglasses"},"other":{},"costume":{}}',
	// 	},
	// });
}, 2000); // wait two seconds before setting these just to give the game a chance to init
