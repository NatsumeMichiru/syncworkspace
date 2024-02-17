function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function hanoi(n, from, to, via) {
    if (n === 1) {
        console.log(`Move disk 1 from ${from} to ${to}`);
    } else {
        hanoi(n - 1, from, via, to);
        console.log(`Move disk ${n} from ${from} to ${to}`);
        hanoi(n - 1, via, to, from);
    }
}

let n = hanoi(5, 'A', 'B', 'C');

 