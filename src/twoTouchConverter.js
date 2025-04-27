let twoTouch2hiragana = [['０','わ','を','ん','゛','゜','６','７','８','９'],['Ｅ','あ','い','う','え','お','Ａ','Ｂ','Ｃ','Ｄ'],['Ｊ','か','き','く','け','こ','Ｆ','Ｇ','Ｈ','Ｉ'],['Ｏ','さ','し','す','せ','そ','Ｋ','Ｌ','Ｍ','Ｎ'],['Ｔ','た','ち','つ','て','と','Ｐ','Ｑ','Ｒ','Ｓ'],['Ｙ','な','に','ぬ','ね','の','Ｕ','Ｖ','Ｗ','Ｘ'],['／','は','ひ','ふ','へ','ほ','Ｚ','？','！','－'],['機','ま','み','む','め','も','￥','＆','機','機'],['機','や','（','ゆ','）','よ','＊','＃','　','機'],['５','ら','り','る','れ','ろ','１','２','３','４']];
let hiragana2twoTouch = new Map();

for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
        hiragana2twoTouch.set(twoTouch2hiragana[i][j], i.toString() + j.toString());
    }
}

function encodeTwoTouch(s){
    let result = "";
    for(let i = 0; i < s.length; i++){
        result += hiragana2twoTouch.get(s[i]);
    }
    return result;
}

function decodeTwoTouch(s){
    console.log(s);
    try {
        let result = "";
        for(let i = 0; i < s.length-1; i += 2){
            result += twoTouch2hiragana[parseInt(s[i])][parseInt(s[i + 1])];
        }
        return result;
    } catch (error) {
        return undefined;
    }
}