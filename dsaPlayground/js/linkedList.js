class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

let head = null;

function addNode() {
    const input = document.getElementById('linkedListInput').value;
    if (input === '') {
        alert('Please enter a value!');
        return;
    }

    const newNode = new ListNode(input);
    if (head === null) {
        head = newNode;
    } else {
        let current = head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
    }

    document.getElementById('linkedListInput').value = '';
    displayLinkedList();
}

function removeNode() {
    if (head === null) {
        alert('The list is empty!');
        return;
    }

    head = head.next;
    displayLinkedList();
}

function displayLinkedList() {
    const displayArea = document.getElementById('displayArea');
    if (head === null) {
        displayArea.innerHTML = 'The list is empty.';
    } else {
        let current = head;
        displayArea.innerHTML = '<h3>Linked List:</h3><ul>';
        while (current !== null) {
            displayArea.innerHTML += `<li>${current.value}</li>`;
            current = current.next;
        }
        displayArea.innerHTML += `</ul>`;
    }
}

function refreshLinkedList() {
    head = null;
    displayLinkedList();
}
