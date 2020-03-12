import configure from './amplify/configure'
import { getAuthAPI } from './amplify/api'
import IncExcNumList from './IncExcNumList';
import incObj from './IncExcNumList/IncNumList';
import excObj from './IncExcNumList/ExcNumList';
configure();
import Selectr from 'mobius1-selectr';

const roundSelectBox = document.querySelector<HTMLSelectElement>('#round-select-box');
const loading = document.querySelector('.loading-box');

init();

async function init() {
    loading.classList.remove('none');
    const { include, exclude, rounds, answer } = await getAuthAPI('/numbers/piece');
    console.log(include, answer);
    const incNumList = new IncExcNumList(include, "include", incObj);
    const excNumList = new IncExcNumList(exclude, "exclude", excObj);
    IncExcNumList.setAnswer(answer);
    incNumList.makePage();
    excNumList.makePage();

    if (rounds) {
        makeSelectBox(rounds);

        roundSelectBox.addEventListener('change', async () => {
            console.log(roundSelectBox.options[roundSelectBox.options.selectedIndex].value);
            loading.classList.remove('none');
            const { include, exclude, answer } = await getAuthAPI('/numbers/piece/' + roundSelectBox.options[roundSelectBox.options.selectedIndex].value);
            incNumList.numbers = include;
            excNumList.numbers = exclude;

            IncExcNumList.setAnswer(answer);
            incNumList.makePage();
            excNumList.makePage();
            loading.classList.add('none');
        });
    }
    loading.classList.add('none');
}

function makeSelectBox(rounds: string[]) {

    for (let i = 0; i < rounds.length; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', rounds[i]);
        option.textContent = rounds[i];
        roundSelectBox.appendChild(option);
    }
}

// function makeSelectBox(rounds: string[]) {
//     const data = [];
//     for (let i = 0; i < rounds.length; i++) {
//         const obj = {
//             value: rounds[i].toString(),
//             text: rounds[i].toString()
//         }
//         data.push(obj);
//     }
//     const configs = {
//         default: {
//             data: data
//         }
//     };
//     const selectorDefault = new Selectr(roundSelectBox, configs.default);

// }




