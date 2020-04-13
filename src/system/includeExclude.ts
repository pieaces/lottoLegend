import configure from '../amplify/configure'
import { getUnAuthAPI, postAuthAPI, getAuthAPI } from '../amplify/api'
import Layout2 from "./premium/Layout/Layout2";
import ResetBtn from './premium/instanceBtns/ResetBtn';
import Swal from 'sweetalert2'
import { networkAlert } from '../functions';

configure();

const category = document.querySelector('.main').getAttribute('data-category');
const makeBtn = document.getElementById('make-btn');
enum IncOrExc {
    "include" = "include",
    "exclude" = "exclude"
}
let incOrExc: IncOrExc;
const loading = document.querySelector<HTMLElement>('.loading-box');
loading.classList.remove('none');

getAuthAPI('/numbers/piece', { flag: true }).then(async ({ include, exclude }) =>{
    const data = await getUnAuthAPI('/stats/mass', { method: 'excludeInclude' });
        const layout = new Layout2([null, null, null, true], data.data, data.winNums, data.total);
        loading.classList.add('none');
        layout.init();
        let alertMessage: string[] = [];
        let numbers: number[];
        let current: number[];
        if (category === "include") {
            layout.includeVerson();
            numbers = exclude;
            current = include;
            incOrExc = IncOrExc.include;
            alertMessage = ['이번회차 제외수가 저장 되어있습니다', '기존에 생성하셨던 제외수를 추천수 생성에 반영할까요?'];
        } else {
            layout.excludeVersion();
            numbers = include;
            current = exclude;
            incOrExc = IncOrExc.exclude;
            alertMessage = ['이번회차 추천수가 저장 되어있습니다', '기존에 생성하셨던 추천수를 제외수 생성에 반영할까요?'];
        }
        layout.setOpacity();
        if (numbers && (await infoAlert(alertMessage[0], alertMessage[1])).value) {
            layout.options[5] = numbers;
            layout.setOpacity();
        }
        layout.refreshNumberBoard();
        const resetBtn = new ResetBtn();
        resetBtn.addEvent(layout.resetConfirm.bind(layout));

        makeBtn.addEventListener('click', async () => {
            if ((!current || current.length === 0) || layout.checkedNumbers.length === 0 && (await infoAlert('선택하신 번호가 없습니다', '빈 상태로 초기화합니다')).value ||
                (current && current.length > 0 && layout.checkedNumbers.length > 0) && (await infoAlert('기존에 번호를 생성하셨습니다', '초기화하고 덮어씁니다')).value) {
                try {
                    await postAuthAPI('/numbers/piece', { numbers: layout.checkedNumbers, choice: incOrExc });
                    current = layout.checkedNumbers;
                    if (category === "include") {
                        Swal.fire({
                            title: '완료!',
                            text: '이어서 제외수를 생성하시겠습니까?',
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '네',
                            cancelButtonText: '아니요',
                        }).then(async (result) => {
                            if (result.value) {
                                location.href = `./exclude.html`;
                            } else {

                            }
                        });
                    } else {
                        Swal.fire({
                            title: '완료!',
                            text: '이어서 추천수를 생성하시겠습니까?',
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '네',
                            cancelButtonText: '아니요',
                        }).then(async (result) => {
                            if (result.value) {
                                location.href = `./include.html`;
                            } else {

                            }
                        });
                    }
                } catch (err) {
                    networkAlert();
                }
            }
        });
}).catch(() => networkAlert())
.finally(() =>     loading.classList.add('none'));

function infoAlert(title: string, text: string) {
    return Swal.fire({
        title,
        text,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '예',
        cancelButtonText: '아니요',
    })
}