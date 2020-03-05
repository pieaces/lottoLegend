const numContainerBox = document.querySelector('.func3-num-container-box');
export default class Layout3 {

    static makeNumBoard(numsArr: number[][]) {
        for (let i = 0; i < numsArr.length; i++) {
            const numContainer = document.createElement('div');
            numContainer.classList.add('func3-num-container');
            const checkboxContainer=document.createElement('div');
            checkboxContainer.classList.add('func3-check-box');

            const checkBox = document.createElement('input')
            checkBox.setAttribute('type', 'checkbox');
            checkboxContainer.appendChild(checkBox);

            numContainer.appendChild(checkboxContainer);

            const numBox = document.createElement('div');
            numBox.classList.add('func3-num-box');
            for (let j = 0; j < numsArr[0].length; j++) {
                const num = document.createElement('div');
                num.textContent = String(numsArr[i][j]);
                // setColorLotto(numsArr[i][j],num);
                numBox.appendChild(num);
            }

            numContainer.appendChild(numBox);
          
            numContainerBox.appendChild(numContainer);
        }
    }
}


// const allCheckBox=<HTMLInputElement>document.querySelector('#func3-all-check');
// const checkboxes=document.querySelectorAll('.func3-num-container > div > input');

// if(allCheckBox.checked){
//     checkboxes.forEach(<HTMLInputElement>(node)=>{
//         node.checked=true;
//     })

// }else{
//     checkboxes.forEach(<HTMLInputElement>(node)=>{
//         node.checked=false;
//     })
// }