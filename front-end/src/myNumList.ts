import configure from './amplify/configure'
import { getAuthAPI } from './amplify/api';
import CheckBoxToggle from './functional/instanceBtns/CheckBoxToggle';
import { setColorLotto, makeInputCheckBox, makePastFilterTable } from './functional/Layout/functions';

configure();
const tableNumBox = document.querySelector('.mypage-table-num-box');
const loading = document.querySelector('.loading-box');

init();
async function init() {
    loading.classList.remove('none');
    const data = await getAuthAPI('/numbers/mass');
    const rounds = Object.keys(data);
    rounds.reverse().forEach(round =>{
        makeTable(data[round], round);
    })

    loading.classList.add('none');
    const checkBoxToggle = new CheckBoxToggle();
    checkBoxToggle.addEvent();
}

function makeTable(dataSet:any[], round:number|string) {
    for (let i = 0; i < dataSet.length; i++) {
        const tableContent = document.createElement('div');
        tableContent.classList.add('mypage-table-content');

        const tableCheckBox = document.createElement('div');

        tableCheckBox.classList.add('mynum-table-checkbox');

        tableCheckBox.append(makeInputCheckBox());

        tableContent.appendChild(tableCheckBox);

        const tableRound = document.createElement('div');
        tableRound.classList.add('mynum-table-round');
        tableRound.textContent = round.toString();

        tableContent.appendChild(tableRound);

        const tableDate = document.createElement('div');
        tableDate.classList.add('mynum-table-date');
        tableDate.textContent = dataSet[i].date.slice(0,10);

        tableContent.appendChild(tableDate);

        const tableDivision = document.createElement('div');
        tableDivision.classList.add('mynum-table-division');
        let division: string;
        switch (dataSet[i].tool) {
            case 'a': division = "무료";
                break;
            case 'b': division = "프리미엄"
                switch (dataSet[i].method) {
                    case 'a': division += " 자동"
                        break;
                    case 'm': division += " 수동"
                        break;
                }
                break;
        }

        tableDivision.textContent = division;

        tableContent.appendChild(tableDivision);

        const tableNum = document.createElement('div');
        tableNum.classList.add('mynum-table-num');

        const tableNumList = document.createElement('div');
        tableNumList.classList.add('mypage-table-num-list');

        for (let j = 0; j < dataSet[i].numbers.length; j++) {
            const div = document.createElement('div');
            div.textContent = dataSet[i].numbers[j].toString();
            setColorLotto(dataSet[i].numbers[j], div);
            tableNumList.appendChild(div);
        }

        tableNum.appendChild(tableNumList);
        tableContent.appendChild(tableNum);

        const tableIsWin = document.createElement('div');
        tableIsWin.classList.add('mynum-table-iswin');
        if(dataSet[i].win){
            tableIsWin.textContent = dataSet[i].win;
        }else{
            tableIsWin.textContent = '추첨전';
        }
        tableContent.appendChild(tableIsWin);

        tableNumBox.appendChild(tableContent);

        const infoTd = makePastFilterTable(dataSet[i]);
        tableNumBox.appendChild(infoTd);
    }
}