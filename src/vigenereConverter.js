function encodeVigenere(s, key){
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(encodeVigenere(e, key));
        });
        return result2;
    }
    let listS = alpha2num(s, true);
    let listK = alpha2num(key, true);
    console.log(listS, listK)
    let vec = [];
    for(let i = 0; i < s.length; i++){
        console.log(i, listS[i], listK[i % key.length], (listS[i] + listK[i % key.length]) % 26)
        vec.push((listS[i] + listK[i % key.length]) % 26);
    }
    console.log("encode", vec);
    return num2alpha(vec, true);
}

function decodeVigenere(s, key){
    console.log(s, key)
    if(Array.isArray(s)){
        let result2 = [];
        s.forEach(e => {
            result2.push(decodeVigenere(e, key));
        });
        return result2;
    }
    let listS = alpha2num(s, true);
    let listK = alpha2num(key, true);
    let vec = [];
    for(let i = 0; i < s.length; i++){
        vec.push((listS[i] - listK[i % key.length] + 26) % 26);
    }
    console.log("decode", vec);
    return num2alpha(vec, true);
}