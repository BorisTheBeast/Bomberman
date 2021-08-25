import { gameOver, cursors, player, space, bombPlanted, enter, startGame, startClick, startCount, timeLeft, timeRemaining, timeText} from "./config";
import bombPlant from "./bombPlant";

function update () {

    if (gameOver){ return }
  
    let walk = true;

    var mobile_test_re = /.*?(mobile|android|iphone)/i

    if (mobile_test_re.test(navigator.userAgent)) {
        if (this.movementJoyStick.force) {
            startGame = true;
            this.physics.resume();
            // Calculate speed based on joystick force
            player.setRotation(player.rotation)
            // let speedMultiplier = (this.movementJoyStick.force < this.movementJoyStick.radius) ? this.movementJoyStick.force / this.movementJoyStick.radius : 1
    
            // Move player according to movement joystick
    
            player.setVelocityX(200 * Math.cos(Math.PI * this.movementJoyStick.angle / 180))
            player.setVelocityY(200 * Math.sin(Math.PI * this.movementJoyStick.angle / 180))
            
            let angle = this.movementJoyStick.angle
    
            if(angle > -45 && angle < 45) {
                player.anims.play('right', true);
    
            } else if (angle > 46 && angle < 125) {
                player.anims.play('down', true);
    
            } else if (angle < -45 && angle > -125) {
                player.anims.play('up', true);
    
            } else {
                player.anims.play('left', true);
            }
            
        } else {
            // Stop moving
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.play('turn');
        }

        if(this.button.force && bombPlanted) {
            bombPlant()
        }
        

    } else {
        
        if (cursors.left.isDown) {
            player.setVelocityX(-200);
            player.anims.play('left', true);
            // console.log(player.velocity)
        } 
        else if (cursors.right.isDown) {
            player.setVelocityX(200);
            player.anims.play('right', true);
        } else {        
            player.setVelocityX(0);
            walk = false;
        }
        if (cursors.up.isDown) {
            {
                player.setVelocityY(-200);
                if (!walk) player.anims.play('up', true);
            }
        }
        else if (cursors.down.isDown) {
            {
                player.setVelocityY(200);
                if (!walk) player.anims.play('down', true);
            }
        } else {
            player.setVelocityY(0);     
        }
    
        if (!player.body.velocity.x && !player.body.velocity.y) {
            player.anims.play('turn');
        }

        if (space.isDown && bombPlanted) {
            bombPlant()
        }
        
        if(enter.isDown && !startGame) {
            startGame = true;
            let i = 1;
            let timer = setInterval(() => {
                startClick.setText(startCount[i]);
                i++;
                if(i == 6) {
                    this.physics.resume();
                    timeLeft = setInterval(() => {
                        timeRemaining--
                        timeText.setText(`time left:` + timeRemaining);
                        if(timeRemaining == 0) {
                            this.physics.pause()
                            clearInterval(timeLeft)
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
export default update;