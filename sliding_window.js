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
