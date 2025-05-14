//矢印情報
let forwardArrowMap = new Map();
let backwardArrowMap = new Map();
let idSet = new Set();
let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lines = [];

let initId = plusButtonPressed();
document.getElementById('top_cipher_id').innerText = initId;
document.getElementById('sel_' + initId).value = 'input';
document.getElementById('box_' + initId).style.left = '20px';
let initResultId = plusButtonPressed(initId);
document.getElementById('top_plane_id').innerText = initResultId;
document.getElementById('sel_' + initResultId).value = 'code';

//7桁base64文字列をボックス固有のidとして使用
function makeRandomId(){
/*     //https://qiita.com/fukasawah/items/db7f0405564bdc37820e
    let N = 7;
    while(true){
        let result = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(N)))).substring(0,N);
        if(!idSet.has(result)) return result;
    } */
    let N = 3;
    while(true){
        let result = "";
        for(let i = 0; i < N; i++){
            result += chars[Math.floor(Math.random() * 36)];
        }
        if(!idSet.has(result)) return result;
    }
}

document.getElementById('cipher_text').addEventListener('input', function(e){
    let id = document.getElementById('top_cipher_id').innerText;
    document.getElementById('txt_' + id).innerText = e.target.value;
    updateAllText();
});

//新規ボックスを作るためのHTMLを作成
function makeBoxHtml(id){
    let result = "\
    <div id='box_" + id + "' class='box' onclick='box_clicked(`" + id + "`)'>\
        <div class='del_btn' onclick='delBtnClicked(`" + id + "`)'>×</div>\
        <div class='div_id'>" + id + "</div>\
        <select id=sel_" + id + " onchange=selectChanged(`" + id + "`)>\
            <option value='none' ></option>\
            <option value='input'>入力</option>\
            <option value='charcode' class='type_code'>文字コード</option>\
            <option value='morse' class='type_code'>モールス</option>\
            <option value='tenji' class='type_code'>点字</option>\
            <option value='twotouch' class='type_code'>2タッチ</option>\
            <option value='alphacode' class='type_code'>文字順</option>\
            <option value='ceaser' class='type_strconv'>シーザー</option>\
            <option value='mikaka' class='type_strconv'>みかか</option>\
            <option value='strconv' class='type_strconv'>文字置換</option>\
            <option value='atbash' class='type_strconv'>アトバシュ</option>\
            <option value='visunel' class='type_strconv'>ビジュネル</option>\
            <option value='uesugi' class='type_strconv'>上杉</option>\
            <option value='polybius' class='type_strconv'>ポリュビオス</option>\
            <option value='reverse' class='type_strswap'>逆順</option>\
            <option value='scytale' class='type_strswap'>スキュタレー</option>\
            <option value='railfance' class='type_strswap'>レールフェンス</option>\
            <option value='baseconv' class='type_math'>進数変換</option>\
            <option value='calc' class='type_math'>計算</option>\
        </select>\
        <div class='type_change_btn_L' onclick='preTypeBtnPressed(`" + id + "`)'><</div>\
        <div class='type_change_btn_R' onclick='nxtTypeBtnPressed(`" + id + "`)'>></div>\
        <span id='sp1_" + id + "' class='box_sp'></span>\
        <div id='sp2_" + id + "' class='box_sp'></div>\
        <div id='txt_" + id + "' class='text_box' readonly='readonly'></div>\
        <div id='btn_" + id + "' class='plus_button' onclick='plusButtonPressed(`" + id + "`)'></div>\
    </div>";
    return result;
}

//プラスボタンを押したときに新規ボックスを作成
function plusButtonPressed(from_id){
    let to_id = makeRandomId();
    document.getElementById('main_area').insertAdjacentHTML('beforeend', makeBoxHtml(to_id));


    if(from_id){
        let x = document.getElementById('box_' + from_id).offsetLeft;
        let y = document.getElementById('box_' + from_id).offsetTop - 120 + document.getElementById('box_' + from_id).offsetHeight + 150;
        document.getElementById('box_' + to_id).style.left = x + "px";
        document.getElementById('box_' + to_id).style.top = y + "px";
        //console.log(y, document.getElementById('box_' + to_id).style.top);
        
        let line = new LeaderLine(
            document.getElementById('box_' + from_id),
            document.getElementById('box_' + to_id),
            {color: '#A0A0A0', size: 5, path: 'straight'}
        )
        lines.push([line, from_id, to_id]);

        document.getElementById('box_' + from_id).addEventListener('mouseup', AnimEvent.add(function(){
            line.position();
        }), false);
        document.getElementById('box_' + to_id).addEventListener('mouseup', AnimEvent.add(function(){
            line.position();
        }), false);
    }

    //ドラッグ
    document.getElementById('box_' + to_id).onpointermove = function(event){
        if(event.buttons && !event.shiftKey){
            this.style.left     = this.offsetLeft + event.movementX + 'px';
            this.style.top      = this.offsetTop + event.movementY + 'px';
            this.style.position = 'absolute';
            this.draggable      = false;
            this.setPointerCapture(event.pointerId);
        }
    }
    
    //矢印の接続情報
    if(from_id){
        idSet.add(from_id);
        idSet.add(to_id);

        if(forwardArrowMap.has(from_id)){
            console.log("get", from_id);
            let tmp = forwardArrowMap.get(from_id);
            tmp.push(to_id);
            forwardArrowMap.set(from_id, tmp);
        }else{
            forwardArrowMap.set(from_id, [to_id]);
        }
        if(backwardArrowMap.has(to_id)){
            let tmp = backwardArrowMap.get(to_id);
            tmp.push(from_id);
            backwardArrowMap.set(to_id, tmp);
        }else{
            backwardArrowMap.set(to_id, [from_id]);
        }
    }
    updateAllText();
    return to_id;
}

