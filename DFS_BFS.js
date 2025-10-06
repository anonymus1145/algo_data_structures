
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

