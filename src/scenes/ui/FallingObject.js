import Phaser from "phaser"

export default class FallingObject extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, config = {}) {
        super(scene, x, y, texture)
        this.scene = scene
        // Provide default values
        this.speed = config.speed || -400
        this.rotationVal = config.rotation || 0.02
        
        // Add to scene and physics world
        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        // Initially inactive
        this.setActive(false)
        this.setVisible(false)
    }

    spawn(positionY) {
        this.setPosition(1550, positionY)
        this.setActive(true)
        this.setVisible(true)
        this.setVelocityX(this.speed)
        this.body.setGravityY(-330) // Cancel world gravity
    }

    die() {
        this.setActive(false)
        this.setVisible(false)
        this.setVelocityX(0)
    }

    update(time) {
        if (this.active) {
            this.rotation += this.rotationVal

            if (this.x < -50) {
                this.die()
            }
        }
    }
}
