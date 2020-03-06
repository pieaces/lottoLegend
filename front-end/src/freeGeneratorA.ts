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
    makeBtn.addEventListener('click', () => {
        Swal.fire({
            title: `<div class="lds-circle"><div></div></div>`,
            allowOutsideClick: false,
            //timer: 1500,
        }).then(async () => {
            const dataSet = await postAuthAPI('/numbers/generator/free/a');
            Layout3.makeNumBoard(dataSet);
            wrapper.classList.remove('none');
        });
        document.querySelector('.swal2-actions').innerHTML = '';
        const popup = document.querySelector<HTMLElement>('.swal2-popup');
        popup.style.width = "40.45rem";
        popup.style.height = "25rem";
        document.querySelector<HTMLElement>('.swal2-backdrop-show').style.background = "rgba(0, 0, 0, 0.75)";
    })
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