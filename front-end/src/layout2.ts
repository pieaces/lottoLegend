import configure from './amplify/configure'
import { getUnAuthAPI } from './amplify/api'
import Layout2 from "./functional/Layout/PureLayout2";



const layout = new Layout2();
configure();
getUnAuthAPI('/stats/mass/excludeInclude')
    .then(data => {
        console.log(data);
        layout.setLayout2Data(data.data);
        layout.setTotal(data.total);
        layout.setWinNumbers(data.winNums);
        layout.init();
    });

    // const incBtn = document.querySelector('#inc-btn');
    // const excBtn = document.querySelector('#exc-btn');
    // const incLayout = document.querySelector('.include-layout');
    // const excLayout = document.querySelector('.exclude-layout');

    // incBtn.addEventListener('click', () => {
    //     incLayout.classList.remove('none');
    //     excLayout.classList.add('none');
    // })

    // excBtn.addEventListener('click', () => {
    //     incLayout.classList.add('none');
    //     excLayout.classList.remove('none');
    // })