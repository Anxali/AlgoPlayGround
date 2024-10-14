// Initialize an empty array to represent the stack
let stack = [];

// Push an element onto the stack with animation
function pushElement() {
    const input = document.getElementById('stackInput').value;
    if (input === '') {
        alert('Please enter a value to push!');
        return;
    }

    // Push the element onto the stack
    stack.push(input);

    // Clear the input field
    document.getElementById('stackInput').value = '';

    // Display the updated stack with animation
    displayStack();
}

// Pop an element from the stack with animation
function popElement() {
    if (stack.length === 0) {
        alert('Stack is empty!');
        return;
    }

    // Pop the last element from the stack
    const poppedElement = stack.pop();

    // Display the updated stack with animation
    displayStack(poppedElement);
}

// Peek the top element of the stack
function peekElement() {
    if (stack.length === 0) {
        alert('Stack is empty!');
        return;
    }

    // Display the top element
    alert(`Top element: ${stack[stack.length - 1]}`);
}

// Display the current state of the stack with animations
function displayStack(poppedElement = null) {
    const displayArea = document.getElementById('displayArea');

    // If the stack is empty
    if (stack.length === 0) {
        displayArea.innerHTML = '<p>The stack is empty.</p>';
    } else {
        displayArea.innerHTML = `<h3>Stack:</h3><ul class="stack-list">`;

        // Add each item in the stack
        stack.forEach((item, index) => {
            const isLastItem = index === stack.length - 1;

            // Create a list item with animation class
            const li = document.createElement('li');
            li.textContent = item;

            // Add animation class to the last pushed item
            if (isLastItem) {
                li.classList.add('push-animation');
            }

            // Append the list item to the stack
            displayArea.appendChild(li);
        });

        displayArea.innerHTML += `</ul>`;
    }

    // Handle the pop animation if an element was removed
    if (poppedElement) {
        const listItems = document.querySelectorAll('.stack-list li');
        const lastItem = listItems[listItems.length - 1];

        lastItem.classList.add('pop-animation');
        
        // Remove the popped item after animation
        setTimeout(() => {
            lastItem.remove();
        }, 500); // Wait for the fade-out animation to complete
    }
}

// Refresh the page (clear the stack and input)
function refreshPage() {
    stack = []; // Clear the stack
    document.getElementById('stackInput').value = ''; // Clear the input field
    displayStack(); // Refresh the display
}

// Go back to the index page
function goBack() {
    window.location.href = 'index.html'; // Redirect to index page
}
