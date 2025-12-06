var countBits = function (n) {
  const ans = [0];
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
};

var numDecodings = function (s) {
  if (!s || s.length <= 0) return 0;

  const splitNums = s.split('');
  let prev = 1;
  let cur = 1;

  if (Number(splitNums[0]) === 0) return 0;

  for (let i = 1; i < splitNums.length; i++) {
    let temp = 0;

    // Single-digit check
    if (Number(splitNums[i]) !== 0) {
      temp += cur;
    }

    // Double-digit check
    const twoDigit = Number(splitNums[i - 1] + splitNums[i]);
    if (twoDigit >= 10 && twoDigit <= 26) {
      temp += prev;
    }

    // Shift prev/cur for next iteration
    prev = cur;
    cur = temp;
  }
  return cur;
};

var maximalSquare = function (matrix) {
  const row = matrix.length;
  const col = matrix[0].length;

  if (row <= 0 || col <= 0) return 0;

  let prev = 0; // top-left diagonal
  let curRow = Array(col).fill(0); // current row DP
  let maxSide = 0;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix[i][j] === '1') {
        let temp = curRow[j];
        curRow[j] = Math.min(curRow[j], curRow[j - 1] || 0, prev) + 1;
        prev = temp;
        maxSide = Math.max(maxSide, curRow[j]);
      } else {
        curRow[j] = 0;
        prev = 0;
      }
      maxSide = Math.max(maxSide, curRow[j]);
    }
  }
  return maxSide * maxSide;
};


var maxSumDivThree = function (nums) {
  if (!nums || nums.length <= 0) return 0;
  const dp = [0, 0, 0];

  for (num of nums) {
    const current = [...dp];

    for (sum of current) {
      const newSum = sum + num;
      const remainder = newSum % 3;
      dp[remainder] = Math.max(dp[remainder], newSum);
    }
  }
  return dp[0];
};


var longestArithSeqLength = function (nums) {
  const n = nums.length;
  let longest = 2;

  if (n <= 2) return n;

  const dp = Array.from({ length: n }, () => new Map());

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const diff = nums[i] - nums[j];
      const prev = dp[j].get(diff) || 1;
      const curr = prev + 1;
      dp[i].set(diff, curr);
      longest = Math.max(longest, curr);
    }
  }
  return longest;
};
