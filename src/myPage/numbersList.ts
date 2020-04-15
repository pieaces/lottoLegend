import configure from '../amplify/configure'
import { getAuthAPI, deleteAuthAPI } from '../amplify/api';
import CheckBoxToggle from '../system/premium/instanceBtns/CheckBoxToggle';
import Selectr, { IOptions } from 'mobius1-selectr';
import { makeTable, modifyTableBoundary } from './functions';
import { networkAlert } from '../functions';
import Swal from 'sweetalert2';

configure();
const loading = document.querySelector('.loading-box');

const roundSelectBox = document.querySelector<HTMLSelectElement>('#round-select-box');
const toolSelectBox = document.querySelector<HTMLSelectElement>('#tool-select-box');
const methodSelectBox = document.querySelector<HTMLSelectElement>('#method-select-box');
const numInfoToggleBtn = document.querySelector('.mypage-toggle-btn');
const pastFilterBox = document.getElementsByClassName('func3-past-filter-box') as HTMLCollectionOf<HTMLElement>;
const tableNumBox = document.querySelector<HTMLElement>('.mypage-table-num-box');

loading.classList.remove('none');
getAuthAPI('/numbers/mass')
    .then(({ data, rounds, answer }) => {
        if (data) {
            const roundConfig: IOptions = {
                placeholder:'회차',
                data: rounds.reverse().map((round: number) => {
                    return {
                        text: round.toString(),
                        value: round.toString()
                    }
                }),
                nativeDropdown:false
            };
            let currentRound: number = rounds[0];
            makeTable(tableNumBox, data, rounds[0], true, answer);

            const toolConfig: IOptions = {
                data: [
                    { text: '전체', value: 'all' },
                    { text: '무료', value: 'a' },
                    { text: '유료', value: 'b' }
                ],
                searchable: false
            };
            const methodConfig: IOptions = {
                data: [
                    { text: '전체', value: 'all' },
                    { text: '자동', value: 'a' },
                    { text: '수동', value: 'm' }
                ],
                searchable: false
            };

            const roundSelect = new Selectr(roundSelectBox, roundConfig);
            const toolSelect = new Selectr(toolSelectBox, toolConfig);
            const methodSelect = new Selectr(methodSelectBox, methodConfig);
            document.querySelector<HTMLElement>('.selectbox-wrapper').classList.remove('none');
       
            let tool: string = null;
            let method: string = null;
            Array.from(document.querySelectorAll('.mypage-num-delete-btn')).forEach(node=>{
                node.classList.remove('none');
                node.addEventListener('click', async () => {
                    await Swal.fire({
                        title: '삭제하시겠습니까?',
                        text: "한번 삭제하면 되돌릴 수 없습니다",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '삭제',
                        cancelButtonText: '취소',
                    }).then(async (result) => {
                        if (result.value) {
                            const inputs = document.querySelectorAll<HTMLInputElement>('.mypage-table-num-box input');
                            const numbersContainer = document.querySelectorAll<HTMLElement>('.mypage-table-content');
                            const filterBoxes = document.querySelectorAll<HTMLElement>('.func3-past-filter-box');
    
                            const numsArr: number[][] = [];
                            const indexes: number[] = [];
                            Array.from(inputs).forEach((node, index) => {
                                if (node.checked) {
                                    numsArr.push(JSON.parse(numbersContainer[index].getAttribute('data-numbers')));
                                    indexes.push(index);
                                }
                            });
                            try {
                                loading.classList.remove('none');
    
                                await deleteAuthAPI('/numbers/mass/' + currentRound, { numsArr });
                                indexes.forEach(index => {
                                    numbersContainer[index].remove();
                                    filterBoxes[index].remove();
                                });                                
                                modifyTableBoundary();
                                CheckBoxToggle.subtract(indexes.length);
                                CheckBoxToggle.allCheckedReset();
                                if(checkBoxToggle.getTotal() === 1){
                                    numbersContainer[0].style.borderBottom="1px solid rgba(0,0,0,0.1)";
                                }
                                Swal.fire({
                                    title: '완료',
                                    icon: 'success',
                                    timer: 1000,
                                });
                            } catch (err) {
                                networkAlert();
                            } finally {
                                loading.classList.add('none');
                            }
                        }
                    });
                });
            })
           
            roundSelect.on('selectr.change', async (option) => {
                loading.classList.remove('none');
                let result: any;
                if (option.value === 'all') {
                    result = await getAuthAPI('/numbers/mass/', { tool, method });
                    currentRound = null;
                } else {
                    result = (await getAuthAPI('/numbers/mass/' + option.value, { tool, method }));
                    currentRound = Number(option.value);
                }
                tableNumBox.innerHTML = '';
                makeTable(tableNumBox, result.data, result.rounds[0], true, result.answer);
                checkBoxToggle.setInputBoxes(document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > .checkbox'));
                CheckBoxToggle.allCheckedReset();
                checkBoxToggle.checkBoxEvent();
                loading.classList.add('none');
            });
            toolSelect.on('selectr.change', async (option) => {
                loading.classList.remove('none');
                let result: any;
                if (option.value === 'all') {
                    result = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { method }));
                    tool = null;
                } else if (option.value === 'a') {
                    result = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool: option.value }));
                    tool = option.value;
                } else if (option.value === 'b') {
                    result = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool: option.value, method }));
                    tool = option.value;
                }
                tableNumBox.innerHTML = '';
                makeTable(tableNumBox, result.data, result.rounds[0], true, result.answer);
                checkBoxToggle.setInputBoxes(document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > .checkbox'));
                CheckBoxToggle.allCheckedReset();
                checkBoxToggle.checkBoxEvent();
                loading.classList.add('none');
            });
            methodSelect.on('selectr.change', async (option) => {
                loading.classList.remove('none');
                let result: any;
                if (option.value === 'all') {
                    result = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool }));
                    method = null;
                } else {
                    result = (await getAuthAPI('/numbers/mass/' + (currentRound ? currentRound : ''), { tool, method: option.value }));
                    method = option.value;
                }
                tableNumBox.innerHTML = '';
                makeTable(tableNumBox, result.data, result.rounds[0], true, result.answer);
                checkBoxToggle.setInputBoxes(document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > .checkbox'));
                CheckBoxToggle.allCheckedReset();
                checkBoxToggle.checkBoxEvent();
                loading.classList.add('none');
            });

            loading.classList.add('none');
            const checkBoxToggle = new CheckBoxToggle();
            checkBoxToggle.setInputBoxes(document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > .checkbox'));
            checkBoxToggle.allBtnEvent();
            checkBoxToggle.checkBoxEvent();
            numInfoToggleBtn.addEventListener('click', numInfoToggle());

        } else {
            Swal.fire({
                title: '알림',
                text: '번호리스트가 없습니다.',
                icon: 'info',
                footer: '<a href="/system/basic.html">번호 조합기 사용하기</a>'
            });
        }
    }).catch(err => {
        networkAlert()
    })
    .finally(() => loading.classList.add('none'));

function numInfoToggle() {
    let flag = true;
    numInfoToggleBtn.textContent = "번호정보 닫기";
    return function () {
        if (!flag) {
            numInfoToggleBtn.textContent = "번호정보 닫기";
            for (let i = 0; i < pastFilterBox.length; i++) {
                pastFilterBox[i].classList.remove('none');
            }
            flag = true;
        } else {
            numInfoToggleBtn.textContent = "번호정보 열기";
            for (let i = 0; i < pastFilterBox.length; i++) {
                pastFilterBox[i].classList.add('none');
                if (i !== 0 && (i + 1) % 5 === 0) {
                    pastFilterBox[i].style.borderBottom = "none";
                } else {
                    pastFilterBox[i].style.borderBottom = "0.5rem solid #dadada";
                }
            }
            flag = false;
        }
    }
}
