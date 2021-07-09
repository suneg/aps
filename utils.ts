export const areArraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;

  return a
    .map((element, i) => element === b[i])
    .every((equal) => equal === true);
};