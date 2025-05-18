letters = "0123456789abcdefghijklmnopqrstuvwxyz";
rletters = new Map();
for(let i = 0; i < 36; i++){
    rletters.set(letters[i], i);
}

function fromBase10(s, base, isList){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(fromBase10(e));
        });
        return result2;
    }
    if(base <= 1) return getErrorStr(s);

    let n = BigInt(s);
    let bbase = BigInt(base);
    let array = [];
    while(n > 0){
        array.push(n % bbase);
        n /= bbase;
    }
    array.reverse();
    if(array.length == 0){
        array.push(0);
    }
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
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(toBase10(e));
        });
        return result2;
    }
    let array = [];
    if(isList){
        array = s.split(",");
    }else{
        for(let i = 0; i < s.length; i++){
            if(rletters.has(s[i])){
                array[i] = rletters.get(s[i]);
                if(!(0 <= array[i] && array[i] < base)){
                    return getErrorStr(s);
                }
            }else{
                return getErrorStr(s);
            }
        }
    }
    console.log(array);
    let n = 0n;
    let bbase = BigInt(base);
    for(let i = 0; i < s.length; i++){
        n *= BigInt(bbase);
        n += BigInt(array[i]);
    }
    return n.toString();
}

function convertBase(s, fromBase, toBase){
    try{
        if(Array.isArray(s)){
            let result2 = [];
            s.forEach(e => {
                result2.push(convertBase(e, fromBase, toBase));
            });
            return result2;
        }
        if(s == '') return '';
        if(!Number.isInteger(fromBase)) return getErrorStr(s);
        if(!Number.isInteger(toBase)) return getErrorStr(s);
        return fromBase10(toBase10(s, fromBase, false), toBase, false);
    }catch(e){
        return getErrorStr(s);
    }
}