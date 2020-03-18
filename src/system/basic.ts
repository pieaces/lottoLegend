import configure from '../amplify/configure'
import Layout3 from './premium/Layout/Layout3'
import NumBoard from './premium/Layout/NumBoard';
import { getAuthAPI, getUnAuthAPI } from '../amplify/api';
import Swal from 'sweetalert2'
import { actualInstance, selectionInstance, latestInstance } from './stackInstances';
import SaveBtn, { Tool } from './premium/instanceBtns/SaveBtn';
import CheckBoxToggle from './premium/instanceBtns/CheckBoxToggle';
import { headerSign } from '../amplify/auth';
import { makeCheckdValueBox } from './premium/Layout/functions';
import generatorLoading from './generatorLoading';

configure();
headerSign();

const loading = document.querySelector<HTMLElement>('.loading-box');
const includeCanvas = document.getElementById('include');
const excludeCanvas = document.getElementById('exclude');
const lineGenerator = document.querySelector<HTMLElement>('.line-gen-stack-chart-container');
const lineInputTable = document.querySelector<HTMLElement>('.line-gen-num-table');
const textToggleShowBox = document.querySelector<HTMLElement>('.line-gen-text-toggle-show');
const textToggleHideBox = document.querySelector<HTMLElement>('.line-gen-text-toggle-hide');
const explainText = document.querySelector<HTMLElement>('.line-gen-text-content');

const first = document.querySelector<HTMLInputElement>('#first-nums');
const tenth = document.querySelector<HTMLInputElement>('#tenth-nums');
const twentieth = document.querySelector<HTMLInputElement>('#twentieth-nums');
const thirtieth = document.querySelector<HTMLInputElement>('#thirtieth-nums');
const fortieth = document.querySelector<HTMLInputElement>('#fortieth-nums');

const checkBoxToggle = new CheckBoxToggle();
init();

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

async function init() {
    loading.classList.remove('none');
    lineGenTextToggleInit();
    const { include, exclude, total } = await getAuthAPI('/numbers/piece', { flag: true });
    document.querySelector<HTMLElement>('.line-gen-round').textContent = total + '회';
    include && Layout3.makeLine(includeCanvas, include);
    exclude && Layout3.makeLine(excludeCanvas, exclude);
    SaveBtn.init(Tool.free);

    document.getElementById('make').addEventListener('click', async () => {
        if (!lineCheck || lineCheck && sum() === 6) {
            generatorLoading(1250);
            if (lineCheck) {
                const lineCount = [Number(first.value), Number(tenth.value), Number(twentieth.value), Number(thirtieth.value), Number(fortieth.value)];
                const choice = makeChoice(exclude);
                const compart = {
                    choice: compartByLine(choice),
                    include: compartByLine(include),
                };
                let choiceFlag = true;
                let includeFlag = false;
                for (let i = 0; i < 5; i++) {
                    if (!compart.choice[i] && lineCount[i] || compart.choice[i] && compart.choice[i].length < lineCount[i]) {
                        choiceFlag = false;
                        break;
                    }
                    if (!includeFlag && compart.include[i] && lineCount[i] > 0) {
                        includeFlag = doesExist(compart.choice[i], compart.include[i]);
                    }
                }
                if (!choiceFlag) {
                    alertEffect();
                    Swal.fire({
                        title: '오류',
                        text: '현재의 제외번호로는 조합될 수 없는 구간개수 조건입니다.',
                        icon: 'error'
                    });
                }
                else if (include && include.length > 0 && !includeFlag) {
                    alertEffect();
                    Swal.fire({
                        title: '오류',
                        text: '현재의 추천번호가 절대 나올 수 없는 구간개수 조건입니다.',
                        icon: 'error'
                    });
                }
                else {
                    lineInputTable.style.border = "";
                    const dataSet = await getAuthAPI('/numbers/generator/free', { lineCount: JSON.stringify(lineCount) });
                    console.log(dataSet);
                    const numBoard = new NumBoard(dataSet);
                    numBoard.makeNumBoard();

                    makeCheckdValueBox();

                    checkBoxToggle.setInputBoxes(document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > input'));
                    CheckBoxToggle.allCheckedReset();

                }
            } else {
                lineInputTable.style.border = "";
                const dataSet = await getAuthAPI('/numbers/generator/free');
                console.log(dataSet);
                const numBoard = new NumBoard(dataSet);
                numBoard.makeNumBoard();
                makeCheckdValueBox();

                checkBoxToggle.setInputBoxes(document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > input'));
                CheckBoxToggle.allCheckedReset();
            }
        } else {
            alertEffect();
            Swal.fire({
                title: '알림',
                text: '구간개수의 합이 6이 되어야합니다',
                icon: 'info'
            });
        }
    });
    loading.classList.add('none');
}

function lineGenTextToggleInit() {
    let flag = false;
    function lineGenTextToggle() {
        if (!flag) {
            explainText.classList.remove('none');
            textToggleHideBox.classList.remove('none');
            textToggleShowBox.classList.add('none');
            textToggleHideBox.style.borderTop = "1px solid rgba(0,0,0,0.1)";

            flag = true;
        } else {
            explainText.classList.add('none');
            textToggleHideBox.classList.add('none');
            textToggleShowBox.classList.remove('none');
            textToggleHideBox.style.borderTop = "";

            flag = false;
        }
    }
    textToggleShowBox.addEventListener('click', lineGenTextToggle);
    textToggleHideBox.addEventListener('click', lineGenTextToggle);
}

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
    const result = new Array(5);
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
    const choice = [];
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