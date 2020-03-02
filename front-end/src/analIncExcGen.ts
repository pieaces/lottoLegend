import configure from './amplify/configure'
import { getUnAuthAPI, postAuthAPI, getAuthAPI } from './amplify/api'
import Layout2 from "./functional/Layout/Layout2";
import Question from './functional/Question';
import ResetBtn from './functional/instanceBtns/ResetBtn';
import { alertMessage } from './functions';
const toggleBtn = document.getElementById('inc-exc-toggle-btn');
const toggle = document.querySelector<HTMLInputElement>('#inc-exc-toggle-check');
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
        const option:any = [null, null, null, true];
        const layout = new Layout2(option, data.data, data.winNums, data.total);
        const include = await getAuthAPI('/numbers/piece', {choice:IncOrExc.include});
        console.log(include);
        if(confirm('이미 포함수를 지정하셨습니다. 새로 만드시겠습니까?')){

        }
        layout.init();

        layout.includeVerson();
        layout.setOpacity();
        layout.refreshNumberBoard();
        const resetBtn = new ResetBtn();
        resetBtn.addEvent(layout.resetConfirm.bind(layout));

        toggleBtn.addEventListener('click', () => {
            if (toggle.checked) {
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
            const numbers = layout.checkedNumbers;

            try{
                await postAuthAPI('/numbers/piece', { numbers, choice: incOrexc });
                alert("성공적으로 입력되었습니다.")
            }catch(err){
                alertMessage();
            }
        })
    });