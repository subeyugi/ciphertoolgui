let idSet = new Set();
let cipherObjects = new Map();
let inputId = '', inputText = '';
let outputId = '', outputText = '';
let lines = [];
let types = [];

//init
inputId = plusButtonPressed(null);
cipherObjects.get(inputId).changeType(CipherType.input);
outputId = plusButtonPressed(inputId);
document.getElementById('top_input_id').innerText = inputId;
document.getElementById('top_output_id').innerText = outputId;

document.getElementById('input_text').addEventListener('input', function(){
    inputText = document.getElementById('input_text').value;
    document.getElementById('txt_' + inputId).innerText = inputText;
    cipherObjects.get(inputId).text = inputText;
    updateAllText();
});
Object.entries(CipherType).map(([ key, value ], i) => {
  if (i < Object.entries(CipherType).length / 2) {
    types.push(key);
  }
});

//プラスボタンを押したときに新規ボックスを作成
function plusButtonPressed(from_id){
    let to_id = makeRandomId();
    let obj = new CipherObject(to_id, from_id, 0, 0);
    cipherObjects.set(to_id, obj);
    document.getElementById('main_area').insertAdjacentHTML('beforeend', obj.makeBoxHtml());

    if(from_id){//nullでなければ
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
            cipherObjects.get(to_id).posX = this.style.left;
            cipherObjects.get(to_id).posY = this.style.top;
        }
    }
    
    //矢印の接続情報
    if(from_id){
        idSet.add(from_id);
        idSet.add(to_id);
        cipherObjects.get(from_id).toIds.add(to_id);
        cipherObjects.get(to_id).fromIds.add(from_id);
    }
    updateAllText();
    return to_id;
}

function boxClicked(id){
    console.log(id);
    if(!idSet.has(id)) return;
    unselectAllBox();
    document.getElementById('box_' + id).classList.toggle('clicked');
    outputId = id;

    /* if(cipherObjects.get(id).type == CipherType.input){
        document.getElementById('input_text').value = document.getElementById('txt_' + id).innerText;
        document.getElementById('top_input_id').innerText = id;
    }else{
        document.getElementById('output_text').value = document.getElementById('txt_' + id).innerText;
        document.getElementById('top_output_id').innerText = id;
    } */
}

function unselectAllBox(){
    let boxes = document.getElementsByClassName('box');
    for(let i = 0; i < boxes.length; i++){
        boxes[i].classList.remove('clicked');
    }
}

function typeChanged(id){
    let type = parseInt(document.getElementById('sel_' + id).value);
    console.log("typeChanged", id, type);
    cipherObjects.get(id).changeType(type);
    updateAllText();
}

function preTypeBtnPressed(id){
    const select = document.getElementById('sel_' + id);
    let n = select.length;
    cipherObjects.get(id).changeType((select.selectedIndex - 1 + n) % n);
}

function nxtTypeBtnPressed(id){
    const select = document.getElementById('sel_' + id);
    let n = select.length;
    cipherObjects.get(id).changeType((select.selectedIndex + 1) % n);
}

function elementClicked(id){
    let elememts = Array.from(document.getElementsByClassName('element_' + id));
    elememts.forEach(e => {
        if(e.style.display == 'block'){
            e.style.display = 'none';
        }else{
            e.style.display = 'block';
            cipherObjects.get(id).options["mode"] = e.dataset.value;
        }
    });
    updateAllText();
}

function saveBtnClicked(){
    let result = [];
    cipherObjects.forEach((val, key) => {
        result.push(val.toJSON());
    });
    console.log(result);
    /* const blob = new Blob([JSON.stringify(result, null, 2)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample.txt";
    a.click();
    URL.revokeObjectURL(url); */
}

function optionChanged(option, id){
    console.log(option, id);
    cipherObjects.get(id).options[option] = document.getElementById(`${option}_${id}`).value;
    updateAllText();
}

function inputCopyBtnClicked(){
    let s = document.getElementById('input_text').value;
    navigator.clipboard.writeText(s);
}

function outputCopyBtnClicked(){
    let s = document.getElementById('output_text').value;
    navigator.clipboard.writeText(s);
}

function delBtnClicked(id){ //ボックスの削除
    console.log("delBtnClicked ", id);
    console.log("back:", cipherObjects.get(id).fromIds);
    if(cipherObjects.has(id)){
        let v = cipherObjects.get(id).from;
        console.log("v", v);

        idSet.delete(id);
        cipherObjects.delete(id);

        //接続の更新
        document.getElementById('top_input_id').innerText = "";
        if(v){
            for(let i = 0; i < v.length; i++){
                console.log("v[i]", v[i]);
                let v2 = cipherObjects.get(id).toIds.get(v[i]);
                let v3 = [];
                for(let j = 0; j < v2.length; j++) if(v2[j] != id){
                    v3.push(v2[j]);
                }
                console.log("v3 = ", v3);
                cipherObjects.get(id).toIds.set(v[i], v3);
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
}
