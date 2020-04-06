import configure from '../amplify/configure'
import Layout3 from './premium/Layout/Layout3'
import NumBoard from './premium/Layout/NumBoard';
import { getAuthAPI, getUnAuthAPI, postAuthAPI } from '../amplify/api';
import Swal from 'sweetalert2'
import { actualInstance, selectionInstance, latestInstance } from './stackInstances';
import SaveBtn, { Tool } from './premium/instanceBtns/SaveBtn';
import CheckBoxToggle from './premium/instanceBtns/CheckBoxToggle';
import { makeCheckdValueBox } from './premium/Layout/functions';
import generatorLoading from './generatorLoading';

import {mqInit,menuInfoToggle} from '../base/headerHover';

mqInit();
menuInfoToggle();
configure();

const includeCanvas = document.getElementById('include');
const excludeCanvas = document.getElementById('exclude');
const lineGenerator = document.querySelector<HTMLElement>('.line-gen-stack-chart-container');
const lineInputTable = document.querySelector<HTMLElement>('.line-gen-num-table');
const numListSelectTotal = document.querySelector<HTMLElement>('#num-list-select-total');
const numListSelectCurrent = document.querySelector<HTMLElement>('#num-list-select-current');
const allCheckBox = document.querySelector<HTMLInputElement>('#all-check');

const first = document.querySelector<HTMLInputElement>('#first-nums');
const tenth = document.querySelector<HTMLInputElement>('#tenth-nums');
const twentieth = document.querySelector<HTMLInputElement>('#twentieth-nums');
const thirtieth = document.querySelector<HTMLInputElement>('#thirtieth-nums');
const fortieth = document.querySelector<HTMLInputElement>('#fortieth-nums');

const checkBoxToggle = new CheckBoxToggle();

function sum() {
    return Number(first.value) + Number(tenth.value) + Number(twentieth.value) + Number(thirtieth.value) + Number(fortieth.value);
}
function alertEffect() {
    lineInputTable.style.border = "2px solid rgb(237, 59, 59)";
}
function info() {
    alertEffect()
    Swal.fire({
        title: '알림',
        text: '합이 6이 넘어갈 수 없습니다.',
        icon: 'info'
    })
}

