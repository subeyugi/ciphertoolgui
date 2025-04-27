function reverseStr(s){
    result = "";
    for(let i = s.length - 1; i >= 0; i--){
        result += s[i];
    }
    return result;
}