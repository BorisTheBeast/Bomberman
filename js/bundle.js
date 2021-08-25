/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/bombExplosion.js":
/*!*****************************************!*\
  !*** ./src/js/modules/bombExplosion.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/js/modules/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_0__);


const bombExplosion = (bomb) => {
    function createExplode(x, y, timeout) {
        var lifetime = 1350;
        
        setTimeout(function() {
                var p = (0,_config__WEBPACK_IMPORTED_MODULE_0__.indexToPx)(x, y);
                var explode = _config__WEBPACK_IMPORTED_MODULE_0__.explosion.create(p[0], p[1], 'explosion');
                
                explode.setScale(_config__WEBPACK_IMPORTED_MODULE_0__.platfBounds.scale * 0.25);
                explode.anims.play('explosion');

                setTimeout(function () {
                    explode.destroy();
                }, lifetime)
            }, timeout);
    }

    var Vector2 = Phaser.Math.Vector2;
    var bombIndex = (0,_config__WEBPACK_IMPORTED_MODULE_0__.pxToIndex)(bomb.x, bomb.y);
    bombIndex = new Vector2(bombIndex[0], bombIndex[1]);
    
    var directions = [
        new Vector2(-1, 0),
        new Vector2(0, -1),
        new Vector2(1, 0),
        new Vector2(0, 1)
    ];

    createExplode(bombIndex.x, bombIndex.y, 0);

    for (var i=0;i<directions.length;i++) {
        for (var j=1;j<4;j++) {
            var d = new Vector2();
            d.copy(directions[i]).scale(j);

            var point = new Vector2();
            point.copy(bombIndex).add(d);


            if (point.x < 0 || point.x >= _config__WEBPACK_IMPORTED_MODULE_0__.map[0].length || 
                point.y < 0 || point.y >= _config__WEBPACK_IMPORTED_MODULE_0__.map.length) {
                break;
            }

            if (_config__WEBPACK_IMPORTED_MODULE_0__.map[point.y][point.x] == 1) {
                break;
            }
            
            createExplode(point.x, point.y, j * 150);
        }
    }

    bomb.destroy();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bombExplosion);

/***/ }),

/***/ "./src/js/modules/bombPlant.js":
/*!*************************************!*\
  !*** ./src/js/modules/bombPlant.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/js/modules/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bombExplosion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bombExplosion */ "./src/js/modules/bombExplosion.js");



function bombPlant() {
    console.log(_config__WEBPACK_IMPORTED_MODULE_0__.bombPlanted)
    var coord = (0,_config__WEBPACK_IMPORTED_MODULE_0__.pxToIndex)(_config__WEBPACK_IMPORTED_MODULE_0__.player.x, _config__WEBPACK_IMPORTED_MODULE_0__.player.y)
        coord = (0,_config__WEBPACK_IMPORTED_MODULE_0__.indexToPx)(coord[0], coord[1]);
    var bomb = _config__WEBPACK_IMPORTED_MODULE_0__.bombs.create(coord[0], coord[1], 'bomb');
    bomb.setScale(_config__WEBPACK_IMPORTED_MODULE_0__.platfBounds.scale * 2);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.allowGravity = false;
    _config__WEBPACK_IMPORTED_MODULE_0__.bombPlanted = false;
    
    setTimeout(function () {
        (0,_bombExplosion__WEBPACK_IMPORTED_MODULE_1__.default)(bomb);
        _config__WEBPACK_IMPORTED_MODULE_0__.bombPlanted = true;
    }, 2000)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bombPlant);

/***/ }),

/***/ "./src/js/modules/config.js":
/*!**********************************!*\
  !*** ./src/js/modules/config.js ***!
  \**********************************/
/***/ ((module) => {

var game;
var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,1,1,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];


var player;
var camera;
var bombs;
var platforms;
var cursors;
var fogCircle;
var score = 0;
var gameOver = false;
var scoreText;
var space;
var platfBounds;
var bombPlanted = true;
var explosion;
var zeroObj = [];
var randomCoord;
var timeRemaining = 100**3;
var enter;
var startClick;
var startGame = false;
var startCount = ['Press ENTER to start', '3', '2', '1', 'GO!', ''];
var mButtonPlant = true;
var screenW = window.screen.width;
var screenH = window.screen.height;
var SIZE_W = map[1].length * screenW / 12.5;
var SIZE_H = map.length * screenW / 12.5;
var timeText;

function pxToIndex(x, y) {
    return [
      Math.round(x/ SIZE_W * map[0].length),
      Math.round(y / SIZE_H * map.length)
    ];
  }
  
function indexToPx(i, j) {
    return [
      i * SIZE_W / map[0].length,
      j * SIZE_H / map.length
    ];
  }

module.exports = { game, camera, SIZE_W, SIZE_H, player, bombs, platforms, cursors, fogCircle, score, gameOver, scoreText, space, bombPlanted, explosion, zeroObj, randomCoord, timeRemaining, enter, startClick, startGame, startCount, map, indexToPx, pxToIndex, timeText, mButtonPlant, screenW, screenH, platfBounds }

/***/ }),

