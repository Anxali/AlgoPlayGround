let queue = [];

function enqueueElement() {
    const input = document.getElementById('queueInput').value;
    if (input === '') {
        alert('Please enter a value to enqueue!');
        return;
    }

    // Enqueue the element
    queue.push(input);

    // Clear the input field
    document.getElementById('queueInput').value = '';

    // Display the updated queue
    displayQueue();
}

function dequeueElement() {
    if (queue.length === 0) {
        alert('Queue is empty!');
        return;
    }

    // Dequeue the first element
    const dequeuedElement = queue.shift();

    // Display the updated queue with animation
    displayQueue(dequeuedElement);
}

function peekElement() {
    if (queue.length === 0) {
        alert('Queue is empty!');
    } else {
        alert(`Front element is: ${queue[0]}`);
    }
}

function displayQueue(dequeuedElement = null) {
    const displayArea = document.getElementById('displayArea');

    if (queue.length === 0) {
        displayArea.innerHTML = '<p>The queue is empty.</p>';
    } else {
        displayArea.innerHTML = `<h3>Queue:</h3><ul class="queue-list">`;

        queue.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;

            // Add animation class to the last element for enqueue
            if (index === queue.length - 1) {
                li.classList.add('push-animation');
            }

            displayArea.appendChild(li);
        });

        displayArea.innerHTML += `</ul>`;
    }

    // Handle dequeue animation
    if (dequeuedElement) {
        const listItems = document.querySelectorAll('.queue-list li');
        const firstItem = listItems[0];

        firstItem.classList.add('pop-animation');

        setTimeout(() => {
            firstItem.remove();
        }, 500);
    }
}

function refreshQueue() {
    queue = [];
    document.getElementById('queueInput').value = '';
    displayQueue();
}

function goBackQueue() {
    window.location.href = 'index.html';
}