getAuthAPI('/numbers/piece', { flag: true })
    .then(({ include, exclude }) => {
        //document.querySelector<HTMLElement>('.line-gen-round').textContent = total + '회';
        include && Layout3.makeLine(includeCanvas, include);
        exclude && Layout3.makeLine(excludeCanvas, exclude);

        const includeNumsArr: number[] = [];
        Array.from(includeCanvas.children).forEach(node => {
            const numEl = node.firstElementChild as HTMLElement;
            let flag = false;
            numEl.addEventListener('click', () => {
                if (!flag) {
                    numEl.style.border = "5px solid rgb(134, 0, 6)";
                    includeNumsArr.push(Number(numEl.textContent));
                } else {
                    numEl.style.border = "none";
                    includeNumsArr.splice(includeNumsArr.indexOf(Number(numEl.textContent)), 1);
                }
                flag = !flag;
            })
        })

        SaveBtn.init(Tool.free);

        document.getElementById('make').addEventListener('click', async () => {
            if (includeNumsArr.length > 0 && (exclude && exclude.length > 0 && exclude.some(num => includeNumsArr.some(fix => fix === num)))) {
                alertEffect();
                Swal.fire({
                    title: '오류',
                    text: '고정수는 제외수가 될 수 없습니다. 다시 지정해주세요.',
                    icon: 'error'
                });
            } else if (lineCheck && sum() === 6) {
                const lineCount = [Number(first.value), Number(tenth.value), Number(twentieth.value), Number(thirtieth.value), Number(fortieth.value)];

                const choiceCompart = compartByLine(makeChoice(exclude));
                const includeCompart = compartByLine(includeNumsArr);
                let choiceFlag = true;
                let includeFlag = true;

                for (let i = 0; i < 5; i++) {
                    if (!choiceCompart[i] && lineCount[i] || choiceCompart[i] && choiceCompart[i].length < lineCount[i]) {
                        choiceFlag = false;
                        break;
                    }
                    if (includeCompart[i] && includeCompart[i].length > lineCount[i]) {
                        includeFlag = false;
                        break;
                    }
                }
                if (!choiceFlag) {
                    alertEffect();
                    Swal.fire({
                        title: '오류',
                        text: '현재의 제외수로는 조합될 수 없는 구간개수 조건입니다.',
                        icon: 'error'
                    });
                } else if (!includeFlag) {
                    alertEffect();
                    Swal.fire({
                        title: '오류',
                        text: '고정수가 구간개수 조건과 충돌합니다.',
                        icon: 'error'
                    });
                } else {
                    generatorLoading(1250);

                    lineInputTable.style.border = "";
                    const dataSet = await postAuthAPI('/numbers/generator/free', { lineCount, include: includeNumsArr });
                    const numBoard = new NumBoard(dataSet);
                    numBoard.makeNumBoard();
                    makeCheckdValueBox(numListSelectTotal, numListSelectCurrent, allCheckBox);

                    checkBoxToggle.setInputBoxes(document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > input'));
                    checkBoxToggle.addEvent();
                    CheckBoxToggle.allCheckedReset();
                }
            } else if (lineCheck && sum() !== 6) {
                alertEffect();
                Swal.fire({
                    title: '알림',
                    text: '구간개수의 합이 6이 되어야합니다',
                    icon: 'info'
                });
            }
            else if (!lineCheck) {
                generatorLoading(1250);

                lineInputTable.style.border = "";
                const dataSet = await postAuthAPI('/numbers/generator/free', { include: includeNumsArr });
                console.log(dataSet);
                const numBoard = new NumBoard(dataSet);
                numBoard.makeNumBoard();
                makeCheckdValueBox(numListSelectTotal, numListSelectCurrent, allCheckBox);

                checkBoxToggle.setInputBoxes(document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > input'));
                checkBoxToggle.addEvent();
                CheckBoxToggle.allCheckedReset();
            }
        });
    });

first.oninput = () => {
    if (sum() <= 6) {
        selectionInstance.dataBox.datasets[0].data = [Number(first.value)];
        selectionInstance.update();
    }
    else {
        first.value = '';
        info();
    }
}
tenth.oninput = () => {
    if (sum() <= 6) {
        selectionInstance.dataBox.datasets[1].data = [Number(tenth.value)];
        selectionInstance.update();
    }
    else {
        tenth.value = '';
        info();
    }
}
twentieth.oninput = () => {
    if (sum() <= 6) {
        selectionInstance.dataBox.datasets[2].data = [Number(twentieth.value)];
        selectionInstance.update();
    }
    else {
        twentieth.value = '';
        info();
    }
}
thirtieth.oninput = () => {
    if (sum() <= 6) {
        selectionInstance.dataBox.datasets[3].data = [Number(thirtieth.value)];
        selectionInstance.update();
    }
    else {
        thirtieth.value = '';
        info();
    }
}
fortieth.oninput = () => {
    if (sum() <= 6) {
        selectionInstance.dataBox.datasets[4].data = [Number(fortieth.value)];
        selectionInstance.update();
    }
    else {
        fortieth.value = '';
        info();
    }
}
let lineCheck = false;
const lineBtn = document.querySelector<HTMLElement>('.line-gen-toggle-btn');
lineBtn.addEventListener('click', async () => {
    if (lineCheck) {
        lineBtn.style.background = '';
        lineGenerator.classList.add('none');
        lineInputTable.classList.add('hide');
        lineCheck = false;
    } else {
        lineBtn.style.background = '#617897';
        lineGenerator.classList.remove('none');
        lineInputTable.classList.remove('hide');
        lineCheck = true;
        const data = await getUnAuthAPI('/stats/mass', { method: 'line' });
        console.log(data)
        actualInstance.dataBox.datasets.forEach((box, index) => box.data = [Number((data.all[index] / data.total).toFixed(2))]);
        latestInstance.dataBox.datasets.forEach((box, index) => box.data = [Number((data.latest[index] / 12).toFixed(2))]);
        actualInstance.update();
        latestInstance.update();
    }
});


function doesExist(one: number[], other: number[]) {
    let flag = false;
    for (let i = 0; i < one.length; i++) {
        for (let j = 0; j < other.length; j++) {
            if (one[i] === other[j]) {
                flag = true;
                break;
            }
        }
    }
    return flag;
}
function compartByLine(numbers: number[]) {
    const result: number[][] = new Array(5);
    numbers && numbers.forEach(num => {
        const index = Math.floor((num - 1) / 10);
        if (result[index])
            result[index].push(num);
        else
            result[index] = [num];
    });
    return result;
}
function makeChoice(exclude: number[]) {
    const choice: number[] = [];
    if (exclude && exclude.length > 0) {
        exclude.forEach((num, index) => {
            for (let i = exclude[index - 1] + 1 || 1; i < num; i++)
                choice.push(i);
        });
        for (let i = exclude[exclude.length - 1] + 1; i <= 45; i++)
            choice.push(i);
    }
    else
        for (let i = 1; i <= 45; i++)
            choice.push(i);
    return choice;
}