/***/ "./src/js/modules/create.js":
/*!**********************************!*\
  !*** ./src/js/modules/create.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/js/modules/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _respawnPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./respawnPlayer */ "./src/js/modules/respawnPlayer.js");
/* harmony import */ var _killPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./killPlayer */ "./src/js/modules/killPlayer.js");
/* harmony import */ var _gameConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameConfig */ "./src/js/modules/gameConfig.js");






function create () {
    _gameConfig__WEBPACK_IMPORTED_MODULE_3__.config.camera = this.cameras.main;
    _gameConfig__WEBPACK_IMPORTED_MODULE_3__.config.camera.setSize(_gameConfig__WEBPACK_IMPORTED_MODULE_3__.config.width, _gameConfig__WEBPACK_IMPORTED_MODULE_3__.config.height)

    var maskImage = this.make.image({
        x: _gameConfig__WEBPACK_IMPORTED_MODULE_3__.config.width / 2,
        y: _gameConfig__WEBPACK_IMPORTED_MODULE_3__.config.height / 2,
        key: 'fog',
        add: false,
        scale: 0.7,
    });
    

    const mask = maskImage.createBitmapMask();
    // config.camera.setMask(mask);

    this.physics.world.setBounds(0, 0, 5000, 5000);
    //  The platforms group contains the ground and the 2 ledges we can jump on
    _config__WEBPACK_IMPORTED_MODULE_0__.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    var createMap = (mapArr, obj) => {
        for (var i = 0; i < mapArr.length; i++) {
            for (var j = 0; j < mapArr[i].length; j++) {
                var p = (0,_config__WEBPACK_IMPORTED_MODULE_0__.indexToPx)(j, i);
                if(mapArr == _config__WEBPACK_IMPORTED_MODULE_0__.map){
                    if (mapArr[i][j] == 1) {
                        _config__WEBPACK_IMPORTED_MODULE_0__.platfBounds = _config__WEBPACK_IMPORTED_MODULE_0__.platforms.create(p[0], p[1], obj)
                        Align.scaleToGameW(_config__WEBPACK_IMPORTED_MODULE_0__.game, _config__WEBPACK_IMPORTED_MODULE_0__.platfBounds, 0.08)
                        _config__WEBPACK_IMPORTED_MODULE_0__.platfBounds.setScale(_config__WEBPACK_IMPORTED_MODULE_0__.platfBounds.scale).refreshBody()
                        // console.log(platf.scale)
                    } else if(mapArr[i][j] == 0){
                        Align.scaleToGameW(_config__WEBPACK_IMPORTED_MODULE_0__.game,(this.add.image(p[0], p[1], 'grass')),0.08)
                    }
                }
                if(mapArr[i][j] == 1){
                    this.add.image(p[0], p[1], obj);
                    Align.scaleToGameW(_config__WEBPACK_IMPORTED_MODULE_0__.game,(this.add.image(p[0], p[1], obj)),0.08)
                }
            }
        }
    }

    createMap(_config__WEBPACK_IMPORTED_MODULE_0__.map, 'ground');

    (0,_respawnPlayer__WEBPACK_IMPORTED_MODULE_1__.default)();

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
            x: _gameConfig__WEBPACK_IMPORTED_MODULE_3__.config.width - 100,
            y: this.cameras.main.height - 100,
            radius: 40,
            forceMin: 0,
            base: this.add.circle(0, 0, 60, 0x888888).setDepth(100).setAlpha(0.25),
            thumb: this.add.image(0, 0, 'button').setDisplaySize(80, 80).setDepth(100).setAlpha(0.5),
        }).on('update', () => {}, this)
    } else {
        Align.center(_gameConfig__WEBPACK_IMPORTED_MODULE_3__.config, _config__WEBPACK_IMPORTED_MODULE_0__.startClick = this.add.text(380, 250, `${_config__WEBPACK_IMPORTED_MODULE_0__.startCount[0]}`, { fontSize: '48px', fill: 'white' }).setOrigin(0.5).setScrollFactor(0, 0));
    }

    _gameConfig__WEBPACK_IMPORTED_MODULE_3__.config.camera.startFollow(_config__WEBPACK_IMPORTED_MODULE_0__.player);
    
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
    _config__WEBPACK_IMPORTED_MODULE_0__.cursors = this.input.keyboard.createCursorKeys();
    _config__WEBPACK_IMPORTED_MODULE_0__.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    _config__WEBPACK_IMPORTED_MODULE_0__.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


    _config__WEBPACK_IMPORTED_MODULE_0__.bombs = this.physics.add.group();
    _config__WEBPACK_IMPORTED_MODULE_0__.explosion = this.physics.add.group();

    //  The score
    _config__WEBPACK_IMPORTED_MODULE_0__.timeText = this.add.text(_gameConfig__WEBPACK_IMPORTED_MODULE_3__.config.width - 350, 0, `time left:${_config__WEBPACK_IMPORTED_MODULE_0__.timeRemaining}`, { fontSize: '32px', fill: 'white' }).setScrollFactor(0, 0);

    _config__WEBPACK_IMPORTED_MODULE_0__.scoreText = this.add.text(0, 0, 'frags: 0', { fontSize: '32px', fill: 'white' }).setScrollFactor(0, 0);
    //  Collide the player and the stars with the platforms

    this.physics.add.collider(_config__WEBPACK_IMPORTED_MODULE_0__.player, _config__WEBPACK_IMPORTED_MODULE_0__.platforms);
    this.physics.add.collider(_config__WEBPACK_IMPORTED_MODULE_0__.bombs, _config__WEBPACK_IMPORTED_MODULE_0__.platforms);
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(_config__WEBPACK_IMPORTED_MODULE_0__.player, _config__WEBPACK_IMPORTED_MODULE_0__.bombs);
    this.physics.add.collider(_config__WEBPACK_IMPORTED_MODULE_0__.player, _config__WEBPACK_IMPORTED_MODULE_0__.explosion, _killPlayer__WEBPACK_IMPORTED_MODULE_2__.default, null, this);
    // update camera
    _config__WEBPACK_IMPORTED_MODULE_0__.game.scene.scenes[0].cameras.cameras[0].setPosition(0, 0)
    
    this.physics.pause();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (create);

