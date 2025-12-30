// Sliding window to return the minimum absolute difference between two elements in the array that are at least x indices apart.
const minAbsoluteDifference = function (nums, x) {
  if (!nums || nums.length <= x) return 0;

  let val = Infinity;
  let start = 0;
  let end = start + x;

  while (end < nums.length) {
    const diff = Math.abs(nums[end] - nums[start]);
    if (diff === 0) {
      val = 0;
      break;
    }

    if (end === nums.length - 1) {
      start++;
      end = start + x;
    } else {
      end++;
    }

    val = Math.min(val, diff);
  }
  return val;
};

// Find the Power of K-Size Subarrays II
// You are given an array of integers nums of length n and a positive integer k.
// The power of an array is defined as:
//Its maximum element if all of its elements are consecutive and sorted in ascending order.
//-1 otherwise.
//You need to find the power of all
//of nums of size k.
const resultsArray = function (nums, k) {
  const res = [];
  let streak = 1;

  for (let i = 0; i < nums.length; i++) {
    console.log(streak);
    if (i > 0 && nums[i] === nums[i - 1] + 1) {
      streak++;
    } else {
      streak = 1;
    }

    if (i >= k - 1) {
      res.push(streak >= k ? nums[i] : -1);
    }
  }

  return res;
};
