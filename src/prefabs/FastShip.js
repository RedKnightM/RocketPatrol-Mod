class fastShip extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed + 2;
    }

    update() {
        this.x -= this.moveSpeed;

        if (this.x < 0 - this.width) {
            this.x = game.config.width;
        }

        if (game.settings.gameTimer < game.settings.gameTimer/2) {
            this.moveSpeed += 1;
            console.log('Speed up!');
        }
    }

    reset() {
        this.x = game.config.width + 50;
        this.alpha = 1;
    }
}