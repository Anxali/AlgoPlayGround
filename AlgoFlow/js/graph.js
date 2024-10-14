const rows = 10;
        const cols = 10;
        const grid = [];
        let start = null;
        let end = null;

        // Initialize the grid
        function initializeGrid() {
            grid.length = 0;
            const gridContainer = document.getElementById('grid-container');
            gridContainer.innerHTML = '';

            for (let row = 0; row < rows; row++) {
                let rowArray = [];
                for (let col = 0; col < cols; col++) {
                    const cell = document.createElement('div');
                    cell.classList.add('grid-cell');
                    cell.setAttribute('data-row', row);
                    cell.setAttribute('data-col', col);
                    cell.addEventListener('click', () => handleCellClick(row, col));
                    gridContainer.appendChild(cell);
                    rowArray.push(cell);
                }
                grid.push(rowArray);
            }
        }

        // Handle cell click to set start and end points
        function handleCellClick(row, col) {
            const cell = grid[row][col];

            if (start && end) {
                // If both start and end are set, reset grid
                resetGrid();
                start = null;
                end = null;
            }

            if (!start) {
                cell.classList.add('start');
                start = { row, col };
            } else if (!end) {
                cell.classList.add('end');
                end = { row, col };
            }
        }

        // Reset grid colors
        function resetGrid() {
            grid.forEach(row => row.forEach(cell => {
                cell.classList.remove('visited', 'active', 'start', 'end');
            }));
        }

        // BFS Algorithm
        function bfs() {
            if (!start || !end) return;

            let queue = [start];
            let visited = new Set();
            visited.add(`${start.row},${start.col}`);
            let prev = {};  // Store previous node to reconstruct path

            // Directions for moving up, down, left, right
            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ];

            while (queue.length > 0) {
                const { row, col } = queue.shift();
                grid[row][col].classList.add('visited');

                if (row === end.row && col === end.col) {
                    reconstructPath(prev);
                    return;
                }

                for (const [dx, dy] of directions) {
                    const newRow = row + dx;
                    const newCol = col + dy;
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited.has(`${newRow},${newCol}`) && !grid[newRow][newCol].classList.contains('start')) {
                        visited.add(`${newRow},${newCol}`);
                        queue.push({ row: newRow, col: newCol });
                        prev[`${newRow},${newCol}`] = `${row},${col}`;
                    }
                }
            }
        }

        // DFS Algorithm
        function dfs() {
            if (!start || !end) return;

            let stack = [start];
            let visited = new Set();
            visited.add(`${start.row},${start.col}`);
            let prev = {};

            // Directions for moving up, down, left, right
            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ];

            while (stack.length > 0) {
                const { row, col } = stack.pop();
                grid[row][col].classList.add('visited');

                if (row === end.row && col === end.col) {
                    reconstructPath(prev);
                    return;
                }

                for (const [dx, dy] of directions) {
                    const newRow = row + dx;
                    const newCol = col + dy;
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited.has(`${newRow},${newCol}`) && !grid[newRow][newCol].classList.contains('start')) {
                        visited.add(`${newRow},${newCol}`);
                        stack.push({ row: newRow, col: newCol });
                        prev[`${newRow},${newCol}`] = `${row},${col}`;
                    }
                }
            }
        }

        // Dijkstra Algorithm
        function dijkstra() {
            if (!start || !end) return;

            const distances = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
            const prev = {};
            const pq = [];

            distances[start.row][start.col] = 0;
            pq.push([0, start.row, start.col]);

            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ];

            while (pq.length > 0) {
                const [dist, row, col] = pq.shift();
                grid[row][col].classList.add('visited');

                if (row === end.row && col === end.col) {
                    reconstructPath(prev);
                    return;
                }

                for (const [dx, dy] of directions) {
                    const newRow = row + dx;
                    const newCol = col + dy;
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        const newDistance = dist + 1;
                        if (newDistance < distances[newRow][newCol]) {
                            distances[newRow][newCol] = newDistance;
                            pq.push([newDistance, newRow, newCol]);
                            prev[`${newRow},${newCol}`] = `${row},${col}`;
                        }
                    }
                }
            }
        }

        // Reconstruct the path for BFS/DFS/Dijkstra
        function reconstructPath(prev) {
            let current = `${end.row},${end.col}`;
            while (current) {
                const [row, col] = current.split(',').map(Number);
                grid[row][col].classList.add('active');
                current = prev[current];
            }
        }

        // Event listeners
        document.getElementById('bfsButton').addEventListener('click', bfs);
        document.getElementById('dfsButton').addEventListener('click', dfs);
        document.getElementById('dijkstraButton').addEventListener('click', dijkstra);
        document.getElementById('refreshButton').addEventListener('click', () => {
            resetGrid();
            start = null;
            end = null;
        });

        // Initialize grid on page load
        initializeGrid();