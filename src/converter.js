function updateAllText(){
    //あらかじめトポロジカルソートしておく

    let seen = new Set([]);
    let cntFromIds = new Map();
    let que = [];
    let queIdx = 0;
    let sortedIds = [];
    idSet.forEach(function(id){
        cntFromIds.set(id, cipherObjects.get(id).fromIds.size);
    });

    idSet.forEach(function(id){
        if(cntFromIds.get(id) == 0){
            if(cipherObjects.get(id).type == CipherType.input){
                seen.add(id);
                que.push(id);
            }else{
                seen.add(id);
                cipherObjects.get(id).text = '';
            }
        }
    });

    while(que.length - queIdx > 0){
        let nowId = que[queIdx++];
        if(cipherObjects.get(nowId).type != CipherType.input){
            sortedIds.push(nowId);
        }
        let nxts = cipherObjects.get(nowId).toIds;
        nxts.forEach(nxtId => {
            if(!seen.has(nxtId)){
                seen.add(nxtId);
                que.push(nxtId);
            }
        });
    }
    //console.log("updateAllText: ", sortedIds);
    sortedIds.forEach(function(id){
        updateText(id);
    });
    if(outputId){
        document.getElementById('output_text').innerText = cipherObjects.get(outputId).text;
    }
}


function updateText(to_id){
    if(!idSet.has(to_id)) return;
    let toObj = cipherObjects.get(to_id);
    let options = toObj.options;
    let fromText = '';
    if(toObj.fromIds.size == 1){
        fromTextSplit = cipherObjects.get(toObj.fromIds.values().next().value).text.split(',');
        fromText = cipherObjects.get(toObj.fromIds.values().next().value).text;
    }
    console.log("updateText:", to_id, fromText);

    switch(toObj.type){
        case CipherType.charcode:
            switch(options.mode){
                case 'decode':
                    toObj.text = decodeStr(fromTextSplit, options.code).join(',');
                    break;
                case 'encode':
                    toObj.text = encodeStr(fromTextSplit, options.code).join(',');
                    break;
            }
            break;
        case CipherType.morse:
            switch(options.mode){
                case 'morse2jp':
                    toObj.text = decodeMorseJP(fromTextSplit).join(',');
                    break;
                case 'morse2en':
                    toObj.text = decodeMorseEN(fromTextSplit).join(',');
                    break;
                case 'jp2morse':
                    toObj.text = encodeMorseJP(fromTextSplit).join(',');
                    break;
                case 'en2morse':
                    toObj.text = encodeMorseEN(fromTextSplit).join(',');
                    break;
            }
            break;
        case CipherType.twotouch:
            switch(options.mode){
                case 'num2char':
                    toObj.text = decodeTwoTouch(fromTextSplit);
                    break;
                case 'char2num':
                    toObj.text = encodeTwoTouch(fromTextSplit);
                    break;
            }
            break;
        case CipherType.charIndex:
            switch(options.mode){
                case 'num2alpha':
                    toObj.text = num2alpha(fromText);
                    break;
                case 'num2aiu':
                    toObj.text = num2aiu(fromText);
                    break;
                case 'num2iroha':
                    toObj.text = num2iroha(fromText);
                    break;
                case 'alpha2num':
                    toObj.text = alpha2num(fromText);
                    break;
                case 'aiu2num':
                    toObj.text = aiu2num(fromText);
                    break;
                case 'iroha2num':
                    toObj.text = iroha2num(fromText);
                    break;
            }
            break;
        case CipherType.ceaser:
            toObj.text = decodeCaesar(fromTextSplit, parseInt(options.rot)).join(',');
            break;
        case CipherType.mikaka:
            switch(options.mode){
                case 'en2jp':
                    toObj.text = decodeMikaka(fromTextSplit);
                    break;
                case 'jp2en':
                    toObj.text = encodeMikaka(fromTextSplit);
                    break;
            }
            break;
        case CipherType.strconv:
            if(options.from == ''){
                toObj.text = fromTextSplit.join(',');
            }else{
                toObj.text = convertString(fromTextSplit, options.from.split(','), options.to.split(',')).join(',');
            }
            break;
        case CipherType.atbash:
            toObj.text = convertAtbash(fromTextSplit).join(',');
            break;
        case CipherType.vigenere:
            switch(options.mode){
                case 'decode':
                    toObj.text = decodeVigenere(fromTextSplit, options.key).join(',');
                    break;
                case 'encode':
                    toObj.text = encodeVigenere(fromTextSplit, options.key).join(',');
                    break;
            }
            break;
        case CipherType.reverse:
            toObj.text = reverseStr(fromTextSplit).join(',');
            break;
        case CipherType.baseconv:
            toObj.text = convertBase(fromTextSplit, parseInt(options.from), parseInt(options.to)).join(',');
            break;
        case CipherType.calc:
            let obj = [];
            for(let i = 0; i < fromTextSplit.length; i++){
                obj.push({a: fromTextSplit[i]});
            }
            toObj.text = calculate(options.exp , obj);
            break;
        default:
            toObj.text = fromTextSplit;
            break;
    }
    document.getElementById('txt_' + to_id).innerText = toObj.text;
}