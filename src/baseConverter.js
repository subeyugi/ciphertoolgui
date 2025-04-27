letters = "0123456789abcdefghijklmnopqrstuvwxyz";
rletters = new Map();
for(let i = 0; i < 36; i++){
    rletters[letters[i]] = i;
}

function fromBase10(s, base, isList){
    if(base < 2) return undefined;
    let n = BigInt(s);
    let bbase = BigInt(base);
    let array = [];
    while(n > 0){
        array.push(n % bbase);
        n /= bbase;
    }
    array.reverse();
    if(isList){
        let result = "";
        for(let i = 0; i < array.length; i++){
            if(i != 0) result += ",";
            result += array[i].toString();
        }
        return result;
    }else{
        let result = "";
        for(let i = 0; i < array.length; i++){
            result += letters[array[i]];
        }
        return result;
    }
}

function toBase10(s, base, isList){
    let array = [];
    if(isList){
        array = s.split(",");
    }else{
        for(let i = 0; i < s.length; i++){
            array[i] = rletters[s[i]];
        }
    }
    let n = 0n;
    let bbase = BigInt(base);
    for(let i = 0; i < s.length; i++){
        n *= BigInt(bbase);
        n += BigInt(array[i]);
    }
    return n.toString();
}

function convertBase(s, fromBase, toBase){
    return fromBase10(toBase10(s, fromBase, false), toBase, false);
}