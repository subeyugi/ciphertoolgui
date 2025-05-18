function convertAtbash(s){
    console.log("atbas", s)
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(convertAtbash(e));
        });
        return result2;
    }
    let result = '';
    for(let i = 0; i < s.length; i++){
        if('a'.charCodeAt(0) <= s.charCodeAt(i) && s.charCodeAt(i) <= 'z'.charCodeAt(0)){
            result += String.fromCharCode(25 - (s.charCodeAt(i) - 'a'.charCodeAt(0)) + 'a'.charCodeAt(0));
        }else{
            result += getErrorStr(s[i]);
        }
    }
    return result;
}