/***/ }),

/***/ "./src/js/modules/gameConfig.js":
/*!**************************************!*\
  !*** ./src/js/modules/gameConfig.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _modules_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/create */ "./src/js/modules/create.js");
/* harmony import */ var _modules_preload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/preload */ "./src/js/modules/preload.js");
/* harmony import */ var _modules_update__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/update */ "./src/js/modules/update.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/js/modules/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);






var config = {
    type: Phaser.AUTO,
    width: _config__WEBPACK_IMPORTED_MODULE_3__.screenW,
    height: _config__WEBPACK_IMPORTED_MODULE_3__.screenH,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
      preload: _modules_preload__WEBPACK_IMPORTED_MODULE_1__.default,
      create: _modules_create__WEBPACK_IMPORTED_MODULE_0__.default,
      update: _modules_update__WEBPACK_IMPORTED_MODULE_2__.default
    },
    input: {
      activePointers: 3, // 2 is default for mouse + pointer, +1 is required for dual touch
    }
  }



/***/ }),

/***/ "./src/js/modules/killPlayer.js":
/*!**************************************!*\
  !*** ./src/js/modules/killPlayer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/js/modules/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _respawnPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./respawnPlayer */ "./src/js/modules/respawnPlayer.js");



function killPlayer (player) {
    _config__WEBPACK_IMPORTED_MODULE_0__.gameOver = true;
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    setTimeout(() => {
        player.visible = false;
        // player.setPosition(-100, -100);
        
        setTimeout(() => {
            (0,_respawnPlayer__WEBPACK_IMPORTED_MODULE_1__.default)();
            player.setTint(0xffffff);
            this.physics.resume();
            _config__WEBPACK_IMPORTED_MODULE_0__.gameOver = false
        }, 3000)
    }, 1500);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (killPlayer);

/***/ }),

/***/ "./src/js/modules/preload.js":
/*!***********************************!*\
  !*** ./src/js/modules/preload.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _plugins_rexvirtualjoystickplugin_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plugins/rexvirtualjoystickplugin.min.js */ "./src/js/plugins/rexvirtualjoystickplugin.min.js");
/* harmony import */ var _plugins_rexvirtualjoystickplugin_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_rexvirtualjoystickplugin_min_js__WEBPACK_IMPORTED_MODULE_0__);


function preload() {
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/blackblock.png');
    this.load.image('fog', './assets/fog.png');
    this.load.image('grass', './assets/grass.png');
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.image('joystick', './assets/joystick.png');
    this.load.image('button', './assets/button.png');
    this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 256, frameHeight: 254 });
    this.load.spritesheet('dude', './assets/player1.png', { frameWidth: 43, frameHeight: 75 });
    this.load.plugin('rexvirtualjoystickplugin', (_plugins_rexvirtualjoystickplugin_min_js__WEBPACK_IMPORTED_MODULE_0___default()), true);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (preload);

