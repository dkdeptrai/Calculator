function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function doCalculation(operator, savedNumber, displayedNumber) {
    let result;
    if(operator === '+') {
        result = savedNumber + displayedNumber;
    }

    if(operator === '-') {
        result = savedNumber - displayedNumber;

    }

    if(operator === '*') {
        result = savedNumber * displayedNumber;

    }

    if(operator === '/') {
        if (displayedNumber === 0) {
            alert('Cannot divide by zero!!!');
            return;
        }
        result = savedNumber / displayedNumber;        
    }

    if(operator === '=') {
        mainScreen.textContent = result;
    }
    return result;
}

function resetScreen() {
    if(shouldReset){
        mainScreen.textContent = '';
        subScreen.textContent = '';
        shouldReset = false;
    }    
}

function appendMainScreen(number) {
    resetScreen();
    mainScreen.textContent += number;
    displayedNumber = Number(mainScreen.textContent);
}
    
function operatorProcessing(operator) {
    if(currentOperator === undefined) {
        currentOperator = operator;
        savedNumber = displayedNumber;
        subScreen.textContent = savedNumber + ' ' + operator;
        mainScreen.textContent = '';
    } else {
        if(operator != '=') {
            savedNumber = doCalculation(currentOperator, savedNumber, displayedNumber);
            currentOperator = operator;
            subScreen.textContent = savedNumber + ' ' + operator;
            mainScreen.textContent = '';
        } else {
            subScreen.textContent = savedNumber + ' ' + currentOperator + ' ' + displayedNumber;
            displayedNumber = doCalculation(currentOperator, savedNumber, displayedNumber);
            currentOperator = operator;
            subScreen.textContent += ' = ' + displayedNumber;
            savedNumber = displayedNumber;
            mainScreen.textContent = displayedNumber;
            shouldReset = true;
        }
    }

}

function numericInputProcessing(input) {
    mainScreen.textContent += input;
    displayedNumber = parseFloat(mainScreen.textContent);
}

const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
let shouldReset = false;
let mainScreen = document.querySelector('.screen-bottom');
let subScreen = document.querySelector('.screen-top');
let currentOperator;
let displayedNumber = 0;
let savedNumber = 0;

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => appendMainScreen(btn.textContent));
})

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => operatorProcessing(btn.textContent));
})

document.addEventListener('keydown', e => {
    if (Number.isInteger(parseInt(e.key))) {
        mainScreen.textContent += e.key;
    }
})