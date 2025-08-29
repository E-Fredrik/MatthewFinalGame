import Phaser from "phaser"

import CosmicEscape from "./scenes/CosmicEscape"
import GameStartScene from "./scenes/GameStart"
import GameOverScene from "./scenes/GameOverScene"

const config = {
	type: Phaser.AUTO,
	width: 1520,
	height: 600,

	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 330 },
			debug: false,
		},
	},
	scene: [GameStartScene, CosmicEscape, GameOverScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
}

export default new Phaser.Game(config)
