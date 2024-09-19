export default (stars: boolean[]) => {
    return stars.findLastIndex((value) => value === true) + 1;
}