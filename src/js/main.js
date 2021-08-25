import {config} from "./modules/gameConfig";
import {game} from "./modules/config"


window.addEventListener('DOMContentLoaded', () => {
  
  "use strict";

  game = new Phaser.Game(config);
  
});
