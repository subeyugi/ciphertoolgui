aiu = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
iroha = 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす';

aiu2numMp = new Map();
iroha2numMp = new Map();

for(let i = 0; i < aiu.length; i++){
    aiu2numMp.set(aiu[i], i);
}
for(let i = 0; i < iroha.length; i++){
    iroha2numMp.set(iroha[i], i);
}


function num2alpha(vec, isVec=false){
    let result = '';
    let message = '';
    if(isVec){
        for(let i = 0; i < vec.length; ++i){
            for(let j = 0; j < vec[i].length; ++j){
                let tmp = num2alpha(vec[i][j]);
                vec[i][j] = tmp.result;
                if(message == '') message = tmp.message;
            }
        }
        return new ConverterResult(vec, message);
    }else{
        if(vec == '') return '';
        for(let i = 0; i < vec.length; i++){
            if(0 <= vec[i] && vec[i] < 26){
                result += String.fromCharCode('a'.charCodeAt(0) + parseInt(vec[i]));
            }else{
                result += getErrorStr(vec[i].toString());
                if(message == '') message = `"${vec[i]}"は変換できません`;
            }
        }
        return new ConverterResult(result, message);
    }
}

function num2aiu(vec, isVec=false){
    if(vec == '') return '';
    let result = '';
    let message = '';
    if(isVec){
        for(let i = 0; i < vec.length; ++i){
            for(let j = 0; j < vec[i].length; ++j){
                let tmp = num2aiu(vec[i][j]);
                vec[i][j] = tmp.result;
                if(message == '') message = tmp.message;
            }
        }
        return new ConverterResult(vec, message);
    }else{
        for(let i = 0; i < vec.length; i++){
            if(0 <= vec[i] && vec[i] < aiu.length){
                result += aiu[parseInt(vec[i])];
            }else{
                result += getErrorStr(vec[i].toString());
                if(message == '') message = `"${vec[i]}"は変換できません`;
            }
        }
        return new ConverterResult(result, message);
    }
}

function num2iroha(vec, isVec=false){
    if(vec == '') return '';
    let result = '';
    let message = '';
    if(isVec){
        for(let i = 0; i < vec.length; ++i){
            for(let j = 0; j < vec[i].length; ++j){
                let tmp = num2iroha(vec[i][j]);
                vec[i][j] = tmp.result;
                if(message == '') message = tmp.message;
            }
        }
        return new ConverterResult(vec, message);
    }else{
        for(let i = 0; i < vec.length; i++){
            if(0 <= vec[i] && vec[i] < iroha.length){
                result += iroha[parseInt(vec[i])];
            }else{
                result += getErrorStr(vec[i].toString());
                if(message == '') message = `"${vec[i]}"は変換できません`;
            }
        }
        return new ConverterResult(result, message);
    }
}

function alpha2num(vec, isVec = false){
    let result = [];
    let message = '';
    if(isVec){
        for(let i = 0; i < vec.length; ++i){
            for(let j = 0; j < vec[i].length; ++j){
                let tmp = num2iroha(vec[i][j][0]);
                vec[i][j] = tmp.result;
                if(message == '') message = tmp.result;
            }
        }
        return new ConverterResult(result, message);
    }else{
        for(let i = 0; i < vec.length; i++){
            if('a'.charCodeAt(0) <= vec.charCodeAt(i) && vec.charCodeAt(i) <= 'z'.charCodeAt(0)){
                result.push((vec.charCodeAt(i) - 'a'.charCodeAt(0)).toString());
            }else{
                result.push(getErrorStr(vec[i]));
                if(message == '') message = `"${vec[i]}"は変換できません`;
            }
        }
        return new ConverterResult(result, message);
    }
}

function aiu2num(vec){
    if(Array.isArray(vec)){
        let result2 = [];
        vec.forEach(e => {
            result2.push(aiu2num(e));
        });
        return result2;
    }
    let result = '';
    for(let i = 0; i < vec.length; i++){
        if(i != 0) result += ',';
        if(aiu2numMp.has(vec[i])){
            result += aiu2numMp.get(vec[i]);
        }else{
            result += getErrorStr(vec[i]);
        }
    }
    return result;
}

function iroha2num(vec){
    if(Array.isArray(vec)){
        let result2 = [];
        vec.forEach(e => {
            result2.push(iroha2num(e));
        });
        return result2;
    }
    let result = '';
    for(let i = 0; i < vec.length; i++){
        if(i != 0) result += ',';
        if(iroha2numMp.has(vec[i])){
            result += iroha2numMp.get(vec[i]);
        }else{
            result += getErrorStr(vec[i]);
        }
    }
    return result;
}