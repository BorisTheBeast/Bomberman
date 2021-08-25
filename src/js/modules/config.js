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