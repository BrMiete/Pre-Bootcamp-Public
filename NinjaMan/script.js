//Primero, creamos un mundo de 10x10 casillas, con paredes externas y espacios vacíos dentro.
let mundo = [ //10x10
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
];

let mundoDic = { //Diccionario de palabras para ser utilizadas al momento de dibujar el mundo.
    0: 'vacio',
    1: 'pared',
    2: 'sushi',
    3: 'onigiri'
};

function mundoAleatorio(){ //Función que modifica aleatoriamente los valores de la matriz mundo.
    for (let x = 1; x <= 8; x++){
        for (let y = 1; y <= 8; y++){
            mundo[x][y] = Math.floor(Math.random() * 4);
        }
    }
    mundo[1][1] = 0;
    mundo[8][8] = 0;
    for (let x = 1; x <= 8; x++){
        for (let y = 1; y <= 8; y++){
            if (mundo[x-1][y] == 1 && mundo[x][y+1] == 1 && mundo[x+1][y] == 1 && mundo[x][y-1] == 1){
                mundo[x][y] = 1;
            }
        }
    }
}
mundoAleatorio(); //Creamos la matriz mundo con valores aleatorios.

//Calculamos la cantidad máxima de puntos que el jugador puede hacer.
let totalSushi = 0;
let totalOnigiri = 0;

for (let x = 0; x < mundo.length; x++){
    for (let y = 0; y < mundo[x].length; y++){
        if (mundo[x][y] == 2){
            totalSushi += 10; 
        }
        else if (mundo[x][y] == 3){
            totalOnigiri += 5;
        }
    }
}
let totalPuntos = totalSushi + totalOnigiri;


//Declaramos los contadores.
let contadorSushi = 0;
let contadorOnigiri = 0;
let puntuacion = 0;
let cantidadVidas = 3;

function dibujarMundo(){ //Función que dibuja el mundo en pantalla.
    output = "";
    for (var fila = 0; fila < mundo.length; fila++){
        output += "<div class='fila'>";
        for (var x = 0; x < mundo[fila].length; x++){
            output += "<div class='" + mundoDic[mundo[fila][x]] + "'></div>";
        }
        output += "</div>";
    }
    document.getElementById('mundo').innerHTML = output;
};
dibujarMundo(); //Dibujamos el mundo en pantalla.

//Posición inicial del NinjaMan.
let ninjaman = {
    x: 1,
    y: 1
};

function dibujarNinjaman(){ //Función para dibujar al NinjaMan en pantalla.
    document.getElementById('ninjaman').style.top = ninjaman.y*40 + 'px';
    document.getElementById('ninjaman').style.left = ninjaman.x*40 + 'px';
}
dibujarNinjaman(); //Dibuja al NinjaMan en el mundo.

//Posición inicial del fantasma Pumpky.
let pumpky = {
    x: 8,
    y: 8
};

function dibujarPumpky(){ //Función para dibujar en pantalla al fantasma Pumpky.
    document.getElementById('pumpky').style.top = pumpky.y*40 + 'px';
    document.getElementById('pumpky').style.left = pumpky.x*40 + 'px';
}
dibujarPumpky(); //Dibujamos al fantasma Pumpky en el mundo.

