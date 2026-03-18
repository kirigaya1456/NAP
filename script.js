// файл script.js
window.onload = function(){

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null


    // окно вывода результата
    outputElement = document.getElementById("result")

    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id^="btn_digit_"]')

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
                updateDisplay(a)
            }
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
                updateDisplay(b)
            }
        }
    }

    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return
        if (b !== '') {
            calculateResult()
        }
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return
        if (b !== '') {
            calculateResult()
        }
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return
        if (b !== '') {
            calculateResult()
        }
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return
        if (b !== '') {
            calculateResult()
        }
        selectedOperation = '/'
    }
    document.getElementById("btn_op_percent").onclick = function() {
        if (a === '') return
        if (b !== '') {
            calculateResult()
        }
        selectedOperation = '%'
    }

    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = null
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation)
            return

        calculateResult()
        selectedOperation = null
    }

    function calculateResult() {
        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case '%':
                expressionResult = (+a) / 100 * (+b)
                break;
        }

        // Обновление отображаемого числа с учетом ограничения длины
        updateDisplay(expressionResult.toString())

        a = expressionResult.toString()
        b = ''
    }

    // Ограничение длины отображаемых чисел
    const MAX_DISPLAY_LENGTH = 9;

    // Функция, которая ограничивает длину числа
    function limitDisplayLength(number) {
        if (number.length > MAX_DISPLAY_LENGTH) {
            return number.slice(0, MAX_DISPLAY_LENGTH) + 'e' + (number.length - MAX_DISPLAY_LENGTH);
        } else {
            return number;
        }
    }

    // Обновление отображаемого числа с учетом ограничения длины
    function updateDisplay(number) {
        outputElement.innerHTML = limitDisplayLength(number);
    }

    // Обновление отображаемого числа при нажатии на кнопку цифры
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a=a.replace(/^0+/, '');
                a += digit
                updateDisplay(a)
            }
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b=b.replace(/^0+/, '');
                b += digit

                updateDisplay(b)
            }
        }
    }

};
