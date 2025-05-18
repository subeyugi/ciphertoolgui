let twoTouch2hiragana = [['０','わ','を','ん','゛','゜','６','７','８','９'],['Ｅ','あ','い','う','え','お','Ａ','Ｂ','Ｃ','Ｄ'],['Ｊ','か','き','く','け','こ','Ｆ','Ｇ','Ｈ','Ｉ'],['Ｏ','さ','し','す','せ','そ','Ｋ','Ｌ','Ｍ','Ｎ'],['Ｔ','た','ち','つ','て','と','Ｐ','Ｑ','Ｒ','Ｓ'],['Ｙ','な','に','ぬ','ね','の','Ｕ','Ｖ','Ｗ','Ｘ'],['／','は','ひ','ふ','へ','ほ','Ｚ','？','！','－'],['機','ま','み','む','め','も','￥','＆','機','機'],['機','や','（','ゆ','）','よ','＊','＃','　','機'],['５','ら','り','る','れ','ろ','１','２','３','４']];
let hiragana2twoTouch = new Map();

for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
        hiragana2twoTouch.set(twoTouch2hiragana[i][j], i.toString() + j.toString());
    }
}

function encodeTwoTouch(s){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(encodeTwoTouch(e));
        });
        return result2;
    }
    let result = "";
    for(let i = 0; i < s.length; i++){
        let tmp  = hiragana2twoTouch.get(s[i]);
        if(tmp != undefined){
            result += tmp;
        }else{
            result += getErrorStr(s[i]);
        }
    }
    return result;
}

function decodeTwoTouch(s){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(decodeTwoTouch(e));
        });
        return result2;
    }
    let result = "";
    for(let i = 0; i < s.length-1; i += 2){
        let x = parseInt(s[i]);
        let y = parseInt(s[i + 1]);
        if(0 <= x && x < 10 && 0 <= y && y < 10){
            result += twoTouch2hiragana[x][y];
        }else{
            result += getErrorStr(s[i] + s[i + 1]);
        }
    }
    if(s.length % 2 == 1){
        result += getErrorStr(s[s.length - 1]);
    }
    return result;
}