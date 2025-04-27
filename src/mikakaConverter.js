hiragana2mikakaMap = new Map(Object.entries({'あ':'3', 'い':'e', 'う':'4', 'え':'5', 'お':'6', 'か':'t', 'き':'g', 'く':'h', 'け':':', 'こ':'b', 'さ':'x', 'し':'d', 'す':'r', 'せ':'p', 'そ':'c', 'た':'q', 'ち':'a', 'つ':'z', 'て':'w', 'と':'s', 'な':'u', 'に':'i', 'ぬ':'1', 'ね':',', 'の':'k', 'は':'f', 'ひ':'v', 'ふ':'2', 'へ':'^', 'ほ':'-', 'ま':'j', 'み':'n', 'む':']', 'め':'/', 'も':'m', 'や':'7', 'ゆ':'8', 'よ':'9', 'ら':'o', 'り':'l', 'る':'.', 'れ':';', 'ろ':'\\', 'わ':'0', 'ん':'y'}));
mikaka2hiraganaMap = new Map(Object.entries({'3':'あ', 'e':'い', '4':'う', '5':'え', '6':'お', 't':'か', 'g':'き', 'h':'く', ':':'け', 'b':'こ', 'x':'さ', 'd':'し', 'r':'す', 'p':'せ', 'c':'そ', 'q':'た', 'a':'ち', 'z':'つ', 'w':'て', 's':'と', 'u':'な', 'i':'に', '1':'ぬ', ',':'ね', 'k':'の', 'f':'は', 'v':'ひ', '2':'ふ', '^':'へ', '-':'ほ', 'j':'ま', 'n':'み', ']':'む', '/':'め', 'm':'も', '7':'や', '8':'ゆ', '9':'よ', 'o':'ら', 'l':'り', '.':'る', ';':'れ', '\\':'ろ', '0':'わ', 'y':'ん'}));

function encodeMikaka(s){
    let result = "";
    for(let i = 0; i < s.length; i++){
        if(hiragana2mikakaMap.has(s[i])){
            result += hiragana2mikakaMap.get(s[i]);
        }else{
            result += s[i];
        }
    }
    return result;
}

function decodeMikaka(s){
    let result = "";
    for(let i = 0; i < s.length; i++){
        if(mikaka2hiraganaMap.has(s[i])){
            result += mikaka2hiraganaMap.get(s[i]);
        }else{
            result += s[i];
        }
    }
    return result;
}