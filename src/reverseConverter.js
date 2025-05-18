function reverseStr(s){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(reverseStr(e));
        });
        return result2;
    }
    result = "";
    for(let i = s.length - 1; i >= 0; i--){
        result += s[i];
    }
    return result;
}