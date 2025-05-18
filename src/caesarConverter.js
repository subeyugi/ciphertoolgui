//シーザー暗号

function decodeCaesar(s, rot){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(decodeCaesar(e, rot));
        });
        return result2;
    }
    console.log(s, rot);
    let result = "";
    for(let i = 0; i < s.length; i++){
        if('a'.charCodeAt(0) <= s.charCodeAt(i) && s.charCodeAt(i) <= 'z'.charCodeAt(0)){
            result += String.fromCharCode((s.charCodeAt(i) - 'a'.charCodeAt(0) +  rot % 26 + 26) % 26 + 'a'.charCodeAt(0));
        }else{
            result += getErrorStr(s[i])
        }
    }
    return result;
}