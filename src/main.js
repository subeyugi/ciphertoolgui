
let li = document.getElementsByClassName("box");
for(let i = 0; i < li.length; i++){
    li[i].addEventListener("click", function(){
        for(let j = 0; j < li.length; j++){
            li[j].classList.remove("clicked");
        }
        this.classList.add("clicked");
        if(this.classList.contains("clicked")){
            document.getElementById("result").innerText = document.getElementById(this.id + "_val").innerText;
        }else{
            document.getElementById("result").innerText = "";
        }
    })
}