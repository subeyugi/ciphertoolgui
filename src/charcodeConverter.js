//encoding.js by polygonplanet
//https://github.com/polygonplanet/encoding.js
//charcode: SJIS, ASCII, EUCJP, UTF8, UTF16, UNICODE
function encodeStr(s, charcode, isVec=false){
    if(isVec){
        for(let i = 0; i < s.length; ++i){
            for(let j = 0; j < s[i].length; ++j){
                for(let k = 0; k < s[i][j].length; ++k){
                    s[i][j][k] = encodeStr(s[i][j][k], charcode).result;
                }   
            }
        }
        return new ConverterResult(s);
    }else{
        const unicodeArray = Encoding.stringToCode(s);//javascriptのデフォルト
        const sjisArray = Encoding.convert(unicodeArray, {
            to: charcode,
            from: 'UNICODE'
        });

        let result = "";
        for(let i = 0; i < sjisArray.length; i++){
            result += sjisArray[i].toString(16).padStart(2, '0');
        }
        return new ConverterResult(result);
    }
}

function decodeStr(s, charcode, isVec=false){
    if(isVec){
        message = '';
        for(let i = 0; i < s.length; ++i){
            for(let j = 0; j < s[i].length; ++j){
                for(let k = 0; k < s[i][j].length; ++k){
                    let tmp = decodeStr(s[i][j][k], charcode);
                    s[i][j][k] = tmp.result;
                    message += tmp.message;
                }   
            }
        }
        return new ConverterResult(s, message);
    }else{
        let message = '';
        if(charcode == 'ASCII'){
            if(s.length % 2 != 0){
                if(message == '') message = '入力桁数は2の倍数の必要があります';
                s = s.substr(0, Math.floor(s.length / 2) * 2);
            }
        }else if(charcode == 'UTF8'){
            if(s.length % 6 != 0){
                if(message == '') message = '入力桁数は6の倍数の必要があります';
                s = s.substr(0, Math.floor(s.length / 6) * 6);
            }
        }else{
            if(s.length % 4 != 0){
                if(message == '') message = '入力桁数は4の倍数の必要があります';
                s = s.substr(0, Math.floor(s.length / 4) * 4);
            }
        }
        let array = [];
        for(let i = 0; i < s.length; i += 2){
            array.push(parseInt(s.substr(i, 2), 16));
        }

        const unicodeArray = Encoding.convert(array, {
            to: 'UNICODE',
            from: charcode
        });
        console.log("a", message)
        return new ConverterResult(Encoding.codeToString(unicodeArray), message);
    }
}