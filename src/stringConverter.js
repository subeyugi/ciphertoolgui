function convertString(s, cv_from, cv_to){
    if(cv_from.length == 0) return s;

    let from = cv_from.split(',');
    let to = cv_to.split(',');
    if(from.length != to.length) return undefined;

    let result = '';
    console.log(from);
    console.log(to);
    for(let i = 0; i < s.length; ++i){
        let nonConv = true;
        for(let j = 0; j < from.length; ++j){
            if(i + from[j].length - 1 < s.length && s.substring(i, i + from[j].length) == from[j]){
                nonConv = false;
                result += to[j];
                i += from[j].length - 1;
                break;
            }
        }
        if(nonConv){
            result += s[i];
        }
    }
    return result;
}