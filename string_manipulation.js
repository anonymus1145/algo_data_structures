// Find anagrams and remove them
function funWithAnagrams(text) {
  const seen = new Set();
  const result = [];

  for (const word of text) {
    // Normalize the word by sorting its letters
    const signature = word.split('').sort().join('');

    // Only keep the first occurrence of each signature
    if (!seen.has(signature)) {
      seen.add(signature);
      result.push(word);
    }
  }

  // Return the result sorted alphabetically
  return result.sort();
}

// Reduce array and sort articles
const reduceArticles = (allArticles) => {
  const validArticles = allArticles.reduce((acc, a) => {
    const name = a.title || a.story_title;
    if (name) {
      acc.push({
        name,
        comments: typeof a.num_comments === "number" ? a.num_comments : 0
      });
    }
    return acc;
  }, []);

  validArticles.sort((a, b) => {
    if (b.comments !== a.comments) return b.comments - a.comments;
    return b.name.localeCompare(a.name);
  });

  return validArticles.slice(0, limit).map((a) => a.name);
}
