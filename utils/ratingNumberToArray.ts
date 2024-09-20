export default (rating: number) => {
    let array: boolean[] = [];
    for (let index = 0; index < 5; index++) {
        if(index < rating)
        {
            array.push(true);
            continue;
        }
        array.push(false);
    }
    return array;
}