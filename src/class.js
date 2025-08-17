const CipherType = {
    none: 0,
    input: 1,
    charcode: 2,
    morse: 3,
    tenji: 4,
    twotouch: 5,
    charIndex: 6,
    ceaser: 7,
    mikaka: 8,
    strconv: 9,
    atbash: 10,
    vigenere: 11, 
    uesugi: 12,
    polybius: 13, 
    reverse: 14, 
    join: 15,
    substr: 16,
    scytale: 17,
    railfance: 18, 
    baseconv: 19,
    calc: 20
};

class ConverterResult{
    constructor(result, message = ''){
        this.result = result;
        this.message = message;
    }
}

class CipherObject{
    constructor(id, fromId, x, y){
        this.id = id;
        this.fromIds = new Set();
        this.toIds = new Set();
        this.innerPosX = x;
        this.innerPosY = y;
        this.posX = x;
        this.posY = y;
        if(fromId){
            fromId.forEach((e) => {
                this.fromIds.add(e);
            });
        }

        this.type = CipherObject.none;
        this.options = {};
        this.fromHash = 0;
        this.text = '';
        this.message = '';
    }

    updateFromJSON(json){
        this.id = json.id;
        this.fromIds.clear();
        json.fromIds.forEach((e) => {this.fromIds.add(e)});
        this.toIds.clear();
        json.toIds.forEach((e) => {this.toIds.add(e)});
        this.innerPosX = json.posX;
        this.innerPosY = json.posY;
        this.posX = json.posX;
        this.posY = json.posY;
        this.type = json.type;
        this.options = json.options;
        this.fromHash = 0;
        this.text = json.text;
        this.message = json.message;
    }

    makeBoxHtml(){
        let result = `<div id='box_${this.id}' class='box' onMousedown='boxClicked("${this.id}")' style='left: 20px; top: 250px'>
            <div id='alr_${this.id}' class='alert_icon' style='display: none'></div>
            <div class='del_btn' onclick='delBtnClicked("${this.id}")'>×</div>
            <div class='div_id'>${this.id}</div>
            <select id=sel_${this.id} onchange=typeChanged("${this.id}")>
                <option value='${CipherType.none}' ></option>
                <option value='${CipherType.input}'>入力</option>
                <option value='${CipherType.charcode}' class='type_code'>文字コード</option>
                <option value='${CipherType.morse}' class='type_code'>モールス</option>
                <option value='${CipherType.tenji}' class='type_code'>点字</option>
                <option value='${CipherType.twotouch}' class='type_code'>2タッチ</option>
                <option value='${CipherType.charIndex}' class='type_code'>文字順</option>
                <option value='${CipherType.ceaser}' class='type_strconv'>シーザー</option>
                <option value='${CipherType.mikaka}' class='type_strconv'>みかか</option>
                <option value='${CipherType.strconv}' class='type_strconv'>文字置換</option>
                <option value='${CipherType.atbash}' class='type_strconv'>アトバシュ</option>
                <option value='${CipherType.vigenere}' class='type_strconv'>ビジュネル</option>
                <option value='${CipherType.uesugi}' class='type_strconv'>上杉</option>
                <option value='${CipherType.polybius}' class='type_strconv'>ポリュビオス</option>
                <option value='${CipherType.reverse}' class='type_strswap'>逆順</option>
                <option value='${CipherType.join}' class='type_strswap'>結合</option>
                <option value='${CipherType.substr}' class='type_strswap'>部分文字列</option>
                <option value='${CipherType.scytale}' class='type_strswap'>スキュタレー</option>
                <option value='${CipherType.railfance}' class='type_strswap'>レールフェンス</option>
                <option value='${CipherType.baseconv}' class='type_math'>進数変換</option>
                <option value='${CipherType.calc}' class='type_math'>計算</option>
            </select>
            <div class='type_change_btn_L' onclick='preTypeBtnPressed("${this.id}")'><</div>
            <div class='type_change_btn_R' onclick='nxtTypeBtnPressed("${this.id}")'>></div>
            <span id='sp1_${this.id}' class='box_sp'></span>
            <div id='sp2_${this.id}' class='box_sp'></div>
            <div id='txt_${this.id}' class='text_box' readonly='readonly'></div>
            <div id='btn_${this.id}' class='plus_button' onclick='plusButtonPressed("${this.id}")'></div>
        </div>`;
        return result;
    }

