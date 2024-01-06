let leftValue = 150;
let topValue = 150;
let direction = "down";
let walkValue = 1;

function update(){
    // if (leftValue < 0){
    //     leftValue = 0;
    // }
    // else if (leftValue > 500){
    //     leftValue = 500;
    // }
    // else if (topValue < 0){
    //     topValue = 0;
    // }
    // else if (topValue > 500){
    //     topValue = 500;
    // }
    document.getElementById("character").style.left = leftValue + "px";
    document.getElementById("character").style.top = topValue + "px";
    document.getElementById("character").style.backgroundImage = "url('img/"+direction+walkValue+".png')";
}

document.onkeydown = function (e){
    console.log(e);
    if (walkValue == 1){
        walkValue = 2;
    }
    else {
        walkValue = 1;
    }
    if (e.keyCode == 37 && leftValue > 0){ //Izquierda
        // console.log("Izquierda");
        leftValue -= 10;
        //document.getElementById("character").style.left = leftValue + "px";
        direction = "left";
    }
    else if (e.keyCode == 38 && topValue > 0){ //Arriba
        //console.log("Arriba");
        topValue -= 10;
        //document.getElementById("character").style.top = topValue + "px";
        direction = "top";
    }
    else if (e.keyCode == 39 && leftValue < 500){ //Derecha
        //console.log("Derecha");
        leftValue += 10;
        //document.getElementById("character").style.left = leftValue + "px";
        direction = "right";
    }
    else if (e.keyCode == 40 && topValue < 500){ //Abajo
        //console.log("Abajo");
        topValue += 10;
        //document.getElementById("character").style.top = topValue + "px";
        direction = "down";
    }
    update();
}