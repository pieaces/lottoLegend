import Swal from "sweetalert2";
import { networkAlert } from "../../functions";
import { postAuthAPI } from "../../amplify/api";

const saveBtns = document.querySelectorAll<HTMLElement>('.save-btn');
const loading = document.querySelector<HTMLElement>('.loading-box');

export enum Tool{
    'free'='a',
    'charge'='b'
}
export default class SaveBtn{
    static init(tool:Tool){
        saveBtns.forEach((node) => {
        node.addEventListener('click', async () => {
            const checkBoxList = document.querySelectorAll<HTMLInputElement>('.func3-check-box input');
            const numsArr:number[][] = [];
            const numbersContainer = document.querySelectorAll<HTMLElement>('.func3-num-container');
            checkBoxList.forEach((node, index) => {
                if (node.checked) {
                    numsArr.push(JSON.parse(numbersContainer[index].getAttribute('data-numbers')));
                    numbersContainer[index].remove();
                }
            });
            loading.classList.remove('none');
            try {
                await postAuthAPI('/numbers/mass', { numsArr, tool });
                loading.classList.add('none');
                Swal.fire({
                    title: '완료',
                    footer: '정상적으로 입력되었습니다',
                    timer: 1500,
                });
            } catch (err) {
                loading.classList.add('none');
                networkAlert();
            }
        });
    });        
    }
}