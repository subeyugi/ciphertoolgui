function convertString(s, from, to){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(convertString(e, from, to));
        });
        return result2;
    }
    console.log("from", from, to)
    if(from.length == 0) return s;
    if(from.length != to.length) return getErrorStr(s);

    let result = '';
    console.log(from, to);
    for(let i = 0; i < s.length; i++){
        let nonConv = true;
        for(let j = 0; j < from.length; j++){
            if(i + from[j].length - 1 < s.length && s.substring(i, i + from[j].length) == from[j]){
                nonConv = false;
                result += to[j];
                i += from[j].length - 1;
                break;
            }
        }
        if(nonConv){
            result += s[i];
        }
    }
    return result;
}