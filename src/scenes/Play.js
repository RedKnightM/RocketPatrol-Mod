class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload () {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('p1Rocket', 'assets/p1rocket.png');
        this.load.image('p2Rocket', 'assets/p2rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.spritesheet(
            'explosion', 
            'assets/explosion.png', {
                frameWidth: 64, 
                frameHeight: 32, 
                startFrame: 0, 
                endFrame: 9
            }
        );
    }

    create() {
        this.starfield = this.add.tileSprite(
            0, 
            0, 
            640, 
            480, 
            'starfield').setOrigin(0,0);
        
        this.starfield2 = this.add.tileSprite(
            640, 
            0, 
            1280, 
            480, 
            'starfield').setOrigin(0,0);

        this.p1Rocket = new P1Rocket(
            this, 
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'p1Rocket'
        );

        this.p2Rocket = new P2Rocket(
            this, 
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'p2Rocket'
        );

        this.ship1 = new Ship(
            this, 
            game.config.width + borderUISize*6, 
            borderUISize*4, 
            'spaceship', 
            0,
            30).setOrigin(0, 0); 
        
        this.ship2 = new Ship(
            this, 
            game.config.width + borderUISize*3, 
            borderUISize*5 + borderPadding*2, 
            'spaceship', 
            0,
            20).setOrigin(0,0);
        
        this.ship3 = new Ship(
            this, 
            game.config.width, 
            borderUISize*6 + borderPadding*4, 
            'spaceship', 
            0,
            10).setOrigin(0,0);

        this.ship4 = new Ship(
            this, 
            game.config.width - borderUISize*3, 
            borderUISize*7 + borderPadding*6, 
            'spaceship', 
            0,
            5).setOrigin(0,0);


        this.add.rectangle(
            0, 
            borderUISize + borderPadding, 
            game.config.width,
            borderUISize * 2,
            0x00FF00).setOrigin(0,0);
            
	    this.add.rectangle(
            0, 
            0, 
            game.config.width, 
            borderUISize, 
            0xFFFFFF).setOrigin(0 ,0);

	    this.add.rectangle(
            0, 
            game.config.height - borderUISize, 
            game.config.width, 
            borderUISize, 
            0xFFFFFF).setOrigin(0 ,0);

	    this.add.rectangle(
            0, 
            0, 
            borderUISize, 
            game.config.height, 
            0xFFFFFF).setOrigin(0 ,0);

	    this.add.rectangle(
            game.config.width - borderUISize, 
            0, 
            borderUISize, 
            game.config.height, 
            0xFFFFFF).setOrigin(0 ,0);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        
        this.p1Score = 0;
        let p1ScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: 'red',
            color: 'white',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(
            borderUISize + borderPadding, 
            borderUISize + borderPadding*2, 
            this.p1Score, 
            p1ScoreConfig);

        this.p2Score = 0;
        let p2ScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: 'blue',
            color: 'white',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreRight = this.add.text(
            borderUISize + borderPadding*103, 
            borderUISize + borderPadding*2, 
            this.p2Score, 
            p2ScoreConfig);

        this.gameOver = false;

        let textDisplay = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
        }

        textDisplay.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', textDisplay).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '[R]estart or [<-] to Menu', textDisplay).setOrigin(0.5);
            this.gameOver = true;
        }, null, this); 
    }

    update() {

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        
        this.starfield.tilePositionX -= 4;
        this.starfield2.tilePositionX -= 4;

        if (!this.gameOver) {
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            this.ship4.update();
        }

        if (this.checkCollision(this.p1Rocket, this.ship4)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship4);
            this.p1Score += this.ship4.points;
            this.scoreLeft.text = this.p1Score;
            
            return true;
            
        } 

        if (this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);
            this.p1Score += this.ship3.points;
            this.scoreLeft.text = this.p1Score;
            
            return true;
            
        } 
        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
            this.p1Score += this.ship2.points;
            this.scoreLeft.text = this.p1Score;
       
            return true;
            
        } 
        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);
            this.p1Score += this.ship1.points;
            this.scoreLeft.text = this.p1Score;
        
            return true;
        }

        if (this.checkCollision(this.p1Rocket, this.ship4)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship4);
            this.p1Score += this.ship4.points;
            this.scoreLeft.text = this.p1Score;
            
            return true;
            
        } 

        if (this.checkCollision(this.p2Rocket, this.ship3)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship3);
            this.p2Score += this.ship3.points;
            this.scoreRight.text = this.p2Score;
            
            return true;
            
        } 
        if (this.checkCollision(this.p2Rocket, this.ship2)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship2);
            this.p2Score += this.ship2.points;
            this.scoreRight.text = this.p2Score;
       
            return true;
            
        } 
        if (this.checkCollision(this.p2Rocket, this.ship1)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship1);
            this.p2Score += this.ship1.points;
            this.scoreRight.text = this.p2Score;
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
    }

    checkCollision(rocket, ship) {
        if (rocket.x + rocket.width > ship.x && 
            rocket.x < ship.x + ship.width && 
            rocket.y + rocket. height > ship.y && 
            rocket.y < ship.y + ship.height) {
                ship.alpha = 0;
                rocket.reset();
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');       
        boom.on('animationcomplete', () => {    
            ship.reset();                         
            ship.alpha = 1;                    
            boom.destroy();                     
            }
        );
        this.sound.play('sfx_explosion'); 
    }
}