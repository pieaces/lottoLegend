import configure from './amplify/configure'
import Layout3 from './functional/Layout/Layout3'
import { postAuthAPI, getAuthAPI } from './amplify/api';
import Swal from 'sweetalert2'

configure();
const loading = document.querySelector<HTMLElement>('.loading-box');
const makeBtn = document.getElementById('make');
const includeCanvas = document.getElementById('include');
const excludeCanvas = document.getElementById('exclude');
const wrapper = document.querySelector<HTMLElement>('.func3-num-wrapper');
init();

async function init() {
    loading.classList.remove('none');
    const { include, exclude } = await getAuthAPI('/numbers/piece');
    makeLine(includeCanvas, include);
    makeLine(excludeCanvas, exclude);
    makeBtn.addEventListener('click', async () => {
        let dataSet:any;
        wrapper.classList.add('none');
        Swal.fire({
            title: `<div class="lds-circle"><div></div></div>`,
            footer:'주어진 데이터로 고객님의 번호를 조합중입니다',
            allowOutsideClick: false,
            timer: 1000,
        }).then(()=>{
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

        dataSet = await postAuthAPI('/numbers/generator/free/a');
        Layout3.makeNumBoard(dataSet);
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