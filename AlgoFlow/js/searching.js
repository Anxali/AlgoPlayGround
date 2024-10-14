// Global variables
let array = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Update the display of the blocks
function updateBlockDisplay() {
    const container = document.getElementById("arrayBlocks");
    container.innerHTML = "";
    array.forEach(value => {
        const block = document.createElement("div");
        block.classList.add("block");
        block.innerText = value;
        container.appendChild(block);
    });
}

// Parse the input array
function parseInput() {
    const input = document.getElementById("arrayInput").value;
    array = input.split(',').map(item => parseInt(item.trim()));
    updateBlockDisplay();
    document.getElementById("notPresent").innerHTML = ''; // Clear "Not present" message
}

// Linear Search Algorithm
// Linear Search Algorithm
async function linearSearch() {
    const target = parseInt(document.getElementById("targetInput").value);
    const blocks = document.querySelectorAll(".block");

    for (let i = 0; i < array.length; i++) {
        blocks[i].classList.add("active");
        await sleep(500);
        if (array[i] === target) {
            blocks[i].classList.add("found");
            return;
        }
        blocks[i].classList.remove("active");
    }

    blocks[blocks.length - 1].classList.add("not-found");
}


// Binary Search Algorithm
async function binarySearch() {
    const target = parseInt(document.getElementById("targetInput").value);
    let left = 0, right = array.length - 1;
    const blocks = document.querySelectorAll(".block");

    // Sort the array first for binary search
    const originalArray = [...array];  // Preserve original array for visualization
    array.sort((a, b) => a - b);
    updateBlockDisplay();

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        blocks[mid].classList.add("active");
        await sleep(500);
        blocks[mid].style.backgroundColor = '#f39c12'; // Highlight in bright neon color

        if (array[mid] === target) {
            blocks[mid].classList.add("found");
            document.getElementById("Present").innerHTML = "Target Present in the Array";
            return;
        }
        blocks[mid].classList.remove("Present");

        blocks[mid].classList.remove("active");
        blocks[mid].style.backgroundColor = '#333'; // Reset color to default

        if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    // Optionally: You can remove this line to stop displaying the "Not present" message
    // document.getElementById("notPresent").innerHTML = "Target Not Present in the Array";

    // Provide visual cue without printing the message
    blocks[blocks.length - 1].classList.add("not-found");
    
    // Restore the array to original order
    array = originalArray;
}


// Event Listeners for Buttons
document.getElementById("linearSearchButton").onclick = function() {
    parseInput();
    linearSearch();
};

document.getElementById("binarySearchButton").onclick = function() {
    parseInput();
    binarySearch();
};

// Refresh Button
document.getElementById("refreshButton").onclick = function() {
    document.getElementById("arrayInput").value = '';
    document.getElementById("targetInput").value = '';
    array = [];
    updateBlockDisplay();
    document.getElementById("notPresent").innerHTML = ''; // Clear message
};

// Back Button
document.getElementById("backButton").onclick = function() {
    window.location.href = 'index.html'; // Change this to the home page path
};