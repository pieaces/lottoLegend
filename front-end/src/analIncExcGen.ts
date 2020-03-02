import configure from './amplify/configure'
import { getUnAuthAPI, postAuthAPI, getAuthAPI } from './amplify/api'
import Layout2 from "./functional/Layout/Layout2";
import Question from './functional/Question';
import ResetBtn from './functional/instanceBtns/ResetBtn';
import { afterAlert, beforeAlert } from './functions';
const toggleBtn = document.getElementById('inc-exc-toggle-btn');
const toggle = document.querySelector<HTMLInputElement>('#inc-exc-toggle-check');
const makeBtn = document.getElementById('make-btn');

enum IncOrExc {
    "include" = "Include",
    "exclude" = "Exclude"
}
let incOrexc: IncOrExc = IncOrExc.include;
configure();
let numsObj:{include:number[]; exclude:number[]};
function getCurrentChoiceNumbers(bool:boolean): number[]{
    if(bool) return numsObj.exclude;
    else return numsObj.include;
}
getUnAuthAPI('/stats/mass/excludeInclude')
    .then(async (data) => {
        console.log(data);
        const question = new Question();
        question.numBoardQue.on();
        const option: any = [null, null, null, true];
        const layout = new Layout2(option, data.data, data.winNums, data.total);
        try {
            numsObj = await getAuthAPI('/numbers/piece');
            layout.init();

            layout.includeVerson();
            layout.setOpacity();
            layout.refreshNumberBoard();
            const resetBtn = new ResetBtn();
            resetBtn.addEvent(layout.resetConfirm.bind(layout));

            toggleBtn.addEventListener('click', () => {
                if (toggle.checked) {
                    if(numsObj.include.length > 0 && confirm('기존에 지정하신 포함수를 제외수에 반영하시겠습니까?')){
                        option[3] = numsObj.include;
                    }
                    incOrexc = IncOrExc.exclude;
                    layout.excludeVersion();
                } else {
                    incOrexc = IncOrExc.include;
                    layout.includeVerson();
                }
                layout.reset();
                layout.setOpacity();
                layout.refreshNumberBoard();
            });
            makeBtn.addEventListener('click', async () => {
                let flag = false;
                let numbers = getCurrentChoiceNumbers(toggle.checked);
                if (numbers.length === 0 || numbers.length > 0 && confirm('이미 포함수를 지정하셨습니다. 덮어쓰기하시겠습니까?')) {
                    flag = true;
                }
                if (flag) {
                    try {
                        await postAuthAPI('/numbers/piece', { numbers:layout.checkedNumbers, choice: incOrexc });
                        numbers = layout.checkedNumbers;
                        alert("성공적으로 입력되었습니다.");
                    } catch (err) {
                        afterAlert();
                    }
                }
            })
        }
        catch (err) {
            beforeAlert();
        }
    });