//init
inputId = plusButtonClicked(null);
cipherObjects.get(inputId).changeType(CipherType.input);
outputId = plusButtonClicked(inputId);
document.getElementById('top_input_id').innerText = inputId;
document.getElementById('top_output_id').innerText = outputId;
let boxIntervalW = 250;
let boxDragable = false;

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

document.addEventListener('keyup', function(event) {
    if (event.shiftKey) {
        dragIds = [];
    }
});


const fileInput = document.getElementById("file_input");
fileInput.addEventListener("change", () => {
    const [file] = fileInput.files;
    if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            placeBoxFromJSON(JSON.parse(reader.result));
        });
        reader.readAsText(file);
    }
});

//プラスボタンを押したときに新規ボックスを作成
function plusButtonClicked(fromId, toId){
    if(toId == null){
        toId = makeRandomId();
    }
    let obj = new CipherObject(toId, fromId != null ? [fromId] : [], '0px', '0px');
    cipherObjects.set(toId, obj);
    document.getElementById('main_area').insertAdjacentHTML('beforeend', obj.makeBoxHtml());

    if(fromId){//nullでなければ
        let x = document.getElementById('box_' + fromId).offsetLeft;
        let y = document.getElementById('box_' + fromId).offsetTop - 120 + document.getElementById('box_' + fromId).offsetHeight + 150;
        document.getElementById('box_' + toId).style.left = x + "px";
        document.getElementById('box_' + toId).style.top = y + "px";
        //console.log(y, document.getElementById('box_' + to_id).style.top);
        
        let line = new LeaderLine(
            document.getElementById('box_' + fromId),
            document.getElementById('box_' + toId),
            {color: '#A0A0A0', size: 5, path: 'straight'}
        )
        lines.push([line, fromId, toId]);
 
        document.getElementById('box_' + fromId).addEventListener('mouseup', AnimEvent.add(function(){
            line.position();
        }), false);
        document.getElementById('box_' + toId).addEventListener('mouseup', AnimEvent.add(function(){
            line.position();
        }), false);
    }

/*     document.getElementById('box_' + toId).onmousedown = function(event){
        let y = event.clientY - parseInt(this.style.top);
        let boxH = this.getBoundingClientRect().height;
        let textH = document.getElementById('txt_' + toId).getBoundingClientRect().height;
        let padding = 10;
        if(boxH - textH - padding <= y){
            boxDragable = true;
        }
    } */

/*    document.getElementById('box_' + toId).onmouseup = function(event){
        boxDragable = false;
    } */

    document.getElementById('box_' + toId).onpointermove = function(event){
        let boxOffsetY = event.clientY - this.style.top.substring(0, this.style.top.length - 2);
        let boxHeight = this.clientHeight;
        if(event.buttons && !event.shiftKey){
            this.style.left     = this.offsetLeft + event.movementX + 'px';
            this.style.top      = this.offsetTop + event.movementY + 'px';
            this.style.position = 'absolute';
            this.draggable      = false;
            this.setPointerCapture(event.pointerId);
            cipherObjects.get(toId).posX = this.style.left;
            cipherObjects.get(toId).posY = this.style.top;
        }else if(event.buttons && event.shiftKey){
            let from_id = dragIds[0]
            if(dragIds.length == 1 && from_id != toId){
                //console.log(`arrow: ${from_id} -> ${to_id}`);
                let line = new LeaderLine(
                    document.getElementById('box_' + from_id),
                    document.getElementById('box_' + toId),
                    {color: '#A0A0A0', size: 5, path: 'straight'}
                )
                lines.push([line, from_id, toId]);
                dragIds = [];
                cipherObjects.get(from_id).toIds.add(toId);
                cipherObjects.get(toId).fromIds.add(from_id);
            }else if(dragIds.length == 0){
                dragIds.push(toId);
            }
        }
    }
    
    //矢印の接続情報
    if(fromId){
        idSet.add(fromId);
        idSet.add(toId);
        cipherObjects.get(fromId).toIds.add(toId);
        cipherObjects.get(toId).fromIds.add(fromId);
    }
    updateAllText();
    return toId;
}

