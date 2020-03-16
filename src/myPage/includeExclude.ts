import configure from '../amplify/configure'
import { getAuthAPI } from '../amplify/api'
import IncludeExclude from './IncludeExclude/index';
import incObj from './IncludeExclude/include';
import excObj from './IncludeExclude/exclude';
configure();
headerSign();

import Selectr, { IOptions } from 'mobius1-selectr';
import { headerSign } from '../amplify/auth';

const roundSelectBox = document.querySelector<HTMLSelectElement>('#round-select-box');
const loading = document.querySelector('.loading-box');

init();

async function init() {
    loading.classList.remove('none');
    const { include, exclude, rounds, answer } = await getAuthAPI('/numbers/piece');
    const incNumList = new IncludeExclude(include, "include", incObj);
    const excNumList = new IncludeExclude(exclude, "exclude", excObj);
    IncludeExclude.setAnswer(answer);
    incNumList.makePage();
    excNumList.makePage();

    if (rounds) {
        const config: IOptions = {
            data: rounds.map((round: string) => {
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

            IncludeExclude.setAnswer(answer);
            incNumList.makePage();
            excNumList.makePage();
            loading.classList.add('none');
        });
    }
    loading.classList.add('none');
}