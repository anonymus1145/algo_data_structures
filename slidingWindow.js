// Minimum Number of Operations to Make All Array Elements Equal to 1

/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    if (nums.length <= 0) return -1;
       const n = nums.length;

    // Count how many 1's are present
    let countOnes = nums.filter(x => x === 1).length;

    // Case 1: If there are already 1's in array
    if (countOnes > 0) {
        return n - countOnes; // turn each non-1 into 1
    }

    // Helper gcd
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

    // Case 2: No 1s → find shortest subarray with gcd = 1
    let best = Infinity;

    for (let i = 0; i < n; i++) {
        let curr = nums[i];
        for (let j = i; j < n; j++) {
            curr = gcd(curr, nums[j]);
            if (curr === 1) {
                best = Math.min(best, j - i + 1);
                break; // no need to extend further
            }
        }
    }

    // If no subarray with gcd 1 exists
    if (best === Infinity) return -1;

    // Total operations = (length to create first 1 - 1) + (n - 1)
    return best - 1 + (n - 1);
};
