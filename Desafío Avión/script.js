let player = {
    left: 415,
    top: 620
}

let enemies = [
    {left: 265, top: 100},
    {left: 365, top: 150},
    {left: 465, top: 150},
    {left: 565, top: 100}
]

let missiles = []

function drawPlayer(){
    content = "<div class='player' style='left:"+player.left+"px; top:"+player.top+"px'></div>"
    document.getElementById("players").innerHTML = content;
}

function drawEnemies(){
    content = "";
    for (let i = 0; i < enemies.length; i++){
        content += "<div class='enemy' style='left:"+enemies[i].left+"px; top:"+enemies[i].top+"px'></div>";
    }
    document.getElementById("enemies").innerHTML = content;
}

function drawMissiles(){
    content = "";
    for (let i = 0; i < missiles.length; i++){
        content += "<div class='missile' style='left:"+missiles[i].left+"px; top:"+missiles[i].top+"px'></div>";
    }
    document.getElementById("missiles").innerHTML = content;
}

function moveEnemies(){
    for (let i = 0; i < enemies.length; i++){
        enemies[i].top += 1;
    }
}

function moveMissiles(){
    for (let i = 0; i < missiles.length; i++){
        missiles[i].top -= 3;
    }
}

function relocateEnemies(){
    for (let i = 0; i < enemies.length; i++){
        if (enemies[i].top > 625){
            let x = (1 + Math.floor(Math.random()*6))*100 //Reubicamos left entre 100 y 600.
            let y = (1 + Math.floor(Math.random()*3))*10 //Reubicamos top entre 10 y 30.
            enemies[i].top = y;
            enemies[i].left = x;
        }
    }
}

document.onkeydown = function (e){
    if (e.keyCode == 37 && player.left > 20){ //Izquierda
        player.left -= 15;
    }
    if (e.keyCode == 38 && player.top > 500){ //Arriba
        player.top -= 15;
    }
    if (e.keyCode == 39 && player.left < 830){ //Derecha
        player.left += 15;
    }
    if (e.keyCode == 40 && player.top < 625){ //Abajo
        player.top += 15;
    }
    if (e.keyCode == 32){ //Disparar
        missiles.push({left: (player.left+34), top: (player.top-8)});
        drawMissiles();
    }
    drawPlayer();
}

function gameLoop(){
    console.log("gameLoop is running");
    drawPlayer();
    moveEnemies();
    drawEnemies();
    moveMissiles();
    drawMissiles();
    relocateEnemies();
    setTimeout(gameLoop, 10);
}
gameLoop();