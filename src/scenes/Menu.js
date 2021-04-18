

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_novice', 'assets/Novice.wav');
        this.load.audio('sfx_expert', 'assets/Expert.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
        this.load.audio('music_novice', 'assets/RP_NoviceMusic.wav');
        this.load.audio('music_expert', 'assets/RP_ExpertMusic.wav');
        this.load.image('menu_ship', 'assets/spaceship.png');
        this.load.image('menu_shipTwo', 'assets/fastShip.png');
        this.load.image('p1Rocket', 'assets/p1Rocket.png');
        this.load.image('p2Rocket', 'assets/p2Rocket.png');
    }

    create() {
        this.ship1 = this.add.sprite(
            130,
            50,
            'menu_ship').setOrigin(0.5);
        this.ship2 = this.add.sprite(
            240,
            50,
            'menu_ship').setOrigin(0.5);
        this.ship3 = this.add.sprite(
            185,
            100,
            'menu_ship').setOrigin(0.5);
        
        this.ship1 = this.add.sprite(
            1030,
            50,
            'menu_shipTwo').setOrigin(0.5);
        this.ship2 = this.add.sprite(
            1140,
            50,
            'menu_shipTwo').setOrigin(0.5);
        this.ship3 = this.add.sprite(
            1085,
            100,
            'menu_shipTwo').setOrigin(0.5);
        
        this.p1Rocket = this.add.sprite(
            185,
            300,
          'p1Rocket').setOrigin(0.5);

        this.p2Rocket = this.add.sprite(
            1085,
            300,
            'p2Rocket').setOrigin(0.5);

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
        
        menuConfig.backgroundColor = "#eb7380";
        menuConfig.color = "white";

        this.add.text(
            game.config.width/2 - 305, 
            game.config.height/2 - 20,
            '[A] and [D] to move & [W] to fire ', 
            menuConfig).setOrigin(0.5);

        this.add.text(
            game.config.width/2 - 490, 
            game.config.height/2 - 64,
            'Player One: ', 
            menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = "#b689d5";

        this.add.text(
            game.config.width/2 + 316, 
            game.config.height/2 - 20,
            '⇦ ⇨ arrows to move & ⇧ to fire ', 
            menuConfig).setOrigin(0.5);

        this.add.text(
            game.config.width/2 + 492, 
            game.config.height/2 - 64,
            'Player Two: ', 
            menuConfig).setOrigin(0.5);
        
        menuConfig.backgroundColor = '#89d5d1';
        menuConfig.color = 'white';
        
        this.add.text(
            game.config.width/2, 
            game.config.height/2 + borderUISize*2 + borderPadding*2, 
            ' Press ⇦ for Novice or ⇨ for Expert ', 
            menuConfig).setOrigin(0.5);
        
            this.add.text(
            game.config.width/2, 
            game.config.height/2 + borderUISize*2 + 64, 
            ' Highest score wins! ', 
            menuConfig).setOrigin(0.5);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.ship1.spritePositionY -= 4;
        this.ship1.spritePositionY += 4;

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_novice');
            this.sound.play('music_novice');
            this.inMenu = false;
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_expert');
            this.sound.play('music_expert');
            this.inMenu = false;
            this.scene.start('playScene');

        }
    }
}