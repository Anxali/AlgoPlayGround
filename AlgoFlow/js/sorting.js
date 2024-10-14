let array = [];
const nodeContainer = document.getElementById("node-container");

// Update the node visualization
function updateNodeDisplay() {
    nodeContainer.innerHTML = '';
    array.forEach((value, index) => {
        const node = document.createElement('div');
        node.classList.add('node');
        node.textContent = value;
        nodeContainer.appendChild(node);
    });
}

// Parse the input array
function parseInput() {
    const input = document.getElementById("arrayInput").value;
    array = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    updateNodeDisplay();
}

// Helper function to introduce delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            const nodes = document.querySelectorAll('.node');
            nodes[j].classList.add('active');
            nodes[j + 1].classList.add('active');

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                updateNodeDisplay();
                await sleep(500);
            }

            nodes[j].classList.remove('active');
            nodes[j + 1].classList.remove('active');
        }
    }
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => node.classList.add('sorted'));
}

// Selection Sort
async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        const nodes = document.querySelectorAll('.node');
        nodes[i].classList.add('active');

        for (let j = i + 1; j < array.length; j++) {
            nodes[j].classList.add('active');
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
            await sleep(500);
            nodes[j].classList.remove('active');
        }

        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        updateNodeDisplay();
        nodes[i].classList.remove('active');
    }
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => node.classList.add('sorted'));
}

// Insertion Sort
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        const current = array[i];
        let j = i - 1;
        const nodes = document.querySelectorAll('.node');
        nodes[i].classList.add('active');

        while (j >= 0 && array[j] > current) {
            array[j + 1] = array[j];
            j--;
            updateNodeDisplay();
            await sleep(500);
        }
        array[j + 1] = current;
        updateNodeDisplay();
        nodes[i].classList.remove('active');
    }
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => node.classList.add('sorted'));
}

// Merge Sort
async function mergeSort() {
    async function merge(left, right) {
        let result = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            const nodes = document.querySelectorAll('.node');
            nodes[i + j].classList.add('merge');
            if (left[i] < right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
            updateNodeDisplay();
            await sleep(500);
            nodes[i + j].classList.remove('merge');
        }
        return result.concat(left.slice(i), right.slice(j));
    }

    async function sort(arr) {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);
        return merge(await sort(left), await sort(right));
    }

    array = await sort(array);
    updateNodeDisplay();
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => node.classList.add('sorted'));
}

// Quick Sort
async function quickSort() {
    async function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
        const nodes = document.querySelectorAll('.node');
        for (let j = low; j < high; j++) {
            nodes[j].classList.add('active');
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                updateNodeDisplay();
                await sleep(500);
            }
            nodes[j].classList.remove('active');
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        updateNodeDisplay();
        return i + 1;
    }

    async function sort(arr, low, high) {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await sort(arr, low, pi - 1);
            await sort(arr, pi + 1, high);
        }
    }

    await sort(array, 0, array.length - 1);
    updateNodeDisplay();
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => node.classList.add('sorted'));
}

// Counting Sort
async function countingSort() {
    const max = Math.max(...array);
    const min = Math.min(...array);
    const count = Array(max - min + 1).fill(0);
    const output = new Array(array.length);
    for (let i = 0; i < array.length; i++) {
        count[array[i] - min]++;
    }

    let index = 0;
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            output[index] = i + min;
            index++;
            count[i]--;
            updateNodeDisplay();
            await sleep(500);
        }
    }

    array = output;
    updateNodeDisplay();
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => node.classList.add('sorted'));
}

// Event Listeners for Sorting Buttons
document.getElementById("bubbleSortButton").onclick = function() {
    parseInput();
    bubbleSort();
};
document.getElementById("selectionSortButton").onclick = function() {
    parseInput();
    selectionSort();
};
document.getElementById("insertionSortButton").onclick = function() {
    parseInput();
    insertionSort();
};
document.getElementById("mergeSortButton").onclick = function() {
    parseInput();
    mergeSort();
};
document.getElementById("quickSortButton").onclick = function() {
    parseInput();
    quickSort();
};
document.getElementById("countingSortButton").onclick = function() {
    parseInput();
    countingSort();
};

// Refresh Button
document.getElementById("refreshButton").onclick = function() {
    document.getElementById("arrayInput").value = '';
    array = [];
    updateNodeDisplay();
};