/***/ }),

/***/ "./src/js/modules/respawnPlayer.js":
/*!*****************************************!*\
  !*** ./src/js/modules/respawnPlayer.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/js/modules/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_0__);


const respawnPlayer = () => {
        // PLAYER START COORDINATES
    for(var i = 1; i < (_config__WEBPACK_IMPORTED_MODULE_0__.map.length - 1); i++) {
        for(var j = 1; j < (_config__WEBPACK_IMPORTED_MODULE_0__.map[i].length - 1); j++) {
            if (_config__WEBPACK_IMPORTED_MODULE_0__.map[i][j] == 0) {
                _config__WEBPACK_IMPORTED_MODULE_0__.zeroObj.push((0,_config__WEBPACK_IMPORTED_MODULE_0__.indexToPx)(j, i))
            }
        }
    }
    _config__WEBPACK_IMPORTED_MODULE_0__.randomCoord = Math.floor(Math.random()*(_config__WEBPACK_IMPORTED_MODULE_0__.zeroObj.length))

    // PLAYER CREATE
    if (!_config__WEBPACK_IMPORTED_MODULE_0__.player) {
        _config__WEBPACK_IMPORTED_MODULE_0__.player = _config__WEBPACK_IMPORTED_MODULE_0__.game.scene.scenes[0].physics.add.sprite(_config__WEBPACK_IMPORTED_MODULE_0__.zeroObj[_config__WEBPACK_IMPORTED_MODULE_0__.randomCoord][0], _config__WEBPACK_IMPORTED_MODULE_0__.zeroObj[_config__WEBPACK_IMPORTED_MODULE_0__.randomCoord][1], 'dude');
        Align.scaleToGameW(_config__WEBPACK_IMPORTED_MODULE_0__.game,_config__WEBPACK_IMPORTED_MODULE_0__.player,0.04)
        // player.setScale(0.6);
        _config__WEBPACK_IMPORTED_MODULE_0__.player.setCollideWorldBounds(true);
    } else {
        _config__WEBPACK_IMPORTED_MODULE_0__.player.setPosition(_config__WEBPACK_IMPORTED_MODULE_0__.zeroObj[_config__WEBPACK_IMPORTED_MODULE_0__.randomCoord][0], _config__WEBPACK_IMPORTED_MODULE_0__.zeroObj[_config__WEBPACK_IMPORTED_MODULE_0__.randomCoord][1]);
        _config__WEBPACK_IMPORTED_MODULE_0__.player.visible = true;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (respawnPlayer);

/***/ }),

/***/ "./src/js/modules/update.js":
/*!**********************************!*\
  !*** ./src/js/modules/update.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/js/modules/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bombPlant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bombPlant */ "./src/js/modules/bombPlant.js");



