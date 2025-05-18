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
console.log("num2alpha", num2alpha([0, 1, 2, 3, 4], true));

function num2alpha(s, isList = false){
    if(!isList && Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(num2alpha(e));
        });
        return result2;
    }

    let input = [], result = '';
    if(isList){
        input = s;
    }else{
        input = s.split(',');
    }
    if(s == '') return '';
    for(let i = 0; i < input.length; i++){
        if(0 <= input[i] && input[i] < 26){
            result += String.fromCharCode('a'.charCodeAt(0) + parseInt(input[i]));
        }else{
            result += getErrorStr(input[i].toString());
        }
    }
    return result;
}

function num2aiu(s){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(num2aiu(e));
        });
        return result2;
    }
    if(s == '') return '';
    let input = s.split(','), result = '';
    for(let i = 0; i < input.length; i++){
        if(0 <= input[i] && input[i] < aiu.length){
            result += aiu[parseInt(input[i])];
        }else{
            result += getErrorStr(input[i].toString());
        }
    }
    return result;
}

function num2iroha(s){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(num2iroha(e));
        });
        return result2;
    }
    if(s == '') return '';
    let input = s.split(','), result = '';
    for(let i = 0; i < input.length; i++){
        if(0 <= input[i] && input < iroha.length){
            result += iroha[parseInt(input[i])];
        }else{
            result += getErrorStr(input[i].toString());
        }
    }
    return result;
}

function alpha2num(s, isList = false){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(alpha2num(e));
        });
        return result2;
    }
    if(isList){
        console.log("ok", s);
        let result = [];
        for(let i = 0; i < s.length; i++){
            if('a'.charCodeAt(0) <= s.charCodeAt(i) && s.charCodeAt(i) <= 'z'.charCodeAt(0)){
                result.push(s.charCodeAt(i) - 'a'.charCodeAt(0));
            }else{
                result.push(getErrorStr(s[i]));
            }
        }
        return result;
    }else{
        let result = '';
        for(let i = 0; i < s.length; i++){
            if(i != 0) result += ',';
            if('a'.charCodeAt(0) <= s.charCodeAt(i) && s.charCodeAt(i) <= 'z'.charCodeAt(0)){
                result += (s.charCodeAt(i) - 'a'.charCodeAt(0)).toString();
            }else{
                result += getErrorStr(s[i]);
            }
        }
        return result;
    }
}

function aiu2num(s){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(aiu2num(e));
        });
        return result2;
    }
    let result = '';
    for(let i = 0; i < s.length; i++){
        if(i != 0) result += ',';
        if(aiu2numMp.has(s[i])){
            result += aiu2numMp.get(s[i]);
        }else{
            result += getErrorStr(s[i]);
        }
    }
    return result;
}

function iroha2num(s){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(iroha2num(e));
        });
        return result2;
    }
    let result = '';
    for(let i = 0; i < s.length; i++){
        if(i != 0) result += ',';
        if(iroha2numMp.has(s[i])){
            result += iroha2numMp.get(s[i]);
        }else{
            result += getErrorStr(s[i]);
        }
    }
    return result;
}