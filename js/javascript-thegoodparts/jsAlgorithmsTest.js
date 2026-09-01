// 常见排序算法：原生 JavaScript 实现

function bubbleSort(arr) {
    const result = arr.slice();
    let swapped = false;

    do {
        swapped = false;
        for (let i = 0; i < result.length - 1; i++) {
            if (result[i] > result[i + 1]) {
                [result[i], result[i + 1]] = [result[i + 1], result[i]];
                swapped = true;
            }
        }
    } while (swapped);

    return result;
}

function selectionSort(arr) {
    const result = arr.slice();

    for (let i = 0; i < result.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < result.length; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
        }
    }

    return result;
}

function insertionSort(arr) {
    const result = arr.slice();

    for (let i = 1; i < result.length; i++) {
        const current = result[i];
        let j = i - 1;

        while (j >= 0 && result[j] > current) {
            result[j + 1] = result[j];
            j--;
        }

        result[j + 1] = current;
    }

    return result;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr.slice();
    }

    const middle = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, middle));
    const right = mergeSort(arr.slice(middle));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr.slice();
    }

    const [pivot] = arr.slice(-1);
    const left = [];
    const right = [];
    const middle = [];

    for (const item of arr) {
        if (item < pivot) {
            left.push(item);
        } else if (item > pivot) {
            right.push(item);
        } else {
            middle.push(item);
        }
    }

    return quickSort(left).concat(middle, quickSort(right));
}

function assertSorted(label, fn, input, expected) {
    const result = fn(input);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${label}: ${passed ? '✅ 通过' : '❌ 失败'}`);
    console.log('输入:', input);
    console.log('输出:', result);
    console.log('期望:', expected);
    console.log('---');
}

const data = [64, 34, 25, 12, 22, 11, 90, 5, 1, 7];
const expected = [...data].sort((a, b) => a - b);

assertSorted('冒泡排序', bubbleSort, data, expected);
assertSorted('选择排序', selectionSort, data, expected);
assertSorted('插入排序', insertionSort, data, expected);
assertSorted('归并排序', mergeSort, data, expected);
assertSorted('快速排序', quickSort, data, expected);

console.log('所有排序算法已完成验证。');
