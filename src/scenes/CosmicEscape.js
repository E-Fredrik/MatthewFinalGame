import Phaser from "phaser"
import FallingObject from "./ui/FallingObject"
export default class CosmicEscape extends Phaser.Scene {
	constructor() {
		super("cosmic-escape.scene")
	}
	init() {
		this.space = undefined
		this.stars = undefined
		this.ship = undefined
		this.cursors = undefined
		this.gems = undefined // Changed from gem to gems
		this.scoreLabel = undefined
		this.score = 0
		this.rock = undefined
		this.gamesound = undefined
	}

	preload() {
		this.load.image("space", "images/space.jpg")
		this.load.image("star", "images/kenney_simple-space/PNG/Default/star_small.png")

		for (let i = 1; i <= 6; i++) {
			this.load.image(`ship_right_${i}`, `images/Ships/1/Pattern2/Blue/Right/${i}.png`)
		}
		this.load.image("gem", "images/GemsImage/PixelArtPack/Gem1/BLUE/1.png")
		this.load.image("rock", "images/Rocks/rock2.png")
		this.load.audio("crash", "images/crashrock.mp3")
		this.load.audio("collectgemsound", "images/collectgemsound.mp3")
		this.load.audio("gamesound", "images/gamesound.mp3")
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

		// Create gems group FIRST
		this.gems = this.physics.add.group({
			classType: FallingObject,
			runChildUpdate: true,
			maxSize: 10,
		})

		// THEN set up overlap detection
		this.physics.add.overlap(this.ship, this.gems, this.collectGem, null, this)

		this.scoreLabel = this.add.text(10, 10, "Score", {
			fontSize: "16px",
			color: "black",
			backgroundColor: "white",
		})

		this.time.addEvent({
			delay: Phaser.Math.Between(1000, 3000), // Spawn every 1 second
			callback: this.spawnGem,
			callbackScope: this,
			loop: true,
		})

		this.rock = this.physics.add.group({
			classType: FallingObject,
			runChildUpdate: true,
			maxSize: 10,
		})

		this.time.addEvent({
			delay: 1000, // Spawn every 1 second
			callback: this.spawnRock,
			callbackScope: this,
			loop: true,
		})
		this.physics.add.overlap(this.ship, this.rock, this.rockHit, null, this)
		this.gamesound = this.sound.add("gamesound")
		this.gamesound.loop = true
		this.gamesound.play()
	}

	update(time) {
		this.stars.children.iterate((child) => {
			child.setVelocityX(-270)
			if (child.x < 0) {
				child.y = Phaser.Math.Between(0, 600)
				child.x = 1515
			}
		})

		this.moveShip(this.ship)
		this.scoreLabel.setText("Score: " + this.score)
	}

	createShip() {
		const ship = this.physics.add.sprite(300, 300, "ship_right_1").setScale(1.5)
		ship.setCollideWorldBounds(true)
		return ship
	}

	moveShip(ship) {
		if (this.cursors.up.isDown || this.cursors.space.isDown) {
			ship.setVelocityY(-170)
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
		const gem = this.gems.get(1550, 0, "gem", config)
		const positionY = Phaser.Math.Between(40, 560)
		if (gem) {
			gem.spawn(positionY)
		}
	}

	collectGem(ship, gem) {
		if (!gem.active) {
			return
		}
		this.score += 1
		gem.die() // Use die() instead of destroy() for object pooling
		this.sound.play("collectgemsound")
	}

	spawnRock() {
		const config = {
			speed: Phaser.Math.Between(-350, -500),
			rotation: 0.02,
		}
		const rock = this.rock.get(1550, 0, "rock", config)
		const positionY = Phaser.Math.Between(40, 560)
		if (rock) {
			rock.spawn(positionY)
		}
	}

	rockHit(ship, rock) {
		if (!rock.active) {
			return
		}
		rock.die()
		this.gamesound.stop()
		this.scene.start("over-scene", { score: this.score })
		this.sound.play("crash")
	}
}
