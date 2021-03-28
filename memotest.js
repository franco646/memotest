
bloquearInputUsuario();
let eleccionJugador = [];
let intentos = 0;

const $botonEmpezar = document.querySelector("#empezar");
$botonEmpezar.onclick = function(){
    eleccionJugador = []
    intentos = 0
    document.querySelector("#intentos").textContent = "intentos " + intentos
    document.querySelector("#estado").textContent = "En juego!"
    document.querySelector("#empezar").className = "btn btn-primary"
    document.querySelector("#empezar").textContent = "Reiniciar"
    mezclarCuadros();
    desbloquearInputUsuario();
}

function mezclarCuadros(){
    const numerosAleatorios = generarNumerosRandom();
    document.querySelectorAll(".cuadro").forEach(function(cuadro, i){
        cuadro.className = "cuadro oculto color-" + numerosAleatorios[i]
    })
}

function generarNumerosRandom(){
    let numerosRandom = [];
    var numeros = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8],
    i = numeros.length,
    j = 0;

while (i--) {
    j = Math.floor(Math.random() * (i+1));
    numerosRandom.push(numeros[j]);
    numeros.splice(j,1);
} 

return numerosRandom;
}

function bloquearInputUsuario(){
    document.querySelectorAll(".cuadro").forEach(function(cuadro){
        cuadro.onclick = function(){}
    })
}

function desbloquearInputUsuario(){
    document.querySelectorAll(".cuadro").forEach(function(cuadro){
        cuadro.onclick = manejarClickCuadro
    })
}

function manejarClickCuadro(e){
    cuadro = e.target;
    if(cuadro.className.includes('color')){
        eleccionJugador.push(cuadro)
    }

    mostrarCuadro(cuadro);

    if (eleccionJugador.length >= 2){
        verificarCoincidencia();
        actualizarIntentos();
    }else{
        return false;
    }
}

function mostrarCuadro(cuadro){
    document.getElementById(cuadro.id).classList.remove("oculto")
}

function verificarCoincidencia(){
    bloquearInputUsuario();
    const cuadroUno = eleccionJugador[0];
    const cuadroDos = eleccionJugador[1];
    
    if (cuadroUno.className === cuadroDos.className && cuadroUno.id != cuadroDos.id){
            setTimeout(function(){
                borrarCuadro(cuadroUno, cuadroDos)
            }, 500);
    }else if (cuadroUno.className === cuadroDos.className){
            eleccionJugador.pop();
            desbloquearInputUsuario();
    }else {
            setTimeout(function(){
                ocultarCuadros(cuadroUno, cuadroDos)
            }, 500);
    }

}

function borrarCuadro(cuadroUno, cuadroDos){
    document.getElementById(cuadroUno.id).classList.remove(cuadroUno.classList[1]);
    document.getElementById(cuadroDos.id).classList.remove(cuadroDos.classList[1]);

    eleccionJugador = [];
    verificarTerminarJuego();
    desbloquearInputUsuario();
}

function ocultarCuadros(cuadroUno, cuadroDos){
    document.getElementById(cuadroUno.id).classList.add("oculto");
    document.getElementById(cuadroDos.id).classList.add("oculto");

    eleccionJugador = []
    desbloquearInputUsuario();
}

function verificarTerminarJuego(){
    if (document.querySelector(".oculto") === null){
        ganar();
    }else {
        return false;
    }
}

function ganar(){
    document.querySelector("#estado").textContent = "Ganaste! pulsa Reiniciar para volver a jugar"
    document.querySelector("#empezar").textContent = "Reiniciar";
    document.querySelector("#empezar").className = "btn btn-danger"
}

function actualizarIntentos(){
    intentos = intentos + 1;
    document.querySelector("#intentos").textContent = "intentos " + intentos
}