function boxClicked(id){
    //boxをドラッグしてよいか判定
    

    if(!idSet.has(id)) return;
    unselectAllBox();
    document.getElementById('box_' + id).classList.toggle('clicked');
    outputId = id;

    if(cipherObjects.get(id).type == CipherType.input){
        document.getElementById('input_text').value = document.getElementById('txt_' + id).innerText;
        document.getElementById('top_input_id').innerText = id;
        inputId = id;
    }else{
        document.getElementById('output_text').value = cipherObjects.get(id).text;
        document.getElementById('top_output_id').innerText = id;
        document.getElementById('top_output_message').innerText = cipherObjects.get(id).message;
        outputId = id;
    }
}

function unselectAllBox(){
    let boxes = document.getElementsByClassName('box');
    for(let i = 0; i < boxes.length; i++){
        boxes[i].classList.remove('clicked');
    }
}

function typeChanged(id){
    let type = parseInt(document.getElementById('sel_' + id).value);
    cipherObjects.get(id).changeType(type);
    cipherObjects.get(id).isOptionShow = false;
    document.getElementById('sp_option_' + id).innerHTML = ``;
    
    updateAllText();
}

function preTypeBtnClicked(id){
    const select = document.getElementById('sel_' + id);
    let n = select.length;
    cipherObjects.get(id).changeType((select.selectedIndex - 1 + n) % n);
    updateAllText();
}

function nxtTypeBtnClicked(id){
    const select = document.getElementById('sel_' + id);
    let n = select.length;
    cipherObjects.get(id).changeType((select.selectedIndex + 1) % n);
    updateAllText();
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

/*     let today = new Date();
    year = today.getFullYear().toString().padStart(4, "0");
    month = (today.getMonth() + 1).toString().padStart(2, "0");
    day = today.getDate().toString().padStart(2, "0");
    console.log(year, month, day);
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cipher_${year}${month}${day}.cip`;
    a.click();
    URL.revokeObjectURL(url); */
}

function optionChanged(option, id){
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
    if(cipherObjects.has(id)){
        let v = cipherObjects.get(id).fromIds;

        //接続の更新
        document.getElementById('top_input_id').innerText = "";
        if(v){
            for(let fromId of v){
                cipherObjects.get(fromId).toIds.delete(id);
            }
        }
        
        idSet.delete(id);
        cipherObjects.delete(id);
        if(outputId == id){
            outputId = "";
        }
    }
    document.getElementById('box_' + id).remove();

    //矢印の削除
    for(let i = 0; i < lines.length; i++){
        if(lines[i][1] == id || lines[i][2] == id){
            lines[i][0].remove();
            lines[i] = [undefined, undefined, undefined];
        }
    }
    updateAllText();
}

function placeBoxFromJSON(json){
    //削除
    for(let i = 0; i < lines.length; i++){
        lines[i][0].remove();
    }
    cipherObjects.clear();
    document.getElementById('main_area').innerHTML = "";
    lines = [];

    //jsonに合うようにboxを配置
    json.forEach((e) => {
        let obj = new CipherObject(e.id);
        obj.updateFromJSON(e);
        cipherObjects.set(e.id, obj);
        /* 
        cipherObjects.forEach((e) => {
            plusButtonClicked(e.fromIds[0], e.id);
        }); */
    });

}

//区切り文字の表示/非表示
function optionButtonClicked(id){
    if(!cipherObjects.get(id).isOptionShow){
        document.getElementById('sp_option_' + id).innerHTML = `区切り文字<textarea class='sepInput'>${cipherObjects.get(id).separator1}</textarea><textarea class='sepInput'>${cipherObjects.get(id).separator2}</textarea><textarea class='sepInput'>${cipherObjects.get(id).separator3}</textarea>
        結果全表示<input type='checkbox'></>`;
        cipherObjects.get(id).isOptionShow = true;
    }else{
        document.getElementById('sp_option_' + id).innerHTML = ``;
        cipherObjects.get(id).isOptionShow = false;
    }
}

function showOption(id){

}
