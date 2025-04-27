function encodeStr(s, charcode){
    if(charcode == 'base64'){//baes64は通常のエンコード、デコードを逆にしています
        return Encoding.base64Decode(s);
    }else{
        const unicodeArray = Encoding.stringToCode(s);//javascriptのデフォルト
        const sjisArray = Encoding.convert(unicodeArray, {
            to: charcode,
            from: 'UNICODE'
        });

        result = "";
        for(let i = 0; i < sjisArray.length; i++){
            result += sjisArray[i].toString(16).padStart(2, '0');
        }
        return result;
    }
}

function decodeStr(s, charcode){
    let array = [];
    for(let i = 0; i < s.length; i += 2){
        array.push(parseInt(s.substr(i, 2), 16));
    }

    if(charcode == 'base64'){
        return Encoding.base64Encode(array);
    }else{
        const unicodeArray = Encoding.convert(array, {
            to: 'UNICODE',
            from: charcode
        });
        return Encoding.codeToString(unicodeArray);
    }
}
