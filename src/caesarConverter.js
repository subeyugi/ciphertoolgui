//シーザー暗号

function decodeCaesar(s, rot){
    console.log(s, rot);
    let result = "";
    for(let i = 0; i < s.length; i++){
        result += String.fromCharCode((s.charCodeAt(i) - 'a'.charCodeAt(0) +  rot % 26 + 26) % 26 + 'a'.charCodeAt(0));
    }
    return result;
}