function update () {

    if (_config__WEBPACK_IMPORTED_MODULE_0__.gameOver){ return }
  
    let walk = true;

    var mobile_test_re = /.*?(mobile|android|iphone)/i

    if (mobile_test_re.test(navigator.userAgent)) {
        if (this.movementJoyStick.force) {
            _config__WEBPACK_IMPORTED_MODULE_0__.startGame = true;
            this.physics.resume();
            // Calculate speed based on joystick force
            _config__WEBPACK_IMPORTED_MODULE_0__.player.setRotation(_config__WEBPACK_IMPORTED_MODULE_0__.player.rotation)
            // let speedMultiplier = (this.movementJoyStick.force < this.movementJoyStick.radius) ? this.movementJoyStick.force / this.movementJoyStick.radius : 1
    
            // Move player according to movement joystick
    
            _config__WEBPACK_IMPORTED_MODULE_0__.player.setVelocityX(200 * Math.cos(Math.PI * this.movementJoyStick.angle / 180))
            _config__WEBPACK_IMPORTED_MODULE_0__.player.setVelocityY(200 * Math.sin(Math.PI * this.movementJoyStick.angle / 180))
            
            let angle = this.movementJoyStick.angle
    
            if(angle > -45 && angle < 45) {
                _config__WEBPACK_IMPORTED_MODULE_0__.player.anims.play('right', true);
    
            } else if (angle > 46 && angle < 125) {
                _config__WEBPACK_IMPORTED_MODULE_0__.player.anims.play('down', true);
    
            } else if (angle < -45 && angle > -125) {
                _config__WEBPACK_IMPORTED_MODULE_0__.player.anims.play('up', true);
    
            } else {
                _config__WEBPACK_IMPORTED_MODULE_0__.player.anims.play('left', true);
            }
            
        } else {
            // Stop moving
            _config__WEBPACK_IMPORTED_MODULE_0__.player.setVelocityX(0);
            _config__WEBPACK_IMPORTED_MODULE_0__.player.setVelocityY(0);
            _config__WEBPACK_IMPORTED_MODULE_0__.player.anims.play('turn');
        }

        if(this.button.force && _config__WEBPACK_IMPORTED_MODULE_0__.bombPlanted) {
            (0,_bombPlant__WEBPACK_IMPORTED_MODULE_1__.default)()
        }
        

    } else {
        
        if (_config__WEBPACK_IMPORTED_MODULE_0__.cursors.left.isDown) {
            _config__WEBPACK_IMPORTED_MODULE_0__.player.setVelocityX(-200);
            _config__WEBPACK_IMPORTED_MODULE_0__.player.anims.play('left', true);
            // console.log(player.velocity)
        } 
        else if (_config__WEBPACK_IMPORTED_MODULE_0__.cursors.right.isDown) {
            _config__WEBPACK_IMPORTED_MODULE_0__.player.setVelocityX(200);
            _config__WEBPACK_IMPORTED_MODULE_0__.player.anims.play('right', true);
        } else {        
            _config__WEBPACK_IMPORTED_MODULE_0__.player.setVelocityX(0);
            walk = false;
        }
        if (_config__WEBPACK_IMPORTED_MODULE_0__.cursors.up.isDown) {
            {
                _config__WEBPACK_IMPORTED_MODULE_0__.player.setVelocityY(-200);
                if (!walk) _config__WEBPACK_IMPORTED_MODULE_0__.player.anims.play('up', true);
            }
        }
        else if (_config__WEBPACK_IMPORTED_MODULE_0__.cursors.down.isDown) {
            {
                _config__WEBPACK_IMPORTED_MODULE_0__.player.setVelocityY(200);
                if (!walk) _config__WEBPACK_IMPORTED_MODULE_0__.player.anims.play('down', true);
            }
        } else {
            _config__WEBPACK_IMPORTED_MODULE_0__.player.setVelocityY(0);     
        }
    
        if (!_config__WEBPACK_IMPORTED_MODULE_0__.player.body.velocity.x && !_config__WEBPACK_IMPORTED_MODULE_0__.player.body.velocity.y) {
            _config__WEBPACK_IMPORTED_MODULE_0__.player.anims.play('turn');
        }

        if (_config__WEBPACK_IMPORTED_MODULE_0__.space.isDown && _config__WEBPACK_IMPORTED_MODULE_0__.bombPlanted) {
            (0,_bombPlant__WEBPACK_IMPORTED_MODULE_1__.default)()
        }
        
        if(_config__WEBPACK_IMPORTED_MODULE_0__.enter.isDown && !_config__WEBPACK_IMPORTED_MODULE_0__.startGame) {
            _config__WEBPACK_IMPORTED_MODULE_0__.startGame = true;
            let i = 1;
            let timer = setInterval(() => {
                _config__WEBPACK_IMPORTED_MODULE_0__.startClick.setText(_config__WEBPACK_IMPORTED_MODULE_0__.startCount[i]);
                i++;
                if(i == 6) {
                    this.physics.resume();
                    _config__WEBPACK_IMPORTED_MODULE_0__.timeLeft = setInterval(() => {
                        _config__WEBPACK_IMPORTED_MODULE_0__.timeRemaining--
                        _config__WEBPACK_IMPORTED_MODULE_0__.timeText.setText(`time left:` + _config__WEBPACK_IMPORTED_MODULE_0__.timeRemaining);
                        if(_config__WEBPACK_IMPORTED_MODULE_0__.timeRemaining == 0) {
                            this.physics.pause()
                            clearInterval(_config__WEBPACK_IMPORTED_MODULE_0__.timeLeft)
                        }
                    }, 1000)
                    clearInterval(timer);
                }
            }, 1000)
        }
    }




    // console.log(this.cameras.main.height)
    // if((player.x - (this.cameras.main.height / 2)) < 0) {
    //     camera.stopFollow();
    // } else {
    //     camera.startFollow(player);
    // }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (update);

/***/ }),

/***/ "./src/js/plugins/rexvirtualjoystickplugin.min.js":
/*!********************************************************!*\
  !*** ./src/js/plugins/rexvirtualjoystickplugin.min.js ***!
  \********************************************************/
