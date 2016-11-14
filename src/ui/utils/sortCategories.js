export default (x, y) => {
  if (x.isSelfDefined && !y.isSelfDefined) return 1;
  if (!x.isSelfDefined && y.isSelfDefined) return -1;
  return 0;
};
