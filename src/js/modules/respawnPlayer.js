import { map, zeroObj, indexToPx, randomCoord, player, game } from "./config";

const respawnPlayer = () => {
        // PLAYER START COORDINATES
    for(var i = 1; i < (map.length - 1); i++) {
        for(var j = 1; j < (map[i].length - 1); j++) {
            if (map[i][j] == 0) {
                zeroObj.push(indexToPx(j, i))
            }
        }
    }
    randomCoord = Math.floor(Math.random()*(zeroObj.length))

    // PLAYER CREATE
    if (!player) {
        player = game.scene.scenes[0].physics.add.sprite(zeroObj[randomCoord][0], zeroObj[randomCoord][1], 'dude');
        Align.scaleToGameW(game,player,0.04)
        // player.setScale(0.6);
        player.setCollideWorldBounds(true);
    } else {
        player.setPosition(zeroObj[randomCoord][0], zeroObj[randomCoord][1]);
        player.visible = true;
    }
}

export default respawnPlayer;