//Cuando el jugador presione una de las Flechitas, movemos al NinjaMan.
document.onkeydown = function (e){
    if (e.keyCode == 37){ //Izquierda
        if (mundo[ninjaman.y][ninjaman.x - 1] != 1){
            ninjaman.x--;
            //Contamos la cantidad de Sushi y Onigiri recolectados.
            if (mundo[ninjaman.y][ninjaman.x] == 2){
                contadorSushi++;
            }
            else if (mundo[ninjaman.y][ninjaman.x] == 3){
                contadorOnigiri++;
            }
        }
    }
    if (e.keyCode == 38){ //Arriba
        if (mundo[ninjaman.y - 1][ninjaman.x] != 1){
            ninjaman.y--;
            //Contamos la cantidad de Sushi y Onigiri recolectados.
            if (mundo[ninjaman.y][ninjaman.x] == 2){
                contadorSushi++;
            }
            else if (mundo[ninjaman.y][ninjaman.x] == 3){
                contadorOnigiri++;
            }
        }
    }
    if (e.keyCode == 39){ //Derecha
        if (mundo[ninjaman.y][ninjaman.x + 1] != 1){
            ninjaman.x++;
            //Contamos la cantidad de Sushi y Onigiri recolectados.
            if (mundo[ninjaman.y][ninjaman.x] == 2){
                contadorSushi++;
            }
            else if (mundo[ninjaman.y][ninjaman.x] == 3){
                contadorOnigiri++;
            }
        }
    }
    if (e.keyCode == 40){ //Abajo
        if (mundo[ninjaman.y + 1][ninjaman.x] != 1){
            ninjaman.y++;
            //Contamos la cantidad de Sushi y Onigiri recolectados.
            if (mundo[ninjaman.y][ninjaman.x] == 2){
                contadorSushi++;
            }
            else if (mundo[ninjaman.y][ninjaman.x] == 3){
                contadorOnigiri++;
            }
        }
    }
    mundo[ninjaman.y][ninjaman.x] = 0; //Luego de recolectar el ítem, colocamos una casilla vacía en su lugar.
    document.getElementById('totalSushi').innerHTML = contadorSushi;
    document.getElementById('totalOnigiri').innerHTML = contadorOnigiri;
    puntuacion = contadorSushi*10 + contadorOnigiri*5; //Puntaje del jugador.
    document.getElementById('totalPuntos').innerHTML = puntuacion;
    dibujarMundo(); //Re-Dibuja el mundo luego de cada movimiento del jugador.
    dibujarNinjaman(); //Dibuja al ninjaman cada vez que se mueve.
    /*dibujarPumpky(); //Dibuja al fantasma Pumpky cada vez que se mueve.*/
    if (puntuacion == totalPuntos){ //Si completamos la cantidad de puntos, se termina el juego y el jugador gana.
        clearInterval(GAME);
        finalizar("Has Ganado", "green");
        document.onkeydown = function (e){
            return;
        }
    }
}

//Creamos una constante para que el fantasma Pumpky persiga al NinjaMan cada 1 segundo.
let GAME;
window.onload = function (){
    GAME = setInterval( () => {
        perseguir();
        dibujarPumpky();
    }, 1000);
}

