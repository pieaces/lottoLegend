import configure from './amplify/configure'
import Layout3 from './functional/Layout/Layout3'
import { getAuthAPI, getUnAuthAPI } from './amplify/api';
import Swal from 'sweetalert2'
import { predictInstance, actualInstance, selectionInstance, latestInstance } from './analLineGen';

configure();
const loading = document.querySelector<HTMLElement>('.loading-box');
const makeBtn = document.getElementById('make');
const includeCanvas = document.getElementById('include');
const excludeCanvas = document.getElementById('exclude');
const wrapper = document.querySelector<HTMLElement>('.func3-num-wrapper');
const lineGenerator = document.querySelector<HTMLElement>('.line-gen-stack-chart-container');
const lineInput = document.querySelector<HTMLElement>('.line-gen-num-table');

const first = document.querySelector<HTMLInputElement>('#first-nums');
const tenth = document.querySelector<HTMLInputElement>('#tenth-nums');
const twentieth = document.querySelector<HTMLInputElement>('#twentieth-nums');
const thirtieth = document.querySelector<HTMLInputElement>('#thirtieth-nums');
const fortieth = document.querySelector<HTMLInputElement>('#fortieth-nums');
init();

function sum(){
    return Number(first.value) + Number(tenth.value) + Number(twentieth.value) + Number(thirtieth.value) + Number(fortieth.value);
}
function info(){
    Swal.fire({
        title:'알림',
        text:'합이 6이 넘어갈 수 없습니다.',
        icon:'info'
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
document.querySelector<HTMLElement>('.line-gen-toggle-btn').addEventListener('click', async () =>{
    if(lineCheck){
        lineGenerator.classList.add('hide');
        lineInput.classList.add('hide');
        lineCheck = false;
    }else{
        lineGenerator.classList.remove('hide');
        lineInput.classList.remove('hide');
        lineCheck = true;
        const data = await getUnAuthAPI('/stats/mass', {method:'line'});
        console.log(data)
        actualInstance.dataBox.datasets.forEach((box, index) => box.data = [Number((data.all[index]/data.total).toFixed(2))]);
        latestInstance.dataBox.datasets.forEach((box, index) => box.data = [Number((data.latest[index]/12).toFixed(2))]);
        predictInstance.create();
        actualInstance.update();
        latestInstance.update();
    }
});
async function init() {
    loading.classList.remove('none');
    const { include, exclude } = await getAuthAPI('/numbers/piece');
    makeLine(includeCanvas, include);
    makeLine(excludeCanvas, exclude);
    makeBtn.addEventListener('click', async () => {
        let params: any;
        if (!lineCheck || lineCheck && sum() === 6) {
            let dataSet: any;
            wrapper.classList.add('none');
            Swal.fire({
                title: `<div class="lds-circle"><div></div></div>`,
                footer: '주어진 데이터로 고객님의 번호를 조합중입니다',
                allowOutsideClick: false,
                timer: 1000,
            }).then(() => {
                wrapper.classList.remove('none');
            });
            document.querySelector('.swal2-actions').innerHTML = '';
            const popup = document.querySelector<HTMLElement>('.swal2-popup');
            popup.style.width = "45rem";
            popup.style.height = "27.8rem";
            popup.style.background = 'gold';
            popup.style.boxShadow = "0 1px 2px rgba(0,0,0,0.07),0 2px 4px rgba(0,0,0,0.07),0 4px 8px rgba(0,0,0,0.07),0 8px 16px rgba(0,0,0,0.07),0 16px 32px rgba(0,0,0,0.07),0 32px 64px rgba(0,0,0,0.07)";
            const backdrop = document.querySelector<HTMLElement>('.swal2-backdrop-show')
            backdrop.style.background = "rgba(0, 0, 0, 0.6)";
            backdrop.style.boxShadow = "rgba(0, 0, 0, 0.7) 19rem 13rem 24rem inset, rgba(0, 0, 0, 0.7) -14rem -9rem 23rem inset";
            const footer = document.querySelector<HTMLElement>('.swal2-footer');
            footer.style.margin = '0';
            footer.style.padding = '1.5em 0 0';
            footer.style.fontSize = '2rem';
            footer.style.fontWeight = 'bold';

            if(lineCheck){
                params = [Number(first.value), Number(tenth.value), Number(twentieth.value), Number(thirtieth.value), Number(fortieth.value)]
                dataSet = await getAuthAPI('/numbers/generator/free', { lineCount: JSON.stringify(params) });
            }else{
                dataSet = await getAuthAPI('/numbers/generator/free');
            }
            Layout3.makeNumBoard(dataSet);
        }else{
            Swal.fire({
                title:'알림',
                text:'구간개수의 합이 6이 되어야합니다',
                icon:'info'
            })
        }
    });
    loading.classList.add('none');
}

function makeLine(canvas: HTMLElement, numbers: number[]): void {
    numbers.forEach(num => {
        const div = document.createElement('div');
        div.classList.add('func3-select-num');
        div.textContent = num.toString();
        Layout3.setColorLotto(num, div);
        canvas.appendChild(div);
    });
}