function encodeStr(vec, charcode){
    let result =  [];
    vec.forEach(s => {
        if(charcode == 'base64'){//baes64は通常のエンコード、デコードを逆にしています
            return Encoding.base64Decode(s);
        }else{
            const unicodeArray = Encoding.stringToCode(s);//javascriptのデフォルト
            const sjisArray = Encoding.convert(unicodeArray, {
                to: charcode,
                from: 'UNICODE'
            });

            tmp = "";
            for(let i = 0; i < sjisArray.length; i++){
                tmp += sjisArray[i].toString(16).padStart(2, '0');
            }
            result.push(tmp);
        }
    });
    return result;
}

function decodeStr(vec, charcode){
    let result = [];
    vec.forEach(s => {
        let array = [];
        for(let i = 0; i < s.length; i += 2){
            array.push(parseInt(s.substr(i, 2), 16));
        }

        if(charcode == 'base64'){
            result.push(Encoding.base64Encode(array));
        }else{
            const unicodeArray = Encoding.convert(array, {
                to: 'UNICODE',
                from: charcode
            });
            result.push(Encoding.codeToString(unicodeArray));
        }
    });
    return result;
}
