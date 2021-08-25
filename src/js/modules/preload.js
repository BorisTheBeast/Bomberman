import rexvirtualjoystickplugin from '../plugins/rexvirtualjoystickplugin.min.js'

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
    this.load.plugin('rexvirtualjoystickplugin', rexvirtualjoystickplugin, true);
}

export default preload;