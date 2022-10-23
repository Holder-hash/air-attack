const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');


var player = {
    x: 300,
    y: cvs.height - 51
}

document.addEventListener('keydown', function(e) {
    if (e.code == 'KeyD') {
        ctx.clearRect(player.x, player.y, 50, 50);
        player.x += 50;
    }
    else if (e.code == 'KeyA') {
        ctx.clearRect(player.x, player.y, 50, 50);
        player.x -= 50;
    }
})

var enem = [];

enem[0] = {
    x: Math.floor(Math.random() * 12 + 1),
    y: 0
} 

var score = 0;
var speed = 10;

var newLevel = 10;


function drawGame() {
    
    ctx.fillStyle = 'orange';
    ctx.fillRect(player.x, player.y, 50, 50);
    
    if (player.x >= 600) {
        player.x = 550;
    }
    else if (player.x <= 1) {
        player.x = 1;
    }
    
    
    for (i = 0; i < enem.length; i++) {
        
        ctx.fillStyle = 'red';
        ctx.fillRect(enem[i].x, enem[i].y, 50, 50);
        
        ctx.clearRect(enem[i].x, enem[i].y - 50, 50, 50);
        
        enem[i].y += speed;
        
        if (enem[i].y == 300) {
            enem.push({
                x: Math.floor(Math.random() * 12) * 50,
                y: 0 
            });
        }
        
        if (enem[i].y == cvs.height + 20) {
            score++;

            scoreText.innerHTML = `Score: ${score}.`;
            ctx.clearRect(enem[i].x, enem[i].y, 50, 50);
            enem.shift();

            if (score == 50) {
                speed += 10;
                console.log(speed);
            }
        } 

        if (enem[i].x == player.x && enem[i].y >= player.y) {
            alert(`Game over.\nSocre: ${score}`);
            location.reload();
        }   
    }
   
    requestAnimationFrame(drawGame);
}

drawGame();