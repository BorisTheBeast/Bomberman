import { gameOver } from "./config";
import respawnPlayer from "./respawnPlayer";

function killPlayer (player) {
    gameOver = true;
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    setTimeout(() => {
        player.visible = false;
        // player.setPosition(-100, -100);
        
        setTimeout(() => {
            respawnPlayer();
            player.setTint(0xffffff);
            this.physics.resume();
            gameOver = false
        }, 3000)
    }, 1500);
}

export default killPlayer;