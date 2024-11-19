const alphabetEN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabetRU = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

function createVigenereTable(alphabet) {
    const table = [];
    for (let i = 0; i < alphabet.length; i++) {
        const row = [];
        for (let j = 0; j < alphabet.length; j++) {
            row.push(alphabet[(i + j) % alphabet.length]);
        }
        table.push(row);
    }
    return table;
}

function vigenereCipher(text, keyword, encrypt = true) {
    const language = document.getElementById('language').value;
    const alphabet = language === 'en' ? alphabetEN : alphabetRU;
    const textUpper = text.toUpperCase();
    const keywordUpper = keyword.toUpperCase();
    const table = createVigenereTable(alphabet);
    let result = '';
    let keywordIndex = 0;

    for (let i = 0; i < textUpper.length; i++) {
        const char = textUpper[i];
        const charIndex = alphabet.indexOf(char);

        if (charIndex !== -1) {
            const keyChar = keywordUpper[keywordIndex % keywordUpper.length];
            const keyIndex = alphabet.indexOf(keyChar);
            const newIndex = encrypt 
                ? (charIndex + keyIndex) % alphabet.length 
                : (charIndex - keyIndex + alphabet.length) % alphabet.length;

            result += table[0][newIndex]; // Используем таблицу
            keywordIndex++;
        } else {
            alert("Ошибка: Введён недопустимый символ. Пожалуйста, используйте только буквы выбранного языка.");
            return; // Прерываем выполнение, если символ недопустим
        }
    }

    return result;
}

function encrypt() {
    const inputText = document.getElementById('inputText').value;
    const keyword = document.getElementById('keyword').value;

    if (!keyword) {
        alert("Пожалуйста, введите ключевое слово.");
        return;
    }

    const encryptedText = vigenereCipher(inputText, keyword, true);
    document.getElementById('outputText').value = encryptedText;
}

function decrypt() {
    const inputText = document.getElementById('inputText').value;
    const keyword = document.getElementById('keyword').value;

    if (!keyword) {
        alert("Пожалуйста, введите ключевое слово.");
        return;
    }

    const decryptedText = vigenereCipher(inputText, keyword, false);
    document.getElementById('outputText').value = decryptedText;
}