function box_clicked(e){
    if(!idSet.has(e)) return;
    unselect_box();
    document.getElementById('box_' + e).classList.toggle('clicked');

    if(document.getElementById('sel_' + e).value == 'input'){
        document.getElementById('cipher_text').value = document.getElementById('txt_' + e).innerText;
        document.getElementById('top_cipher_id').innerText = e;
    }else{
        document.getElementById('plane_text').value = document.getElementById('txt_' + e).innerText;
        document.getElementById('top_plane_id').innerText = e;
    }
}

function unselect_box(){
    let boxes = document.getElementsByClassName('box');
    for(let i = 0; i < boxes.length; i++){
        boxes[i].classList.remove('clicked');
    }
}

function selectChanged(id){
    let type = document.getElementById('sel_' + id).value;
    let box = document.getElementById('box_' + id);
    let sp2 = document.getElementById('sp2_' + id);
    box.classList.remove('code');
    box.classList.remove('strconv');
    box.classList.remove('posconv');
    box.classList.remove('math');

    //console.log(type);
    switch(type){
        case 'charcode':
            sp2.innerHTML = "\
                <select id='code" + id + "' onchange='updateAllText()'>\
                    <option selected value='SJIS'>Shift_JIS</option>\
                    <option value='ASCII'>US-ASCII</option>\
                    <option value='EUCJP'>EUC-JP</option>\
                    <option value='UTF8'>UTF-8</option>\
                    <option value='UTF16'>UTF-16</option>\
                    <option value='base64'>base64</option>\
                </select>\
                <select id='type_" + id + "' onchange='updateAllText()'>\
                    <option selected value='decode'>16進数→文字</option>\
                    <option value='decode'>2進数→文字</option>\
                    <option value='encode'>文字→16進数</option>\
                    <option value='encode'>文字→2進数</option>\
                </select>";
            box.classList.add('code');
            break;
        case 'alphacode':
            sp2.innerHTML = "\
                <select id='type_" + id + "' onchange='updateAllText()'>\
                    <option selected value='num2alpha'>0,1,2 → abc</option>\
                    <option value='num2aiu'>0,1,2 → あいう</option>\
                    <option value='num2iroha'>0,1,2 → いろは</option>\
                    <option value='alpha2num'>abc → 0,1,2</option>\
                    <option value='aiu2num'>あいう → 0,1,2</option>\
                    <option value='iroha2num'>いろは → 0,1,2</option>\
                </select>";
            box.classList.add('code');
            break;
        case 'morse':
            sp2.innerHTML = "\
                <select id='morsetype_" + id + "' onchange='updateAllText()'>\
                    <option selected value='morse2jp'>モールス→日本語</option>\
                    <option value='morse2en'>モールス→英語</option>\
                    <option value='jp2morse'>日本語→モールス</option>\
                    <option value='en2morse'>英語→モールス</option>\
                </select>";
            box.classList.add('code');
            break;
        case 'tenji':
            box.classList.add('code');
            break;
        case 'twotouch':
            sp2.innerHTML = "\
                <input id='decode_" + id  +  "' type='radio' name='" + id + "' value='1' onchange='updateAllText()' checked>\
                <label class='label' for='decode_" + id  +  "'>数字→ひらがな</label>\
                <input id='encode_" + id  +  "' type='radio' name='" + id + "' value='2' onchange='updateAllText()'>\
                <label class='label' for='encode_" + id  +  "'>ひらがな→数字</label>";
            box.classList.add('code');
            break;
        case 'ceaser':
            box.classList.add('strconv');
            sp2.innerHTML = "\
                rot=<input class='num_input' type='number' id='rot_" + id + "' value='0' oninput='updateAllText()'>";
            break;
        case 'mikaka':
            sp2.innerHTML = "<div class='simple_button' id='type_" + id  +  "' onclick='mikakaClicked(`type_" + id + "`)'>ntt → みかか</div>";
            box.classList.add('strconv');
            break;
        case 'strconv':
            sp2.innerHTML = "\
                <input id='cvf_" + id + "' oninput='updateAllText()'>\
                ↓\
                <input id='cvt_" + id + "' oninput='updateAllText()'>\
                ";
            box.classList.add('strconv');
            break;
        case 'atbash':
            sp2.innerHTML = "";
            box.classList.add('strconv');
            break;
        case 'visunel':
            sp2.innerHTML = "";
            box.classList.add('strconv');
            break;
        case 'uesugi':
            sp2.innerHTML = "";
            box.classList.add('strconv');
            break;
        case 'polybius':
            sp2.innerHTML = "";
            box.classList.add('strconv');
            break;
        case 'reverse':
            sp2.innerHTML = "";
            box.classList.add('posconv');
            break;
        case 'scytale':
            sp2.innerHTML = "";
            box.classList.add('posconv');
            break;
        case 'railfance':
            sp2.innerHTML = "";
            box.classList.add('posconv');
            break;
        case 'baseconv':
            sp2.innerHTML = "\
                <input id='from_" + id + "' class='num_input' type=number value='10' oninput='updateAllText()'>進数→\
                <input id='to_" + id + "' class='num_input' type=number value='16' oninput='updateAllText()'>進数";
            box.classList.add('math');
            break;
        case 'calc':
            sp2.innerHTML = "\
                <div id='val_" + id + "'></div>\
                <input id='exp_" + id + "' oninput='updateAllText()'>\
                ";
            updateCalc(id);
            box.classList.add('math');
            break;
        default:
            sp2.innerHTML = "";
            break;
    }
    updateAllText();
}

