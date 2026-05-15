// Задание 2.8: Сумма уникальных элементов
function sumOfUniqueElements(arr) {
    const counts = {};
    for (const num of arr) {
        counts[num] = (counts[num] || 0) + 1;
    }

    let sum = 0;
    for (const num in counts) {
        if (counts[num] === 1) {
            sum += parseInt(num, 10);
        }
    }
    return sum;
}

function calculateUniqueSum() {
    const input = document.getElementById('arrayInput').value;
    const arr = input.split(',')
                     .map(item => parseInt(item.trim(), 10))
                     .filter(item => !isNaN(item));

    if (arr.length === 0) {
        document.getElementById('result').innerText = "Пожалуйста, введите корректный массив чисел через запятую.";
        document.getElementById('result').style.color = "#e55a2b";
        return;
    }

    const sum = sumOfUniqueElements(arr);
    document.getElementById('result').innerText = "Сумма уникальных элементов: " + sum;

    // Восстанавливаем цвет текста в зависимости от страницы (темная или светлая тема)
    document.getElementById('result').style.color = document.body.classList.contains('main_div') ? "aliceblue" : "black";
}

// Задание 3.6: RLE сжатие
function rle(str) {
    if (!str) return '';
    let result = '';
    let count = 1;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            result += str[i] + (count > 1 ? count : '');
            count = 1;
        }
    }
    return result;
}

function calculateRLE() {
    const inputElement = document.getElementById('rleInput');
    if (!inputElement) return;

    const input = inputElement.value;
    const compressed = rle(input);

    document.getElementById('rleResult').innerText = "Результат сжатия: " + (compressed || "Пустая строка");
    document.getElementById('rleResult').style.color = document.body.classList.contains('main_div') ? "aliceblue" : "black";
}
