class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

let bstRoot = null;

function insertNode() {
    const input = document.getElementById('bstInput').value;
    if (input === '') {
        alert('Please enter a value!');
        return;
    }

    bstRoot = insert(bstRoot, parseInt(input));
    document.getElementById('bstInput').value = ''; // Clear input field
    displayBST(bstRoot);
}

function insert(root, value) {
    if (root === null) {
        return new TreeNode(value);
    }
    if (value < root.value) {
        root.left = insert(root.left, value);
    } else {
        root.right = insert(root.right, value);
    }
    return root;
}

function inorderTraversal(root, nodes = []) {
    if (root === null) return nodes;
    inorderTraversal(root.left, nodes);
    nodes.push(root.value);
    inorderTraversal(root.right, nodes);
    return nodes;
}

function displayBST(root) {
    const displayArea = document.getElementById('displayArea');
    const nodes = inorderTraversal(root);
    displayArea.innerHTML = `<h3>Inorder Traversal:</h3><ul>`;
    nodes.forEach(node => {
        const li = document.createElement('li');
        li.textContent = node;
        displayArea.appendChild(li);
    });
    displayArea.innerHTML += `</ul>`;
}

function refreshBST() {
    bstRoot = null;
    document.getElementById('bstInput').value = ''; // Clear input
    displayBST(bstRoot); // Display empty BST
}