/***/ ((module) => {

!function(t,e){ true?module.exports=e():0}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=309)}({133:function(t,e,n){"use strict";var r=n(56),i=n(20),o=n.n(i),s=n(82),u=n(83);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function h(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var y=Phaser.Utils.Objects.GetValue,p=Phaser.Math.Distance.Between,v=Phaser.Math.Angle.Between,b=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=h(this,f(e).call(this))).resetFromJSON(t),n}var n,i,c;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(e,r["a"]),n=e,(i=[{key:"resetFromJSON",value:function(t){void 0==this.start&&(this.start={}),void 0==this.end&&(this.end={}),this.setEnable(y(t,"enable",!0)),this.setMode(y(t,"dir","8dir")),this.setDistanceThreshold(y(t,"forceMin",16));var e=y(t,"start.x",null),n=y(t,"start.y",null),r=y(t,"end.x",null),i=y(t,"end.y",null);return this.setVector(e,n,r,i),this}},{key:"toJSON",value:function(){return{enable:this.enable,dir:this.dirMode,forceMin:this.forceMin,start:{x:this.start.x,y:this.start.y},end:{x:this.end.x,y:this.end.y}}}},{key:"setMode",value:function(t){return"string"==typeof t&&(t=s.a[t]),this.dirMode=t,this}},{key:"setEnable",value:function(t){if((t=void 0==t||!!t)!==this.enable)return!1===t&&this.clearVector(),this.enable=t,this}},{key:"setDistanceThreshold",value:function(t){return t<0&&(t=0),this.forceMin=t,this}},{key:"clearVector",value:function(){return this.start.x=0,this.start.y=0,this.end.x=0,this.end.y=0,this.clearAllKeysState(),this}},{key:"setVector",value:function(t,e,n,r){if(this.clearVector(),!this.enable)return this;if(null===t)return this;if(void 0===n&&(n=t,t=0,r=e,e=0),this.start.x=t,this.start.y=e,this.end.x=n,this.end.y=r,this.forceMin>0&&this.force<this.forceMin)return this;var i=Object(u.a)(this.angle,this.dirMode,!0);for(var o in i)i[o]&&this.setKeyState(o,!0);return this}},{key:"forceX",get:function(){return this.end.x-this.start.x}},{key:"forceY",get:function(){return this.end.y-this.start.y}},{key:"force",get:function(){return p(this.start.x,this.start.y,this.end.x,this.end.y)}},{key:"rotation",get:function(){return v(this.start.x,this.start.y,this.end.x,this.end.y)}},{key:"angle",get:function(){return o()(this.rotation)}},{key:"octant",get:function(){var t=0;return this.rightKeyDown?t=this.downKeyDown?45:0:this.downKeyDown?t=this.leftKeyDown?135:90:this.leftKeyDown?t=this.upKeyDown?225:180:this.upKeyDown&&(t=this.rightKeyDown?315:270),t}}])&&a(n.prototype,i),c&&a(n,c),e}(),d=n(2);function m(t){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function w(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function g(t,e){return!e||"object"!==m(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function E(t,e,n){return(E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=k(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(n):i.value}})(t,e,n||t)}function k(t){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function O(t,e){return(O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var _=Phaser.Utils.Objects.GetValue,K=Phaser.Geom.Circle,j=Phaser.Geom.Circle.Contains,S=function(t){function e(t,n){var r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),r=g(this,k(e).call(this,n));var i=_(n,"eventEmitter",void 0),o=_(n,"EventEmitterClass",void 0);return r.setEventEmitter(i,o),r.scene=t.scene,r.gameObject=t,r.radius=_(n,"radius",100),t.setInteractive(new K(t.displayOriginX,t.displayOriginY,r.radius),j),r.boot(),r}var n,r,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&O(t,e)}(e,b),n=e,(r=[{key:"resetFromJSON",value:function(t){return E(k(e.prototype),"resetFromJSON",this).call(this,t),this.pointer=void 0,this}},{key:"toJSON",value:function(){var t=E(k(e.prototype),"toJSON",this).call(this);return t.radius=this.radius,t}},{key:"boot",value:function(){this.gameObject.on("pointerdown",this.onKeyDownStart,this),this.gameObject.on("pointerover",this.onKeyDownStart,this),this.scene.input.on("pointermove",this.onKeyDown,this),this.scene.input.on("pointerup",this.onKeyUp,this),this.gameObject.once("destroy",this.destroy,this)}},{key:"shutdown",value:function(){this.scene&&(this.scene.input.off("pointermove",this.onKeyDown,this),this.scene.input.off("pointerup",this.onKeyUp,this)),this.destroyEventEmitter(),this.pointer=void 0,this.scene=void 0,this.gameObject=void 0}},{key:"destroy",value:function(){this.shutdown()}},{key:"onKeyDownStart",value:function(t){t.isDown&&void 0===this.pointer&&(this.pointer=t,this.onKeyDown(t))}},{key:"onKeyDown",value:function(t){if(this.pointer===t){var e=this.gameObject,n=t;this.setVector(e.x,e.y,n.x,n.y),this.emit("update")}}},{key:"onKeyUp",value:function(t){this.pointer===t&&(this.pointer=void 0,this.clearVector(),this.emit("update"))}}])&&w(n.prototype,r),i&&w(n,i),e}();Object.assign(S.prototype,d.a);var x=S;e.a=x},2:function(t,e,n){"use strict";e.a={setEventEmitter:function(t,e){return void 0===e&&(e=Phaser.Events.EventEmitter),this._privateEE=void 0===t,this._eventEmitter=this._privateEE?new e:t,this},destroyEventEmitter:function(){this._eventEmitter&&this._privateEE&&this._eventEmitter.shutdown()},getEventEmitter:function(){return this._eventEmitter},on:function(){return this._eventEmitter&&this._eventEmitter.on.apply(this._eventEmitter,arguments),this},once:function(){return this._eventEmitter&&this._eventEmitter.once.apply(this._eventEmitter,arguments),this},off:function(){return this._eventEmitter&&this._eventEmitter.off.apply(this._eventEmitter,arguments),this},emit:function(){return this._eventEmitter&&this._eventEmitter.emit.apply(this._eventEmitter,arguments),this},addListener:function(){return this._eventEmitter&&this._eventEmitter.addListener.apply(this._eventEmitter,arguments),this},removeListener:function(){return this._eventEmitter&&this._eventEmitter.removeListener.apply(this._eventEmitter,arguments),this},removeAllListeners:function(){return this._eventEmitter&&this._eventEmitter.removeAllListeners.apply(this._eventEmitter,arguments),this},listenerCount:function(){return this._eventEmitter?this._eventEmitter.listenerCount.apply(this._eventEmitter,arguments):0},listeners:function(){return this._eventEmitter?this._eventEmitter.listeners.apply(this._eventEmitter,arguments):[]}}},20:function(t,e){var n=180/Math.PI;t.exports=function(t){return t*n}},218:function(t,e,n){"use strict";var r=n(133),i=n(2);function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var s=Phaser.Utils.Objects.GetValue,u=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),void 0===n&&(n={});var r=s(n,"eventEmitter",void 0),i=s(n,"EventEmitterClass",void 0);this.setEventEmitter(r,i),n.eventEmitter=this.getEventEmitter(),this.scene=e,this.base=void 0,this.thumb=void 0,this.touchCursor=void 0,this.setRadius(s(n,"radius",100)),this.addBase(s(n,"base",void 0),n),this.addThumb(s(n,"thumb",void 0));var o=s(n,"x",0),u=s(n,"y",0);this.base.setPosition(o,u),this.thumb.setPosition(o,u),s(n,"fixed",!0)&&this.setScrollFactor(0),this.boot()}var e,n,i;return e=t,(n=[{key:"destroy",value:function(){this.destroyEventEmitter(),this.base.destroy(),this.thumb.destroy(),this.base=void 0,this.thumb=void 0,this.touchCursor=void 0}},{key:"createCursorKeys",value:function(){return this.touchCursor.createCursorKeys()}},{key:"setPosition",value:function(t,e){return this.x=t,this.y=e,this}},{key:"setVisible",value:function(t){this.visible=t}},{key:"toggleVisible",value:function(){this.visible=!this.visible}},{key:"setEnable",value:function(t){return this.enable=t,this}},{key:"toggleEnabl",value:function(){this.enable=!this.enable}},{key:"setRadius",value:function(t){return this.radius=t,this}},{key:"setVisible",value:function(t){return this.visible=t,this}},{key:"addBase",value:function(t,e){return this.base&&this.base.destroy(),void 0===t&&(t=this.scene.add.circle(0,0,this.radius).setStrokeStyle(3,255)),this.touchCursor=new r.a(t,e),this.base=t,this}},{key:"addThumb",value:function(t){return this.thumb&&this.thumb.destroy(),void 0===t&&(t=this.scene.add.circle(0,0,40).setStrokeStyle(3,65280)),this.thumb=t,this}},{key:"setScrollFactor",value:function(t){this.base.setScrollFactor(t),this.thumb.setScrollFactor(t)}},{key:"boot",value:function(){this.touchCursor.on("update",this.update,this)}},{key:"update",value:function(){var t=this.touchCursor;if(t.anyKeyDown)if(t.force>this.radius){var e=t.rotation;this.thumb.x=t.start.x+Math.cos(e)*this.radius,this.thumb.y=t.start.y+Math.sin(e)*this.radius}else this.thumb.x=t.end.x,this.thumb.y=t.end.y;else this.thumb.x=this.base.x,this.thumb.y=this.base.y;return this}},{key:"forceX",get:function(){return this.touchCursor.forceX}},{key:"forceY",get:function(){return this.touchCursor.forceY}},{key:"force",get:function(){return this.touchCursor.force}},{key:"rotation",get:function(){return this.touchCursor.rotation}},{key:"angle",get:function(){return this.touchCursor.angle}},{key:"up",get:function(){return this.touchCursor.upKeyDown}},{key:"down",get:function(){return this.touchCursor.downKeyDown}},{key:"left",get:function(){return this.touchCursor.leftKeyDown}},{key:"right",get:function(){return this.touchCursor.rightKeyDown}},{key:"noKey",get:function(){return this.touchCursor.noKeyDown}},{key:"pointerX",get:function(){return this.touchCursor.end.x}},{key:"pointerY",get:function(){return this.touchCursor.end.y}},{key:"pointer",get:function(){return this.touchCursor.pointer}},{key:"x",set:function(t){this.base.x=t},get:function(){return this.base.x}},{key:"y",set:function(t){this.base.y=t},get:function(){return this.base.y}},{key:"visible",get:function(){return this.base.visible},set:function(t){this.base.visible=t,this.thumb.visible=t}},{key:"enable",get:function(){return this.touchCursor.enable},set:function(t){this.touchCursor.setEnable(t)}}])&&o(e.prototype,n),i&&o(e,i),t}();Object.assign(u.prototype,i.a);var c=u;e.a=c},309:function(t,e,n){"use strict";n.r(e);var r=n(218);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var a=function(t){function e(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),s(this,u(e).call(this,t))}var n,i,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(e,Phaser.Plugins.BasePlugin),n=e,(i=[{key:"start",value:function(){this.game.events.once("destroy",this.destroy,this)}},{key:"add",value:function(t,e){return new r.a(t,e)}}])&&o(n.prototype,i),a&&o(n,a),e}();e.default=a},56:function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=Phaser.Input.Keyboard.Key,o=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.cursorKeys={up:new i,down:new i,left:new i,right:new i},this.noKeyDown=!0}var e,n,o;return e=t,(n=[{key:"createCursorKeys",value:function(){return this.cursorKeys}},{key:"setKeyState",value:function(t,e){var n=this.cursorKeys[t];return n.enabled?(e&&(this.noKeyDown=!1),n.isDown!==e&&(s.timeDown=Date.now(),e?n.onDown(s):n.onUp(s)),this):this}},{key:"clearAllKeysState",value:function(){for(var t in this.noKeyDown=!0,this.cursorKeys)this.setKeyState(t,!1);return this}},{key:"getKeyState",value:function(t){return this.cursorKeys[t]}},{key:"upKeyDown",get:function(){return this.cursorKeys.up.isDown}},{key:"downKeyDown",get:function(){return this.cursorKeys.down.isDown}},{key:"leftKeyDown",get:function(){return this.cursorKeys.left.isDown}},{key:"rightKeyDown",get:function(){return this.cursorKeys.right.isDown}},{key:"anyKeyDown",get:function(){return!this.noKeyDown}}])&&r(e.prototype,n),o&&r(e,o),t}(),s={altKey:!1,ctrlKey:!1,shiftKey:!1,metaKey:!1,location:0};e.a=o},82:function(t,e,n){"use strict";e.a={"up&down":0,"left&right":1,"4dir":2,"8dir":3}},83:function(t,e,n){"use strict";var r={};e.a=function(t,e,n){switch(void 0===n?n={}:!0===n&&(n=r),n.left=!1,n.right=!1,n.up=!1,n.down=!1,t=(t+360)%360,e){case 0:t<180?n.down=!0:n.up=!0;break;case 1:t>90&&t<=270?n.left=!0:n.right=!0;break;case 2:t>45&&t<=135?n.down=!0:t>135&&t<=225?n.left=!0:t>225&&t<=315?n.up=!0:n.right=!0;break;case 3:t>22.5&&t<=67.5?(n.down=!0,n.right=!0):t>67.5&&t<=112.5?n.down=!0:t>112.5&&t<=157.5?(n.down=!0,n.left=!0):t>157.5&&t<=202.5?n.left=!0:t>202.5&&t<=247.5?(n.left=!0,n.up=!0):t>247.5&&t<=292.5?n.up=!0:t>292.5&&t<=337.5?(n.up=!0,n.right=!0):n.right=!0}return n}}}).default});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_gameConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/gameConfig */ "./src/js/modules/gameConfig.js");
/* harmony import */ var _modules_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/config */ "./src/js/modules/config.js");
/* harmony import */ var _modules_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_config__WEBPACK_IMPORTED_MODULE_1__);




window.addEventListener('DOMContentLoaded', () => {
  
  "use strict";

  _modules_config__WEBPACK_IMPORTED_MODULE_1__.game = new Phaser.Game(_modules_gameConfig__WEBPACK_IMPORTED_MODULE_0__.config);
  
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map