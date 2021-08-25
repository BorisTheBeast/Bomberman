import create from "../modules/create";
import preload from "../modules/preload";
import update from "../modules/update";
import { screenW, screenH } from "./config";


var config = {
    type: Phaser.AUTO,
    width: screenW,
    height: screenH,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    input: {
      activePointers: 3, // 2 is default for mouse + pointer, +1 is required for dual touch
    }
  }

export { config }