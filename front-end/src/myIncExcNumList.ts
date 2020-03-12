import configure from './amplify/configure'
import { getAuthAPI } from './amplify/api'
import IncExcNumList from './IncExcNumList';
import incObj from './IncExcNumList/IncNumList';
import excObj from './IncExcNumList/ExcNumList';
configure();
import Selectr, { IOptions } from 'mobius1-selectr';

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
        const config:IOptions = {
            data: rounds.map((round:string) => {
                return {
                    text: round,
                    value: round
                }
            }),
        };
        const selector = new Selectr(roundSelectBox, config);
        selector.on('selectr.change', async (option) => {
            loading.classList.remove('none');
            const { include, exclude, answer } = await getAuthAPI('/numbers/piece/' + option.value);
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