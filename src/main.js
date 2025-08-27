import Phaser from "phaser"

import HelloWorldScene from "./HelloWorldScene"
import CosmicEscape from "./scenes/CosmicEscape"

const config = {
	type: Phaser.AUTO,
	parent: "app",
	width: 1520,
	height: 600,

	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 330 },
			debug: false,
		},
	},
	scene: [CosmicEscape],
}

export default new Phaser.Game(config)
