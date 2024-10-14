class Graph {
    constructor() {
        this.vertices = [];
        this.edges = [];
    }

    addVertex(vertex) {
        if (!this.vertices.includes(vertex)) {
            this.vertices.push(vertex);
        }
    }

    addEdge(vertex1, vertex2) {
        this.edges.push([vertex1, vertex2]);
    }

    displayGraph() {
        const displayArea = document.getElementById('displayArea');
        displayArea.innerHTML = `<h3>Vertices:</h3><ul>`;
        this.vertices.forEach(vertex => {
            displayArea.innerHTML += `<li>${vertex}</li>`;
        });
        displayArea.innerHTML += `</ul><h3>Edges:</h3><ul>`;
        this.edges.forEach(edge => {
            displayArea.innerHTML += `<li>${edge[0]} - ${edge[1]}</li>`;
        });
        displayArea.innerHTML += `</ul>`;
    }
}

let graph = new Graph();

function addVertexGraph() {
    const vertex = document.getElementById('graphInput').value;
    if (vertex === '') {
        alert('Please enter a vertex!');
        return;
    }
    graph.addVertex(vertex);
    document.getElementById('graphInput').value = ''; // Clear input field
    graph.displayGraph();
}

function addEdgeGraph() {
    const vertex1 = document.getElementById('vertex1').value;
    const vertex2 = document.getElementById('vertex2').value;
    if (vertex1 === '' || vertex2 === '') {
        alert('Please enter two vertices!');
        return;
    }
    graph.addEdge(vertex1, vertex2);
    document.getElementById('vertex1').value = ''; // Clear input field
    document.getElementById('vertex2').value = ''; // Clear input field
    graph.displayGraph();
}

function refreshGraph() {
    graph = new Graph();  // Reset the graph
    graph.displayGraph();
}
