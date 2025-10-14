// backtracking DFS by considering what you can put in every position.
var numTilePossibilities = function (tiles) {
      const freq = new Map();

    // Build frequency map
    for (const ch of tiles) {
        freq.set(ch, (freq.get(ch) || 0) + 1);
    }

    function dfs() {
        let total = 0;

        for (const [ch, count] of freq) {
            if (count === 0) continue;

            // Choose
            total += 1; // Count the sequence with this letter
            freq.set(ch, count - 1);

            // Explore (DFS)
            total += dfs();

            // Backtrack
            freq.set(ch, count);
        }

        return total;
    }

    return dfs();
};
