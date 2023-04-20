// Declaración de variables
let runningTotal = 0; // almacena el total en ejecución de las operaciones
let buffer = "0"; // almacena el valor actual que se muestra en la pantalla
let previousOperator; // almacena el operador anterior que se ha presionado

// Obtención del elemento HTML donde se mostrará la pantalla de la calculadora
const screen = document.querySelector('.screen');

// Función que se ejecuta cada vez que se presiona un botón de la calculadora
function buttonClick(value) {
    // Si el valor no es un número, significa que es un símbolo
    if (isNaN(value)){
        handleSymbol(value);
    } else{
        handleNumber(value);
    }
    // Se actualiza el contenido de la pantalla con el valor actual del buffer
    screen.innerText = buffer;
}

// Función que maneja los símbolos presionados
function handleSymbol(symbol){
    switch (symbol){
        // Si se presiona la tecla "c", se reinicia la calculadora
        case 'c':
            buffer = '0';
            runningTotal = 0;
            break;
        // Si se presiona la tecla "=", se realiza la operación pendiente
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        // Si se presiona la tecla "←", se elimina el último dígito del buffer
        case '←':
            if (buffer.length ===1){
                buffer = '0';
            } else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        // Si se presiona un operador, se maneja la operación
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

// Función que maneja las operaciones matemáticas
function handleMath(symbol){
    if (buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0){
        runningTotal = intBuffer;
    } else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

// Función que realiza la operación pendiente
function flushOperation(intBuffer){
    if (previousOperator === '+'){
        runningTotal += intBuffer;
    } else if (previousOperator === '−'){
        runningTotal -= intBuffer;
    } else if (previousOperator === '×'){
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

// Función que maneja los números presionados
function handleNumber(numberString){
    if (buffer === "0"){
        buffer = numberString
    } else{
        buffer += numberString
    }
}

// Función que inicializa la calculadora
function init(){
    // Se agrega un listener de eventos al contenedor de botones
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        // Se llama a la función buttonClick con el valor del botón presionado
        buttonClick(event.target.innerText);
    })
}

// Se llama a la función init para inicializar la calculadora
init();
