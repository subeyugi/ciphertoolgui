console.log(toBase10("10", 16));

function toBase10(s, base){
    let bn = BigInt(s);
    let bbase = BigInt(base);
    let array = [];
    while(bn > 0){
        array.push(bn % bbase);
        bn /= bbase;
    }
    array.reverse();
    return array;
}