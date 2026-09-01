// 常见排序算法：原生 JavaScript 实现（DeepSeek 版本）
// 包含：冒泡、选择、插入、希尔、归并、快速、堆、计数、桶、基数排序

// ---------- 1. 冒泡排序 ----------
// 相邻元素两两比较，较大的往后冒泡，每轮确定一个最大值
function bubbleSort(arr) {
    const result = arr.slice();

    for (let i = 0; i < result.length - 1; i++) {
        let swapped = false;
        for (let j = 0; j < result.length - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        // 若本轮没有交换，说明已经有序，提前结束
        if (!swapped) break;
    }

    return result;
}

// ---------- 2. 选择排序 ----------
// 每轮从未排序部分选出最小值，放到已排序部分的末尾
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

// ---------- 3. 插入排序 ----------
// 把元素逐个插入到已排序的序列中合适的位置
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

// ---------- 4. 希尔排序 ----------
// 插入排序的改进版：先按间隔分组排序，逐步缩小间隔
function shellSort(arr) {
    const result = arr.slice();

    for (let gap = Math.floor(result.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < result.length; i++) {
            const current = result[i];
            let j = i;
            while (j - gap >= 0 && result[j - gap] > current) {
                result[j] = result[j - gap];
                j -= gap;
            }
            result[j] = current;
        }
    }

    return result;
}

// ---------- 5. 归并排序 ----------
// 分治法：把数组分成两半分别排序，再合并
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

// ---------- 6. 快速排序 ----------
// 分治法：选一个基准，把小于/等于/大于基准的元素分区后递归排序
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr.slice();
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const middle = [];
    const right = [];

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

// ---------- 7. 堆排序 ----------
// 利用最大堆的性质，反复把堆顶(最大值)放到末尾
function heapSort(arr) {
    const result = arr.slice();
    const n = result.length;

    // 从最后一个非叶子节点开始，构建最大堆
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(result, n, i);
    }

    // 依次把堆顶与末尾交换，再调整堆
    for (let i = n - 1; i > 0; i--) {
        [result[0], result[i]] = [result[i], result[0]];
        heapify(result, i, 0);
    }

    return result;
}

function heapify(arr, size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < size && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== root) {
        [arr[root], arr[largest]] = [arr[largest], arr[root]];
        heapify(arr, size, largest);
    }
}

// ---------- 8. 计数排序 ----------
// 非比较排序：统计每个值出现的次数，再按顺序输出（适合范围较小的整数）
function countingSort(arr) {
    if (arr.length === 0) return [];

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const count = new Array(max - min + 1).fill(0);

    for (const item of arr) {
        count[item - min]++;
    }

    const result = [];
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            result.push(i + min);
            count[i]--;
        }
    }

    return result;
}

// ---------- 9. 桶排序 ----------
// 非比较排序：把元素按范围分到多个桶中，桶内排序后依次取出
function bucketSort(arr, bucketSize = 5) {
    if (arr.length <= 1) return arr.slice();

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = Array.from({ length: bucketCount }, () => []);

    for (const item of arr) {
        const index = Math.floor((item - min) / bucketSize);
        buckets[index].push(item);
    }

    const result = [];
    for (const bucket of buckets) {
        result.push(...insertionSort(bucket));
    }

    return result;
}

// ---------- 10. 基数排序 ----------
// 非比较排序：按位(个位/十位/百位...)依次进行分配与收集
function radixSort(arr) {
    if (arr.length === 0) return [];

    const max = Math.max(...arr);
    const maxDigits = String(max).length;

    for (let digit = 0; digit < maxDigits; digit++) {
        const buckets = Array.from({ length: 10 }, () => []);
        for (const item of arr) {
            const radix = Math.floor(Math.abs(item) / Math.pow(10, digit)) % 10;
            buckets[radix].push(item);
        }
        arr = [].concat(...buckets);
    }

    return arr;
}

// ---------- 测试辅助函数 ----------
function assertSorted(label, fn, input, expected) {
    const result = fn(input);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${label}: ${passed ? '✅ 通过' : '❌ 失败'}`);
    if (!passed) {
        console.log('输入:', input);
        console.log('输出:', result);
        console.log('期望:', expected);
    }
    console.log('---');
}

// ---------- 测试 ----------
const data = [64, 34, 25, 12, 22, 11, 90, 5, 1, 7];
const expected = [...data].sort((a, b) => a - b);

assertSorted('冒泡排序', bubbleSort, data, expected);
assertSorted('选择排序', selectionSort, data, expected);
assertSorted('插入排序', insertionSort, data, expected);
assertSorted('希尔排序', shellSort, data, expected);
assertSorted('归并排序', mergeSort, data, expected);
assertSorted('快速排序', quickSort, data, expected);
assertSorted('堆排序', heapSort, data, expected);
assertSorted('计数排序', countingSort, data, expected);
assertSorted('桶排序', bucketSort, data, expected);
assertSorted('基数排序', radixSort, data, expected);

// 随机数组压力测试
function randomArray(size, max = 1000) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

const randomData = randomArray(100);
const randomExpected = [...randomData].sort((a, b) => a - b);

assertSorted('冒泡排序(随机100)', bubbleSort, randomData, randomExpected);
assertSorted('选择排序(随机100)', selectionSort, randomData, randomExpected);
assertSorted('插入排序(随机100)', insertionSort, randomData, randomExpected);
assertSorted('希尔排序(随机100)', shellSort, randomData, randomExpected);
assertSorted('归并排序(随机100)', mergeSort, randomData, randomExpected);
assertSorted('快速排序(随机100)', quickSort, randomData, randomExpected);
assertSorted('堆排序(随机100)', heapSort, randomData, randomExpected);
assertSorted('计数排序(随机100)', countingSort, randomData, randomExpected);
assertSorted('桶排序(随机100)', bucketSort, randomData, randomExpected);
assertSorted('基数排序(随机100)', radixSort, randomData, randomExpected);

console.log('所有排序算法已完成验证。');
