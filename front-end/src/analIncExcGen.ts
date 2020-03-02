import configure from './amplify/configure'
import { getUnAuthAPI, postAuthAPI, getAuthAPI } from './amplify/api'
import Layout2 from "./functional/Layout/Layout2";
import Question from './functional/Question';
import ResetBtn from './functional/instanceBtns/ResetBtn';
import Swal from 'sweetalert2'
import { infoAlert, networkAlert } from './functions';

const makeBtn = document.getElementById('make-btn');

enum IncOrExc {
    "include" = "Include",
    "exclude" = "Exclude"
}
let incOrexc: IncOrExc = IncOrExc.include;
configure();

getUnAuthAPI('/stats/mass/excludeInclude')
    .then(async (data) => {
        console.log(data);
        const question = new Question();
        question.numBoardQue.on();
        try {
            const { include, exclude } = await getAuthAPI('/numbers/piece');
            const layout = new Layout2([null, null, null, true], data.data, data.winNums, data.total);
            layout.init();
            layout.includeVerson();
            layout.setOpacity();
            if (exclude.length > 0 && (await infoAlert('이번회차 제외수가 저장 되어있습니다', '기존에 생성하셨던 제외수를 포함수 생성에 반영할까요?')).value) {
                layout.options[5] = exclude;
                layout.setOpacity();
            }
            layout.refreshNumberBoard();
            const resetBtn = new ResetBtn();
            resetBtn.addEvent(layout.resetConfirm.bind(layout));

            makeBtn.addEventListener('click', async () => {
                if (include.length === 0 || layout.checkedNumbers.length === 0 && (await infoAlert('선택하신 번호가 없습니다', '빈 상태로 초기화합니다')).value ||
                    (include.length > 0 && layout.checkedNumbers.length > 0) && (await infoAlert('이미 번호를 생성하셨습니다', '초기화하고 덮어씁니다')).value) {
                    try {
                        await postAuthAPI('/numbers/piece', { numbers: layout.checkedNumbers, choice: incOrexc });
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
                            }
                        });
                    } catch (err) {
                        networkAlert();
                    }
                }
            });
        }
        catch (err) {
            networkAlert();
        }
    });