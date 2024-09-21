export default (str: string): number => {
  const num = Number(str);
  if (Number.isNaN(num)) return 0;
  return num;
};
