import Swal from "sweetalert2";
import { networkAlert } from "../../../functions";
import { postAuthAPI } from "../../../amplify/api";
import CheckBoxToggle from "./CheckBoxToggle";

const saveBtns = document.querySelectorAll<HTMLElement>('.save-btn');
const loading = document.querySelector<HTMLElement>('.loading-box');

export enum Tool {
    'free' = 'a',
    'charge' = 'b'
}
export default class SaveBtn {
    static init(tool: Tool) {
        const numListSelectCurrent = document.querySelector('#num-list-select-current');
        const numListSelectTotal = document.getElementById('num-list-select-total');
        Array.from(saveBtns).forEach((node) => {
            node.addEventListener('click', async () => {
                if (Number(numListSelectCurrent.textContent) === 0) {
                    return Swal.fire({
                        title: '알림',
                        text: '1개 이상 선택하셔야 합니다',
                        icon: 'info'
                    });
                }
                const checkBoxList = document.querySelectorAll<HTMLInputElement>('.func3-check-box input');
                const numsArr: number[][] = [];
                const numbersContainer = document.querySelectorAll<HTMLElement>('.func3-num-container');
                const indexArr: number[] = [];
                Array.from(checkBoxList).forEach((node, index) => {
                    if (node.checked) {
                        numsArr.push(JSON.parse(numbersContainer[index].getAttribute('data-numbers')));
                        indexArr.push(index);
                    }
                });
                try {
                    loading.classList.remove('none');
                    const code = await postAuthAPI('/numbers/mass', { numsArr, tool });
                    loading.classList.add('none');
                    if (code.error) {
                        Swal.fire({
                            title: '개수 제한',
                            text: ' ',
                            icon: 'error',
                        });
                        document.getElementById('swal2-content').innerHTML = code.message;
                    } else {
                        Swal.fire({
                            title: '완료',
                            text: '정상적으로 입력되었습니다',
                            icon: 'success',
                            timer: 1500,
                        });

                        numListSelectCurrent.textContent = '0';
                        numListSelectTotal.textContent = (Number(numListSelectTotal.textContent) - indexArr.length).toString();
                        indexArr.forEach(index => numbersContainer[index].remove());
                        CheckBoxToggle.allCheckedReset();
                    }
                } catch (err) {
                    loading.classList.add('none');
                    networkAlert();
                }
            });
        });
    }
}