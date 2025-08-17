//シーザー暗号

function decodeCaesar(s, rot, isVec=false){
    console.log(s);
    let result = '';
    let message = '';
    if(isVec){
        for(let i = 0; i < s.length; ++i){
            for(let j = 0; j < s[i].length; ++j){
                for(let k = 0; k < s[i][j].length; ++k){
                    let tmp = decodeCaesar(s[i][j][k], rot);
                    s[i][j][k] = tmp.result;
                    message += tmp.message;
                }   
            }
        }
        return new ConverterResult(s, message);
    }else{
        for(let i = 0; i < s.length; i++){
            if('a'.charCodeAt(0) <= s.charCodeAt(i) && s.charCodeAt(i) <= 'z'.charCodeAt(0)){
                result += String.fromCharCode((s.charCodeAt(i) - 'a'.charCodeAt(0) +  rot % 26 + 26) % 26 + 'a'.charCodeAt(0));
            }else{
                result += getErrorStr(s[i]);
                if(message == '') message = `"${s[i]}"を変換できません`;
            }
        }
        return new ConverterResult(result, message);
    }
}
