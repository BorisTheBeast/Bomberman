import { game, player, bombs, platforms, explosion, timeRemaining, startCount, map, indexToPx, cursors, space, enter, timeText, startClick, scoreText, platfBounds } from './config'
import respawnPlayer from './respawnPlayer';
import killPlayer from './killPlayer';
import { config } from './gameConfig'


function create () {
    config.camera = this.cameras.main;
    config.camera.setSize(config.width, config.height)

    var maskImage = this.make.image({
        x: config.width / 2,
        y: config.height / 2,
        key: 'fog',
        add: false,
        scale: 0.7,
    });
    

    const mask = maskImage.createBitmapMask();
    // config.camera.setMask(mask);

    this.physics.world.setBounds(0, 0, 5000, 5000);
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    var createMap = (mapArr, obj) => {
        for (var i = 0; i < mapArr.length; i++) {
            for (var j = 0; j < mapArr[i].length; j++) {
                var p = indexToPx(j, i);
                if(mapArr == map){
                    if (mapArr[i][j] == 1) {
                        platfBounds = platforms.create(p[0], p[1], obj)
                        Align.scaleToGameW(game, platfBounds, 0.08)
                        platfBounds.setScale(platfBounds.scale).refreshBody()
                        // console.log(platf.scale)
                    } else if(mapArr[i][j] == 0){
                        Align.scaleToGameW(game,(this.add.image(p[0], p[1], 'grass')),0.08)
                    }
                }
                if(mapArr[i][j] == 1){
                    this.add.image(p[0], p[1], obj);
                    Align.scaleToGameW(game,(this.add.image(p[0], p[1], obj)),0.08)
                }
            }
        }
    }

    createMap(map, 'ground');

    respawnPlayer();

    var mobile_test_re = /.*?(mobile|android|iphone)/i

    if (mobile_test_re.test(navigator.userAgent)) {
        this.movementJoyStick = this.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
            x: 120,
            y: this.cameras.main.height - 100,
            radius: 40,
            forceMin: 0,
            base: this.add.circle(0, 0, 60, 0x888888).setDepth(100).setAlpha(0.25),
            thumb: this.add.image(0, 0, 'joystick').setDisplaySize(80, 80).setDepth(100).setAlpha(0.5),
        }).on('update', () => {}, this)
    
          // Move joysticks dynamically based on pointer-down
        this.input.on('pointerdown', (pointer) => {
            if (pointer.x <= this.cameras.main.width * 0.3) {
                // console.log(this.movementJoyStick.thumb)
                this.movementJoyStick.base.setPosition(pointer.x, pointer.y).setAlpha(0.5)
                this.movementJoyStick.thumb.setPosition(pointer.x, pointer.y).setAlpha(0.5)
            }
        })
    
        // console.log(Phaser)
    
        this.button = this.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
            x: config.width - 100,
            y: this.cameras.main.height - 100,
            radius: 40,
            forceMin: 0,
            base: this.add.circle(0, 0, 60, 0x888888).setDepth(100).setAlpha(0.25),
            thumb: this.add.image(0, 0, 'button').setDisplaySize(80, 80).setDepth(100).setAlpha(0.5),
        }).on('update', () => {}, this)
    } else {
        Align.center(config, startClick = this.add.text(380, 250, `${startCount[0]}`, { fontSize: '48px', fill: 'white' }).setOrigin(0.5).setScrollFactor(0, 0));
    }

    config.camera.startFollow(player);
    
    // fogCircle = new Phaser.Circle(800, 800, 800);
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'space',
        frames: [ { key: 'dude', frame: 1 } ],
        frameRate: 0
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 1 } ],
        frameRate: 20
    });

    
    this.anims.create({
        key: 'explosion',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 39 }),
        frameRate: 30,
        repeat: 0
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


    bombs = this.physics.add.group();
    explosion = this.physics.add.group();

    //  The score
    timeText = this.add.text(config.width - 350, 0, `time left:${timeRemaining}`, { fontSize: '32px', fill: 'white' }).setScrollFactor(0, 0);

    scoreText = this.add.text(0, 0, 'frags: 0', { fontSize: '32px', fill: 'white' }).setScrollFactor(0, 0);
    //  Collide the player and the stars with the platforms

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bombs, platforms);
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs);
    this.physics.add.collider(player, explosion, killPlayer, null, this);
    // update camera
    game.scene.scenes[0].cameras.cameras[0].setPosition(0, 0)
    
    this.physics.pause();
}

export default create;