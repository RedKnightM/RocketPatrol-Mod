

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_novice', 'assets/Novice.wav');
        this.load.audio('sfx_expert', 'assets/Expert.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        let titleConfig = {
            fontFamily: 'Copperplate',
            fontSize: '56px',
            backgroundColor: 'black',
            color: 'white',
            align: 'center',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(
            game.config.width/2, 
            game.config.height/2 - borderUISize*4 - borderPadding*4, 
            'ROCKET PATROL', 
            titleConfig).setOrigin(0.5);
        
        menuConfig.backgroundColor = "red";
        menuConfig.color = "white";

        this.add.text(
            game.config.width/2 - 305, 
            game.config.height/2 - 20,
            '[A] and [D] to move & [W] to fire', 
            menuConfig).setOrigin(0.5);

        this.add.text(
            game.config.width/2 - 490, 
            game.config.height/2 - 64,
            'Player One:', 
            menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = "blue";

        this.add.text(
            game.config.width/2 + 315, 
            game.config.height/2 - 20,
            '⇦ ⇨ arrows to move & ⇧ to fire', 
            menuConfig).setOrigin(0.5);

        this.add.text(
            game.config.width/2 + 492, 
            game.config.height/2 - 64,
            'Player Two:', 
            menuConfig).setOrigin(0.5);
        
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        
        this.add.text(
            game.config.width/2, 
            game.config.height/2 + borderUISize*2 + borderPadding*2, 
            'Press ⇦ for Novice or ⇨ for Expert', 
            menuConfig).setOrigin(0.5);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_novice');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_expert');
            this.scene.start('playScene');
        }
    }
}