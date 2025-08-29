import Phaser from "phaser"

export default class GameOverScene extends Phaser.Scene {
	constructor() {
		super("over-scene")
	}
	init(data) {
		this.replayButton = undefined
		this.score = data.score
	}
	preload() {
		this.load.image("backgroundend", "images/spacestart2.png")
		this.load.image("gameover", "images/gameover.png")
		this.load.image("replayButton", "images/replay.png")
		this.load.audio("gameoversound", "images/gameoversound.mp3")
		this.load.audio("restart", "images/restartsound.mp3")
	}

	create() {
		this.add.image(800, 200, "backgroundend")
		this.add.image(775, 200, "gameover").setScale(0.8)
		this.sound.play("gameoversound")
		this.add.text(692, 350, "Score:" + this.score, {
			fontSize: "42px",
			color: "white",
		})
		this.replayButton = this.add.image(775, 500, "replayButton").setInteractive().setScale(0.5)
		this.replayButton.once(
			"pointerup",
			() => {
				this.sound.play("restart")
				this.scene.start("start-scene")
			},
			this
		)
	}
}
