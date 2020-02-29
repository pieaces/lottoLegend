import configure from './amplify/configure'
import {getUnAuthAPI} from './amplify/api'
import Layout2 from "./functional/Layout/Layout2";
import Question from './functional/Question';

configure();
getUnAuthAPI('/stats/mass/excludeInclude')
.then(data => {
    console.log(data);
    const question = new Question();
    question.numBoardQue.on();
    const layout = new Layout2([null,null,null,true], data.data, data.winNums, data.total);
    layout.init();
    layout.includeVerson();
    layout.setOpacity();
    layout.refreshNumberBoard();
});