    changeType(type){
        this.type = type;
        let html = '';
        let classList = document.getElementById('box_' + this.id).classList;
        document.getElementById('sel_' + this.id).value = type;
        classList.remove('code');
        classList.remove('strconv');
        classList.remove('posconv');
        classList.remove('math');

        switch(this.type){
            case CipherType.charcode:
                html = `<select id='code_${this.id}' onchange='optionChanged("code", "${this.id}")'>
                        <option selected value='SJIS'>Shift_JIS</option>
                        <option value='ASCII'>US-ASCII</option>
                        <option value='EUCJP'>EUC-JP</option>
                        <option value='UTF8'>UTF-8</option>
                        <option value='UTF16'>UTF-16</option>
                    </select>
                    <select id='mode_${this.id}' onchange='optionChanged("mode", "${this.id}")'>
                        <option selected value='decode'>16進数→文字</option>
                        <option value='decode'>2進数→文字</option>
                        <option value='encode'>文字→16進数</option>
                        <option value='encode'>文字→2進数</option>
                    </select>`;
                classList.add('code');
                this.options = {"code": "SJIS", "mode": "decode"};
                break;
            case CipherType.charIndex:
                html = `<select id='mode_${this.id}' onchange='optionChanged("mode", "${this.id}")'>
                        <option selected value='num2alpha'>0,1,2 → abc</option>
                        <option value='num2aiu'>0,1,2 → あいう</option>
                        <option value='num2iroha'>0,1,2 → いろは</option>
                        <option value='alpha2num'>abc → 0,1,2</option>
                        <option value='aiu2num'>あいう → 0,1,2</option>
                        <option value='iroha2num'>いろは → 0,1,2</option>
                    </select>`;
                this.options = {"mode": "num2alpha"};
                classList.add('code');
                break;
            case CipherType.morse:
                html = `<select id='mode_${this.id}' onchange='optionChanged("mode", "${this.id}")'>
                        <option selected value='morse2jp'>モールス→日本語</option>
                        <option value='morse2en'>モールス→英語</option>
                        <option value='jp2morse'>日本語→モールス</option>
                        <option value='en2morse'>英語→モールス</option>
                    </select>`;
                this.options = {"mode": "morse2jp"};
                classList.add('code');
                break;
            case CipherType.tenji:
                classList.add('code');
                break;
            case CipherType.twotouch:
                html = `<div class='select_element element_${this.id}' data-value='num2char' onClick='elementClicked("${this.id}")' style='display: block;'>111213→あいう</div>
                    <div class='select_element element_${this.id}' data-value='char2num' onClick='elementClicked("${this.id}")' style='display: none;'>あいう→111213</div>`;
                classList.add('code');
                this.options = {"mode": "num2char"};
                break;
            case CipherType.ceaser:
                html = `rot=<input class='num_input' type='number' id='rot_${this.id}' value='0' oninput='optionChanged("rot", "${this.id}")'>`;
                classList.add('strconv');
                this.options = {"rot": '0'};
                break;
            case CipherType.mikaka:
                html = `<div class='select_element element_${this.id}' data-value='en2jp' onClick='elementClicked("${this.id}")' style='display: block;'>ntt→みかか</div>
                    <div class='select_element element_${this.id}' data-value='jp2en' onClick='elementClicked("${this.id}")' style='display: none;'>みかか→ntt</div>`;
                classList.add('strconv');
                this.options = {"mode": "en2jp"};
                break;
            case CipherType.strconv:
                html = `<input type='text' id='from_${this.id}' oninput='optionChanged("from", "${this.id}")'>\
                    ↓\
                    <input type='text' id='to_${this.id}' oninput='optionChanged("to", "${this.id}")'>`;
                classList.add('strconv');
                this.options = {'from': '', 'to': ''};
                break;
            case CipherType.atbash:
                html = ``;
                classList.add('strconv');
                break;
            case CipherType.vigenere:
                html = `<input id='key_${this.id}' oninput='optionChanged("key", "${this.id}")'>
                    <div class='select_element element_${this.id}' data-value='decode' onClick='elementClicked("${this.id}")' style='display: block;'>デコード</div>
                    <div class='select_element element_${this.id}' data-value='encode' onClick='elementClicked("${this.id}")' style='display: none;'>エンコード</div>`;
                this.options = {'mode': 'decode', 'key': ''};
                classList.add('strconv');
                break;
            case CipherType.uesugi:
                html = ``;
                classList.add('strconv');
                break;
            case CipherType.polybius:
                html = ``;
                classList.add('strconv');
                break;
            case CipherType.reverse:
                html = ``;
                classList.add('posconv');
                break;
            case CipherType.join:
                html = ``;
                classList.add('posconv');
                break;
            case CipherType.substr:
                html = ``;
                classList.add('posconv');
                break;
            case CipherType.scytale:
                html = ``;
                classList.add('posconv');
                break;
            case CipherType.railfance:
                html = ``;
                classList.add('posconv');
                break;
            case CipherType.baseconv:
                html = `<input id='from_${this.id}' class='num_input' type='number' value='10' oninput='optionChanged("from", "${this.id}")'>進数→<input id='to_${this.id}' class='num_input' type='number' value='16' oninput='optionChanged("to", "${this.id}")'>進数`;
                classList.add('math');
                this.options = {'from': '10', 'to': '16'};
                break;
            case CipherType.calc:
                html = `<div id='val_${this.id}'></div>
                    <input id='exp_${this.id}' oninput='optionChanged("exp", "${this.id}")'>`;
                classList.add('math');
                this.options = {'exp': ''};
                break;
            default:
                html = "";
                break;
        }
        document.getElementById('sp2_' + this.id).innerHTML = html;
        updateAllText();
    }

    toJSON(){
        let json = {
            id: this.id,
            fromIds: Array.from(this.fromIds),
            toIds: Array.from(this.toIds),
            posX: this.posX,
            posY: this.posY,
            type: this.type,
            options: this.options,
            text: this.text,
        };
        return json;
    }
}


//3桁半角英数文字列をボックス固有のidとして使用
let chars = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
function makeRandomId(){
    let N = 3;
    while(true){
        let result = "";
        for(let i = 0; i < N; i++){
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        if(!idSet.has(result)) return result;
    }
}

