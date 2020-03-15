
export default (e) => {
  if (!e) return;
  e.target.blur();
  e.stopPropagation();
};