function perseguir(){ //Función para que el fantasma Pumpky persiga al jugador.
    if (ninjaman.y != pumpky.y || ninjaman.x != pumpky.x){
        if (ninjaman.y > pumpky.y && ninjaman.x > pumpky.x){ //Si Pumpky se encuentra en el Cuadrante 1 respecto al NinjaMan.
            if (mundo[pumpky.y + 1][pumpky.x] != 1){ //Abajo
                pumpky.y++;
            }
            else if (mundo[pumpky.y][pumpky.x + 1] != 1){ //Derecha
                pumpky.x++;
            }
            else if (mundo[pumpky.y - 1][pumpky.x] != 1){ //Arriba
                pumpky.y--;
            }
            else if (mundo[pumpky.y][pumpky.x - 1] != 1){ //Izquierda
                pumpky.x--;
            }
        }
        else if (ninjaman.y > pumpky.y && ninjaman.x < pumpky.x){ //Si Pumpky se encuentra en el Cuadrante 2 respecto al NinjaMan.
            if (mundo[pumpky.y + 1][pumpky.x] != 1){ //Abajo
                pumpky.y++;
            }
            else if (mundo[pumpky.y][pumpky.x - 1] != 1){ //Izquierda
                pumpky.x--;
            }
            else if (mundo[pumpky.y - 1][pumpky.x] != 1){ //Arriba
                pumpky.y--;
            }
            else if (mundo[pumpky.y][pumpky.x + 1] != 1){ //Derecha
                pumpky.x++;
            }
        }
        else if (ninjaman.y < pumpky.y && ninjaman.x < pumpky.x){ //Si Pumpky se encuentra en el Cuadrante 3 respecto al NinjaMan.
            if (mundo[pumpky.y - 1][pumpky.x] != 1){ //Arriba
                pumpky.y--;
            }
            else if (mundo[pumpky.y][pumpky.x - 1] != 1){ //Izquierda
                pumpky.x--;
            }
            else if (mundo[pumpky.y + 1][pumpky.x] != 1){ //Abajo
                pumpky.y++;
            }
            else if (mundo[pumpky.y][pumpky.x + 1] != 1){ //Derecha
                pumpky.x++;
            }
        }
        else if (ninjaman.y < pumpky.y && ninjaman.x > pumpky.x){ //Si Pumpky se encuentra en el Cuadrante 4 respecto al NinjaMan.
            if (mundo[pumpky.y - 1][pumpky.x] != 1){ //Arriba
                pumpky.y--;
            }
            else if (mundo[pumpky.y][pumpky.x + 1] != 1){ //Derecha
                pumpky.x++;
            }
            else if (mundo[pumpky.y + 1][pumpky.x] != 1){ //Abajo
                pumpky.y++;
            }
            else if (mundo[pumpky.y][pumpky.x - 1] != 1){ //Izquierda
                pumpky.x--;
            }
        }
        else if (ninjaman.y == pumpky.y && ninjaman.x < pumpky.x){ //Si Pumpky se encuentra a la Derecha del NinjaMan, en la misma Horizontal.
            if (mundo[pumpky.y][pumpky.x - 1] != 1){ //Izquierda
                pumpky.x--;
            }
            else if (mundo[pumpky.y - 1][pumpky.x] != 1){ //Arriba
                pumpky.y--;
            }
            else if (mundo[pumpky.y + 1][pumpky.x] != 1){ //Abajo
                pumpky.y++;
            }
            else if (mundo[pumpky.y][pumpky.x + 1] != 1){ //Derecha
                pumpky.x++;
            }
        }
        else if (ninjaman.y == pumpky.y && ninjaman.x > pumpky.x){ //Si Pumpky se encuentra a la Izquierda del NinjaMan, en la misma Horizontal.
            if (mundo[pumpky.y][pumpky.x + 1] != 1){ //Derecha
                pumpky.x++;
            }
            else if (mundo[pumpky.y - 1][pumpky.x] != 1){ //Arriba
                pumpky.y--;
            }
            else if (mundo[pumpky.y + 1][pumpky.x] != 1){ //Abajo
                pumpky.y++;
            }
            else if (mundo[pumpky.y][pumpky.x - 1] != 1){ //Izquierda
                pumpky.x--;
            }
        }
        else if (ninjaman.y < pumpky.y && ninjaman.x == pumpky.x){ //Si Pumpky se encuentra Abajo del NinjaMan, en la misma Vertical.
            if (mundo[pumpky.y - 1][pumpky.x] != 1){ //Arriba
                pumpky.y--;
            }
            else if (mundo[pumpky.y][pumpky.x - 1] != 1){ //Izquierda
                pumpky.x--;
            }
            else if (mundo[pumpky.y][pumpky.x + 1] != 1){ //Derecha
                pumpky.x++;
            }
            else if (mundo[pumpky.y + 1][pumpky.x] != 1){ //Abajo
                pumpky.y++;
            }
        }
        else if (ninjaman.y > pumpky.y && ninjaman.x == pumpky.x){ //Si Pumpky se encuentra Arriba del NinjaMan, en la misma Vertical.
            if (mundo[pumpky.y + 1][pumpky.x] != 1){ //Abajo
                pumpky.y++;
            }
            else if (mundo[pumpky.y][pumpky.x - 1] != 1){ //Izquierda
                pumpky.x--;
            }
            else if (mundo[pumpky.y][pumpky.x + 1] != 1){ //Derecha
                pumpky.x++;
            }
            else if (mundo[pumpky.y - 1][pumpky.x] != 1){ //Arriba
                pumpky.y--;
            }
        }
    }
    if (ninjaman.y == pumpky.y && ninjaman.x == pumpky.x){ //Cuando coinciden las posiciones del NinjaMan y de Pumpky.
        if (cantidadVidas > 0){
            clearInterval(GAME);
            cantidadVidas--;
            if (cantidadVidas == 0){ //Cuando el jugador se queda sin vidas, se termina el juego y el jugador pierde.
                clearInterval(GAME);
                finalizar("Game Over", "red");
                document.onkeydown = function (e){
                    return;
                }
            }
            else { //Si aún quedan vidas, el NinjaMan y Pumpky vuelven a sus posiciones iniciales, y comenzamos de nuevo.
                setTimeout( () => {
                    seguirJuego();
                    console.log(pumpky.y, pumpky.x)
                }, 1000);
                iniciar();
            }
        }
    };
}

function iniciar(){ //Para dar inicio a la persecución, luego de 1 segundo.
    GAME = setInterval( () => {
        perseguir();
        dibujarPumpky();
    }, 1000);
}

function finalizar(mensaje,color){ //Mostramos un mensaje en caso de Ganar o Perder.
    document.getElementById('contenedor2').innerHTML = "<div class='texto'><p>"+mensaje+"</p></div>";
    document.getElementById('contenedor2').style.backgroundColor = color;
}

function seguirJuego(){ //Devolvemos al Ninjaman y a Pumpky a sus posiciones iniales.
    ninjaman.x = 1;
    ninjaman.y = 1;
    pumpky.x = 8;
    pumpky.y = 9;
    dibujarNinjaman();
    dibujarPumpky();
    document.getElementById('totalVidas').innerHTML = cantidadVidas;
}

function refreshPage(){ //Recargamos la página al accionar el botón de "Reiniciar Juego".
    window.location.reload();
}
