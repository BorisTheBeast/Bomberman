import { pxToIndex, indexToPx, map, explosion, platfBounds } from "./config";

const bombExplosion = (bomb) => {
    function createExplode(x, y, timeout) {
        var lifetime = 1350;
        
        setTimeout(function() {
                var p = indexToPx(x, y);
                var explode = explosion.create(p[0], p[1], 'explosion');
                
                explode.setScale(platfBounds.scale * 0.25);
                explode.anims.play('explosion');

                setTimeout(function () {
                    explode.destroy();
                }, lifetime)
            }, timeout);
    }

    var Vector2 = Phaser.Math.Vector2;
    var bombIndex = pxToIndex(bomb.x, bomb.y);
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


            if (point.x < 0 || point.x >= map[0].length || 
                point.y < 0 || point.y >= map.length) {
                break;
            }

            if (map[point.y][point.x] == 1) {
                break;
            }
            
            createExplode(point.x, point.y, j * 150);
        }
    }

    bomb.destroy();
}

export default bombExplosion;