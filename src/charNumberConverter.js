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

function num2alpha(s){
    if(s == '') return '';
    let input = s.split(','), result = '';
    for(let i = 0; i < input.length; i++){
        result += String.fromCharCode('a'.charCodeAt(0) + parseInt(input[i]));
    }
    return result;
}

function num2aiu(s){
    if(s == '') return '';
    let input = s.split(','), result = '';
    for(let i = 0; i < input.length; i++){
        result += aiu[parseInt(input[i])];
    }
    return result;
}

function num2iroha(s){
    if(s == '') return '';
    let input = s.split(','), result = '';
    for(let i = 0; i < input.length; i++){
        result += iroha[parseInt(input[i])];
    }
    return result;
}

function alpha2num(s){
    let result = '';
    for(let i = 0; i < s.length; i++){
        if(i != 0) result += ',';
        result += s.charCodeAt(i) - 'a'.charCodeAt(0);
    }
    return result;
}

function aiu2num(s){
    let result = '';
    for(let i = 0; i < s.length; i++){
        if(i != 0) result += ',';
        if(aiu2numMp.has(s[i])){
            result += aiu2numMp.get(s[i]);
        }else{
            result += s[i];
        }
    }
    return result;
}

function iroha2num(s){
    let result = '';
    for(let i = 0; i < s.length; i++){
        if(i != 0) result += ',';
        if(iroha2numMp.has(s[i])){
            result += iroha2numMp.get(s[i]);
        }else{
            result += s[i];
        }
    }
    return result;
}