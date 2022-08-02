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
        result = displayedNumber;
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

function reset() {
    savedNumber = displayedNumber = 0;
    mainScreen.textContent = '';
    subScreen.textContent = '';
    currentOperator = undefined;
}

function appendMainScreen(number) {
    resetScreen();
    if(number === '.' && mainScreen.textContent.includes('.')) return;
    mainScreen.textContent += number;
    displayedNumber = Number(mainScreen.textContent);
}
    
function operatorProcessing(btn) {
    let operator = btn.textContent;
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
            shouldReset = false;
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

const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear-btn');
const delBtn = document.querySelector('.delete-btn');
let shouldReset = false;
let mainScreen = document.querySelector('.screen-bottom');
let subScreen = document.querySelector('.screen-top');
let currentOperator;
let displayedNumber = 0;
let savedNumber = 0;

clearBtn.addEventListener('click', () => {
    shouldReset = true;
    reset();
})

delBtn.addEventListener('click', () => {
    mainScreen.textContent = mainScreen.textContent.substring(0, mainScreen.textContent.length - 1)
})

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => appendMainScreen(btn.textContent));
})

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => operatorProcessing(btn));
})

document.addEventListener('keydown', e => {
    if (Number.isInteger(parseInt(e.key))) {
        mainScreen.textContent += e.key;
    }
})