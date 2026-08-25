const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Db', 'Eb', 'Gb', 'Ab', 'Bb'];
const chords = ['M7', 'm7', '7', 'ø7', 'o7'];

// 函数：从数组中随机选取一个元素
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// 初始化结果字符串
let result = '';

// 重复16次的过程
for (let i = 0; i < 16; i++) {
    // 随机选取一个音符和一个和弦
    const randomNote = getRandomElement(notes);
    const randomChord = getRandomElement(chords);
    
    // 将选取的音符和和弦拼接，并添加到结果字符串
    result += randomNote + randomChord;
    
    // 除了最后一次循环，都需要添加逗号
    if (i < 15) {
        result += ',';
    }
}

// 输出结果字符串
console.log(result);