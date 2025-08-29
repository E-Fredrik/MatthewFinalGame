import Phaser from "phaser"

export default class GameStartScene extends Phaser.Scene {
	constructor() {
		super("start-scene")
	}
	init(data) {
		this.gamestart = undefined
		this.startbutton = undefined
		this.background = undefined
		this.opening = undefined
	}
	preload() {
		this.load.image("background", "images/spacestart.png")
		this.load.image("start", "images/startbutton.png")
		this.load.image("start2", "images/spacestart2.png")
		this.load.image("start3", "images/spacestart3.png")
		this.load.audio("opening", "images/openingsound.mp3")
		this.load.audio("button", "images/buttonsound.mp3")
	}
	create() {
		this.add.image(775, 300, "background").setScale(0.6)
		this.add.image(1680, 300, "start2").setScale(0.6)
		this.add.image(68, 300, "start3").setScale(0.6)
		this.opening = this.sound.add("opening")
		this.opening.loop = true
		this.opening.play()
		this.startbutton = this.add.image(775, 520, "start").setInteractive().setScale(0.2)
		this.startbutton.once(
			"pointerup",
			() => {
				this.opening.stop()
				this.sound.play("button")
				this.scene.start("cosmic-escape.scene")
			},
			this
		)
	}
}
