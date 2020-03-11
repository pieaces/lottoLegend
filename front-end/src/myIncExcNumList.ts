import configure from './amplify/configure'
import { getAuthAPI } from './amplify/api'
import IncExcNumList from './functional/IncExcNumList/base';
import incObj from './functional/IncExcNumList/IncNumList';
import excObj from './functional/IncExcNumList/ExcNumList';

configure();

const roundSelectBox = document.querySelector<HTMLSelectElement>('#round-select-box');
const loading = document.querySelector('.loading-box');

init();

async function init() {
    /* 실제
    // const incData = await getAuthAPI('/numbers/piece', { choice: "Include" });
    // const excData = await getAuthAPI('/numbers/piece', { choice: "Exclude" });
    */

    //테스트용
    const incData = {
        numbers: [
            1, 2, 3, 4, 5, 6
        ],
        answer: [5, 16, 23, 31, 32, 33],
        rounds: [
            "990", "998", "997"
        ]
    }
    const excData = {
        numbers: [
            2, 3, 4, 5, 6, 7
        ],
        answer: [1, 3, 4, 5, 6, 7],
        rounds: [
            "990", "888", "887"
        ]
    }
    //

    const incNumList = new IncExcNumList(incData, "Include", incObj);
    const excNumList = new IncExcNumList(excData, "Exclude", excObj);


    const roundsAll = Array.from(new Set([...incData.rounds, ...excData.rounds]))


    if (incData.rounds.length) {
        incNumList.makePage();
    }
    if (excData.rounds.length) {
        excNumList.makePage();
    }
    if (incData.rounds.length || excData.rounds.length) {
        makeSelectBox(roundsAll);
        roundSelectBox.addEventListener('change', async () => {
            loading.classList.remove('none');
            /* 실제
            const incData = await getAuthAPI('/numbers/piece', { choice: "Include", round: roundSelectBox.options[roundSelectBox.options.selectedIndex].value });
            const excData = await getAuthAPI('/numbers/piece', { choice: "Exclude", round: roundSelectBox.options[roundSelectBox.options.selectedIndex].value });
            */

            const incNumList = new IncExcNumList(incData, "Include", incObj);
            const excNumList = new IncExcNumList(excData, "Exclude", excObj);
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
