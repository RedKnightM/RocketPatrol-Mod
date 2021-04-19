let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyUP, keyW, keyR, keyA, keyD;

/*
Rutvik Katkoriya, Rocket Patrol: 2-Player Edition, ~15 hours

Points Breakdwon
    30 Points: Simultaneous 2-player mode
    20 Points: New spaceship asset (faster, smaller, more points)
    10 Points: New title screen
    10 Points: Parallax scrolling
    5 Points: FIRE UI text in Play scene
    5 Points: Wide screen 
    5 Points: Novice/Expert voice SFX
    5 Points: Winner display at end of Play scene
    5 Points: Original music in Play scene
    5 Points: New background art
*/