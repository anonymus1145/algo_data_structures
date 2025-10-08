
// Path Sum when you don't need to start from root

function pathSum(root, targetSum) {
    const prefix = new Map();
    prefix.set(0, 1); // base case
    let count = 0;

    function dfs(node, currSum) {
        if (!node) return;

        currSum += node.val;
        if (prefix.has(currSum - targetSum)) {
            count += prefix.get(currSum - targetSum);
        }

        prefix.set(currSum, (prefix.get(currSum) || 0) + 1);

        dfs(node.left, currSum);
        dfs(node.right, currSum);

        prefix.set(currSum, prefix.get(currSum) - 1); // backtrack
    }

    dfs(root, 0);
    return count;
}

// When you start from root

    var pathSum = function (root, targetSum) {
    if (!root) return [];

    const res = [];
    root.parent = null;
    const stack = [{ node: root, remain: targetSum - root.val }];

    while (stack.length) {
        let { node, remain } = stack.pop();

        // Leaf check
        if (!node.left && !node.right && remain === 0) {
            // Rebuild path from leaf to root
            let path = [];
            let cur = node;
            while (cur !== null) {
                path.push(cur.val);
                cur = cur.parent;
            }
            res.push(path.reverse());
        }

        // Push children with updated remain
        if (node.right) {
            node.right.parent = node;
            stack.push({ node: node.right, remain: remain - node.right.val });
        }
        if (node.left) {
            node.left.parent = node;
            stack.push({ node: node.left, remain: remain - node.left.val });
        }
    }

    return res;
};


// Longest Path

var longestUnivaluePath = function(root) {
    if (!root) return 0;

    let longPath = 0;
    const stack = [[root, false]]; // [node, visited]
    const downPaths = new Map();   // node -> longest downward same-value path

    while (stack.length) {
        let [node, visited] = stack.pop();

        if (!node) continue;

        if (visited) {
            // Post-order: children processed already
            let left = 0, right = 0;

            if (node.left && node.left.val === node.val) {
                left = downPaths.get(node.left) + 1;
            }
            if (node.right && node.right.val === node.val) {
                right = downPaths.get(node.right) + 1;
            }

            // Update global maximum
            longPath = Math.max(longPath, left + right);

            // Save longest downward path for parent use
            downPaths.set(node, Math.max(left, right));
        } else {
            // Push node again as visited, then children
            stack.push([node, true]);
            stack.push([node.left, false]);
            stack.push([node.right, false]);
        }
    }

    return longPath;
};


// DFS Adjancet list

function dfs(adjList) {
  if (!adjList || Object.keys(adjList).length === 0) {
    return;
  }
  const visited = new Set();

  function dfsHelper(node) {
    if (visited.has(node)) {
      return;
    }

    visited.add(node);
    for (const neighbor of adjList[node] || []) {
      dfsHelper(neighbor);
    }
    return;
  }

  // Handle disconnected components
  for (const node in adjList) {
    if (!visited.has(parseInt(node))) {
      dfsHelper(parseInt(node));
    }
  }
}

// Cloning a graph
//
  var cloneGraph = function (node) {
    if (!node) return null;

    const map = new Map(); // original -> clone
    const queue = [node]; // Change with Stack for DFS

    // create the clone of the first node
    map.set(node, { val: node.val, neighbors: [] });

    while (queue.length) {
        const cur = queue.shift();

        for (const neighbor of cur.neighbors) {
            if (!map.has(neighbor)) {
                // create clone if not exists
                map.set(neighbor, { val: neighbor.val, neighbors: [] });
                queue.push(neighbor);
            }
            // link the clone neighbors
            map.get(cur).neighbors.push(map.get(neighbor));
        }
    }

    return map.get(node);
};

// Find Islands iterative
var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1,0],[1,0],[0,-1],[0,1]];
    const visited = new Set();
    let count = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const key = `${i}-${j}`;
            if (grid[i][j] === "1" && !visited.has(key)) {
                count++;
                // start DFS
                const stack = [[i, j]];
                while (stack.length) {
                    const [x, y] = stack.pop();
                    const k = `${x}-${y}`;
                    if (visited.has(k)) continue;
                    visited.add(k);

                    for (const [dx, dy] of directions) {
                        const nx = x + dx;
                        const ny = y + dy;
                        const nk = `${nx}-${ny}`;
                        if (nx >= 0 && nx < rows && ny >= 0 && ny < cols &&
                            grid[nx][ny] === "1" && !visited.has(nk)) {
                            stack.push([nx, ny]);
                        }
                    }
                }
            }
        }
    }
    return count;
};

// Find Islands recursive (keep in mind stack overflow)
var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    // Recursive DFS to mark all connected '1's as visited
    function dfs(x, y) {
        // Stop if out of bounds or cell is water
        if (x < 0 || x >= rows || y < 0 || y >= cols || grid[x][y] === "0") return;

        grid[x][y] = "0"; // mark visited

        // Visit all 4 neighbors
        dfs(x - 1, y);
        dfs(x + 1, y);
        dfs(x, y - 1);
        dfs(x, y + 1);
    }

    // Scan the entire grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === "1") {
                count++;       // found a new island
                dfs(i, j);     // mark the entire island as visited
            }
        }
    }

    return count;
};

//Time complexity: identical, O(rows × cols)
//Space complexity: roughly identical, but recursive uses call stack, iterative uses explicit stack


// For problems like suronding areas, where if a cell is on the edge is safe, and you need to do dfs from the edge
var solve = function (board) {
    if (!board || board.length === 0) return;

    const rows = board.length;
    const cols = board[0].length;

    // Recursive DFS to mark all connected regions "O" as safe
    function dfs(x, y) {
        // Stop if out of bounds or cell is not "O"
        if (x < 0 || x >= rows || y < 0 || y >= cols || board[x][y] !== "O") return;

        board[x][y] = "S"; // mark as safe

        // Visit all 4 neighbors
        dfs(x - 1, y);
        dfs(x + 1, y);
        dfs(x, y - 1);
        dfs(x, y + 1);
    }

    // Step 1: Start DFS only from edge "O"s
    for (let i = 0; i < rows; i++) {
        if (board[i][0] === "O") dfs(i, 0);
        if (board[i][cols - 1] === "O") dfs(i, cols - 1);
    }
    for (let j = 0; j < cols; j++) {
        if (board[0][j] === "O") dfs(0, j);
        if (board[rows - 1][j] === "O") dfs(rows - 1, j);
    }

    // Step 2: Flip all remaining "O"s to "X", restore safe "S"s to "O"
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === "O") board[i][j] = "X";
            else if (board[i][j] === "S") board[i][j] = "O";
        }
    }
};


// BFS algorithm to calculate the number of nodes at each level
var levelOrder = function (root) {
    if (!root) return [];

    const queue = [root];
    const levels = [];

    while (queue.length) {
        // number of nodes at the current level
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        // IMPORTANT
        // we have finished processing all nodes at the current level
        levels.push(currentLevel);
    }
    return levels;
};


// Remove node at some level BFS

var deleteNode = function(root, key) {
    if (!root) return null;

    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Node found
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // Node with two children: Get the in-order successor (min in right subtree)
        let minNode = getMin(root.right);
        root.val = minNode.val;

        // Delete the in-order successor
        root.right = deleteNode(root.right, minNode.val);
    }

    return root;
};

// Helper: Find min node in a subtree
function getMin(node) {
    while (node.left) {
        node = node.left;
    }
    return node;
}
