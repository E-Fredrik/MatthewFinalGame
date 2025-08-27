import Phaser from "phaser"
import FallingObject from "./ui/FallingObject"
export default class CosmicEscape extends Phaser.Scene {
	init() {
		this.space = undefined
		this.stars = undefined
		this.ship = undefined
		this.cursors = undefined
		this.gem = undefined
		this.scoreLabel = undefined
		this.score = 0
	}

	preload() {
		this.load.image("space", "images/space.jpg")
		this.load.image("star", "images/kenney_simple-space/PNG/Default/star_small.png")

		for (let i = 1; i <= 6; i++) {
			this.load.image(`ship_right_${i}`, `images/Ships/1/Pattern2/Blue/Right/${i}.png`)
		}
		this.load.image("gem", "images/GemsImage/PixelArtPack/Gem1/BLUE/1.png")
	}

	create() {
		this.add.image(400, 300, "space").setScale(3)
		this.add.image(1200, 300, "space").setScale(3)
		this.stars = this.physics.add.group({
			key: "star",
			repeat: 10,
			allowGravity: false,
		})
		Phaser.Actions.RandomRectangle(this.stars.getChildren(), this.physics.world.bounds)
		this.cursors = this.input.keyboard.createCursorKeys()
		this.ship = this.createShip()
		this.anims.create({
			key: "move_up",
			frames: [
				{ key: "ship_right_1" },
				{ key: "ship_right_2" },
				{ key: "ship_right_3" },
				{ key: "ship_right_4" },
				{ key: "ship_right_5" },
				{ key: "ship_right_6" },
			],
			frameRate: 10,
			repeat: -1,
		})

		this.anims.create({
			key: "idle",
			frames: [{ key: "ship_right_1" }],
			frameRate: 10,
			repeat: -1,
		})

		this.physics.add.overlap(this.ship, this.gem, this.collectGem, null, this)
		this.scoreLabel = this.add.text(10, 10, "Score", {
			fontSize: "16px",
			color: "black",
			backgroundColor: "white",
		})
		this.gem = this.physics.add.group({
			classType: FallingObject,
			runChildUpdate: true,
			allowGravity: false,
		})
		this.time.addEvent({
			delay: 4000,
			callback: this.spawnGem,
			callbackScope: this,
			loop: true,
		})
	}

	update(time) {
		this.stars.children.iterate((child) => {
			child.setVelocityX(-400)
			if (child.x < 0) {
				child.y = Phaser.Math.Between(0, 600)
				child.x = 1515
			}
		})

		this.moveShip(this.ship)
		this.scoreLabel.setText("Score :" + this.score)
	}

	createShip() {
		const ship = this.physics.add.sprite(300, 300, "ship_right_1").setScale(1.5)
		ship.setCollideWorldBounds(true)
		return ship
	}

	moveShip(ship) {
		if (this.cursors.up.isDown || this.cursors.space.isDown) {
			ship.setVelocityY(-150)
			ship.anims.play("move_up", true)
		} else {
			ship.anims.play("idle", true)
		}
	}

	spawnGem() {
		const config = {
			speed: -400,
			rotation: 0,
		}
		const gem = this.gem.get(1550, 0, "gem", config)
		const positionY = Phaser.Math.Between(30, 570)
		if (gem) {
			gem.spawn(positionY)
		}
	}
	collectGem(ship, gem) {
		this.score += 1
		gem.destroy()
	}
}
