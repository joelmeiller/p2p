export default (x, y) => {
  if (x.removed && !y.removed) return 1;
  if (!x.removed && y.removed) return -1;
  if (x.email > y.email) return 1;
  return -1;
};
