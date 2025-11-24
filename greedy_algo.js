const findContentChildren = (g, s) => {
  if (g.length === 0 || s.length === 0) return 0;
  // g -> children's
  // s -> cookies
  // We need to sort them
  s.sort((a, b) => a - b);
  g.sort((a, b) => a - b);

  let j = 0;
  let i = 0
  let count = 0;

  while (i < g.length && j < s.length) {
    if (s[j] >= g[i]) {
      count++;
      j++;
      i++;
    }

    if (s[j] < g[i]) {
      j++;
    }
  }
  return count;
};
