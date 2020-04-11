import configure from "../amplify/configure";

configure();

const boardTitleText=document.querySelectorAll('.board-title-text');
boardTextToggle();

function boardTextToggle(){
    let current=null;
for(let i=0;i<boardTitleText.length;i++){
    boardTitleText[i].addEventListener('click',()=>{
        if (current !== i) {
            if (current !== null) { 
                boardTitleText[current].parentElement.nextElementSibling.classList.add('none');
            } 
            boardTitleText[i].parentElement.nextElementSibling.classList.remove('none');
        }else{
            if(boardTitleText[i].parentElement.nextElementSibling.classList.contains('none')){
                boardTitleText[i].parentElement.nextElementSibling.classList.remove('none');
            }else{
                boardTitleText[i].parentElement.nextElementSibling.classList.add('none');
            }        
        }
        current = i;
    })
}

}