// Binary representation of the smallest number >= n
const smallestNumber = function (n) {
  if (!n || n <= 0) return 0;

  const binaryRepresentation = n.toString(2);
  const setOfBits = (2 ** binaryRepresentation.length) - 1;

  return setOfBits;
};
