import configure from './amplify/configure'
import { getUnAuthAPI } from './amplify/api'
import Layout2 from "./functional/Layout/Layout2";
import Question from './functional/Question';
import ResetBtn from './functional/instanceBtns/ResetBtn';
const toggleBtn = document.getElementById('inc-exc-toggle-btn');
const toggle = document.querySelector<HTMLInputElement>('#inc-exc-toggle-check');

configure();
getUnAuthAPI('/stats/mass/excludeInclude')
    .then(data => {
        console.log(data);
        const question = new Question();
        question.numBoardQue.on();
        const layout = new Layout2([null, null, null, true], data.data, data.winNums, data.total);
        layout.init();

        layout.includeVerson();
        layout.setOpacity();
        layout.refreshNumberBoard();
        const resetBtn = new ResetBtn();
        resetBtn.addEvent(layout.resetConfirm.bind(layout));

        toggleBtn.addEventListener('click', () => {
            if (toggle.checked) {
                layout.excludeVersion();
            } else {
                layout.includeVerson();
            }
            layout.reset();
            layout.setOpacity();
            layout.refreshNumberBoard();
        });
    });