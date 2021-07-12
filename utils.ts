export const areArraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;

  return !a
    .map((_, i) => a[i] === b[i])
    .some((equal) => !equal);
};
