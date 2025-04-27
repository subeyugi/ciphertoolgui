function updateAllText(){
    console.log("forward:", forwardArrowMap);
    console.log("backward:", backwardArrowMap);
    let seen = new Set([]);
    let que = []; //取り出す操作に現状O(N)
    idSet.forEach(function(e){
        if(document.getElementById('sel_' + e).value == 'input'){
            seen.add(e);
            que.push(e);
        }
    });

    while(que.length > 0){
        let now = que.shift();
        if(!forwardArrowMap.has(now)) continue;
        let nxts = forwardArrowMap.get(now);
        for(let i = 0; i < nxts.length; i++){
            let nxt = nxts[i];
            if(seen.has(nxt)) continue;
            seen.add(nxt);
            updateText(now, nxt);
            que.push(nxt);
        }
    }

    //トップ平文を更新
    let id = document.getElementById('top_plane_id').innerText;
    if(id){
        //console.log(id);
        document.getElementById('plane_text').value = document.getElementById('txt_' + id).innerText;
    }
}

function updateText(from_id, to_id){
    if(!idSet.has(from_id)) return;
    if(!idSet.has(to_id)) return;
    console.log("updateText:", from_id, to_id);
    //console.log("updatetext", document.getElementById('sel_' + to_id).value);
    let inText = document.getElementById('txt_' + from_id).innerText;
    outText = inText;
    switch(document.getElementById('sel_' + to_id).value){
        case 'none':
            outText = inText;
            break;
        case 'charcode':
            let code = document.getElementById('code' + to_id).value;
            let type = document.getElementById('type_' + to_id).value;
            if(type == 'encode'){
                outText = encodeStr(inText, code);
            }else if(type == 'decode'){
                outText = decodeStr(inText, code);
            }
            break;
        case 'morse':
            outText = undefined;
            let morsetype = document.getElementById('morsetype_' + to_id).value;
            if(morsetype == 'morse2jp'){
                outText = decodeMorseJP(inText);
            }else if(morsetype == 'morse2en'){
                outText = decodeMorseEN(inText);
            }else if(morsetype == 'jp2morse'){
                outText = encodeMorseJP(inText);
            }else if(morsetype == 'en2morse'){
                outText = encodeMorseEN(inText);
            }
            break;
        case 'twotouch':
            if(document.getElementById("decode_" + to_id).checked){
                outText = decodeTwoTouch(inText);
            }else if(document.getElementById('encode_' + to_id).checked){
                outText = encodeTwoTouch(inText);
            }
            break;
        case 'ceaser':
            console.log('rot_' + to_id, document.getElementById('rot_' + to_id));
            let rot = document.getElementById('rot_' + to_id).value;
            console.log(rot);
            outText = decodeCaesar(inText, rot);
            break;
        case 'mikaka':
            if(document.getElementById("decode_" + to_id).checked){
                outText = decodeMikaka(inText);
            }else if(document.getElementById('encode_' + to_id).checked){
                outText = encodeMikaka(inText);
            }
            break;
        case 'strconv':
            outText = convertString(inText, document.getElementById('cvf_' + to_id).value, document.getElementById('cvt_' + to_id).value);
            break;
        case 'reverse':
            outText = reverseStr(inText);
            break;
        case 'baseconv':
            fromBase = parseInt(document.getElementById('from_' + to_id).value);
            toBase = parseInt(document.getElementById('to_' + to_id).value);
            console.log(fromBase, toBase);
            outText = convertBase(inText, fromBase, toBase);
            break;
        case 'calc':
            outText = calculate(document.getElementById('exp_' + to_id).value, {a:parseInt(inText)});
            break;
        default:
            break;
    }
    document.getElementById('txt_' + to_id).innerText = outText;
}