import { player, bombPlanted, pxToIndex, indexToPx, bombs, platfBounds } from "./config";
import bombExplosion from "./bombExplosion";

function bombPlant() {
    console.log(bombPlanted)
    var coord = pxToIndex(player.x, player.y)
        coord = indexToPx(coord[0], coord[1]);
    var bomb = bombs.create(coord[0], coord[1], 'bomb');
    bomb.setScale(platfBounds.scale * 2);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.allowGravity = false;
    bombPlanted = false;
    
    setTimeout(function () {
        bombExplosion(bomb);
        bombPlanted = true;
    }, 2000)
}

export default bombPlant