function updateCalc(id){
    let textOption = "", textHtml = "";
    let vec = backwardArrowMap.get(id);
    for(let i = 0; i < vec.length; ++i){
        textOption += '<option value = `' + vec[i] + '`>' + vec[i] + '</option>';
    }
    for(let i = 0; i < vec.length; ++i){
        textHtml += 'a = <select vs' + chars[i + 10] + '_' + id + '>' + textOption + '</select>';
    }
    document.getElementById('val_' + id).innerHTML = textHtml;
}

function delBtnClicked(id){ //ボックスの削除
    console.log("delBtnClicked ", id);
    console.log("back:", backwardArrowMap);
    if(backwardArrowMap.has(id)){
        let v = backwardArrowMap.get(id);
        console.log("v", v);

        idSet.delete(id);
        backwardArrowMap.delete(id);

        //接続の更新
        document.getElementById('top_plane_id').innerText = "";
        if(v){
            for(let i = 0; i < v.length; i++){
                console.log("v[i]", v[i]);
                let v2 = forwardArrowMap.get(v[i]);
                let v3 = [];
                for(let j = 0; j < v2.length; j++) if(v2[j] != id){
                    v3.push(v2[j]);
                }
                console.log("v3 = ", v3);
                forwardArrowMap.set(v[i], v3);
            }
        }
    }
    document.getElementById("box_" + id).remove();

    //矢印の削除
    //console.log(lines);
    for(let i = 0; i < lines.length; i++){
        if(lines[i][1] == id || lines[i][2] == id){
            lines[i][0].remove();
            lines[i] = [undefined, undefined, undefined];
        }
    }
    console.log(lines)
}

function cipherCopyBtnClicked(){
    let s = document.getElementById('cipher_text').value;
    navigator.clipboard.writeText(s);
}

function planeCopyBtnClicked(){
    let s = document.getElementById('plane_text').value;
    console.log("ok", s);
    navigator.clipboard.writeText(s);
}

function preTypeBtnPressed(id){
    //console.log("nxtTypeBtnClicked", id);
    const select = document.getElementById('sel_' + id);
    let n = select.length;
    let index = (select.selectedIndex - 1 + n) % n;
    select.selectedIndex = index;
    //console.log(index);
    selectChanged(id);
}

function nxtTypeBtnPressed(id){
    const select = document.getElementById('sel_' + id);
    let n = select.length;
    let index = (select.selectedIndex + 1) % n;
    select.selectedIndex = index;
    selectChanged(id);
}

function mikakaClicked(id){
    if(document.getElementById(id).innerText == 'ntt → みかか'){
        document.getElementById(id).innerText = 'みかか → ntt';
    }else{
        document.getElementById(id).innerText = 'ntt → みかか';
    }
}