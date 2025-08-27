import Phaser from "phaser"
export default class FallingObject extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, config) {
		super(scene, x, y, texture)
		this.scene = scene
		this.speed = config.speed
		this.rotationVal = config.rotation
	}
	spawn(positionY) {
		this.setPosition(1550, positionY)
		this.setActive(true)
		this.setVisible(true)
	}
	die() {
		this.destroy()
	}
	update(time) {
		this.setVelocityX(this.speed)
		this.rotation += this.rotationVal

		if (this.x < 0) {
			this.die()
		}
	}
}
