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
let numsObj: { include: number[]; exclude: number[] };
function getCurrentChoiceNumbers(bool: boolean): number[] {
    if (bool) return numsObj.exclude;
    else return numsObj.include;
}
getUnAuthAPI('/stats/mass/excludeInclude')
    .then(async (data) => {
        console.log(data);
        const question = new Question();
        question.numBoardQue.on();
        const layout = new Layout2([null, null, null, true], data.data, data.winNums, data.total);
        try {
            numsObj = await getAuthAPI('/numbers/piece');
            if (numsObj.exclude.length > 0 && confirm('기존에 지정하신 제외수를 반영하시겠습니까?')) {
                layout.options[5] = numsObj.exclude;
            }            
            layout.init();
            layout.includeVerson();
            layout.setOpacity();
            layout.refreshNumberBoard();
            const resetBtn = new ResetBtn();
            resetBtn.addEvent(layout.resetConfirm.bind(layout));

            toggleBtn.addEventListener('click', () => {
                if (toggle.checked) {
                    if (numsObj.include.length > 0 && confirm('기존에 지정하신 포함수를 반영하시겠습니까?')) {
                        layout.options[5] = numsObj.include;
                    }else{
                        layout.options[5] = [];
                    }
                    incOrexc = IncOrExc.exclude;
                    layout.excludeVersion();
                } else {
                    console.log(numsObj.exclude);
                    if (numsObj.exclude.length > 0 && confirm('기존에 지정하신 제외수를 반영하시겠습니까?')) {
                        layout.options[5] = numsObj.exclude;
                    }else{
                        layout.options[5] = [];
                    }
                    incOrexc = IncOrExc.include;
                    layout.includeVerson();
                }
                layout.reset();
                layout.setOpacity();
                layout.refreshNumberBoard();
            });
            makeBtn.addEventListener('click', async () => {
                let numbers = getCurrentChoiceNumbers(toggle.checked);
                if (layout.checkedNumbers.length===0 && confirm('빈 상태로 초기화하시겠습니까?') || numbers.length === 0 || numbers.length > 0 && confirm('이미 번호를 지정하셨습니다. 덮어쓰기하시겠습니까?')) {
                    try {
                        await postAuthAPI('/numbers/piece', { numbers: layout.checkedNumbers, choice: incOrexc });
                        if(toggle.checked){
                            numsObj.exclude = layout.checkedNumbers;
                        }else {
                            numsObj.include = layout.checkedNumbers;
                        }
                        alert("성공적으로 입력되었습니다.");
                    } catch (err) {
                        afterAlert();
                    }
                }
            });
        }
        catch (err) {
            beforeAlert();
        }
    });