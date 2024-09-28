export default (array: any[]) => {
  array.sort((a, b) => {
    const rnd = Math.round(Math.random());
    return rnd === 0 ? -1 : 1;
  });
  return array;
};
