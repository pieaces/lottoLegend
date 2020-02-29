const numContainer = document.querySelector('.func3-num-container');
export default class Layout3 {

    static makeNumBoard(numsArr: number[][]) {
        for (let i = 0; i < numsArr.length; i++) {
            const containerBox = document.createElement('div');
            const checkBox = document.createElement('input')
            checkBox.setAttribute('type', 'checkbox');
            containerBox.appendChild(checkBox);

            const container = document.createElement('div');
            const numBox = document.createElement('div');
            numBox.classList.add('func3-num-box');
            for (let j = 0; j < numsArr[0].length; j++) {
                const num = document.createElement('div');
                num.textContent = String(numsArr[i][j]);
                // .setColorLotto(numsArr[i][j],num);
                numBox.appendChild(num);
            }

            const numText = document.createElement('div');
            numText.classList.add('func3-num-text');

            container.appendChild(numBox);
            container.appendChild(numText);
            containerBox.appendChild(container);
            numContainer.appendChild(containerBox);
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