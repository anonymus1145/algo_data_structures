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
