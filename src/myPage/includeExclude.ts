import configure from '../amplify/configure'
import { getAuthAPI } from '../amplify/api'
import IncludeExclude from './IncludeExclude/index';
import incObj from './IncludeExclude/include';
import excObj from './IncludeExclude/exclude';
import Selectr, { IOptions } from 'mobius1-selectr';
import Swal from 'sweetalert2';
import { networkAlert } from '../functions';

configure();

const roundSelectBox = document.querySelector<HTMLSelectElement>('#round-select-box');
const loading = document.querySelector('.loading-box');

loading.classList.remove('none');
getAuthAPI('/numbers/piece')
    .then(({ include, exclude, rounds, answer }) => {
        if (include || exclude) {
            const incNumList = new IncludeExclude(include, "include", incObj);
            const excNumList = new IncludeExclude(exclude, "exclude", excObj);
            IncludeExclude.setAnswer(answer);
            incNumList.makePage();
            excNumList.makePage();
            document.querySelector<HTMLElement>('.selectbox-wrapper').classList.remove('none');
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
        } else {
            Swal.fire({
                title: '알림',
                text: '번호리스트가 없습니다.',
                icon: 'info',
                footer: '<a href="/system/includeExclude.html">번호 선택하러 가기</a>'
            });
        }
    }).catch(err => networkAlert())
    .finally(() => loading.classList.add('none'));