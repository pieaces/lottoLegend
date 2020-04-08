import { makeInputCheckBox, makePastFilterTable } from "../../system/premium/Layout/functions"; import { setColorLotto, setDisabledLotto, isoStringToDate } from "../../functions";

export function makeTable(canvas: HTMLElement, dataSet: any[], round: number | string, info: boolean, answer?: { numbers: number[], bonusNum: number }) {
    for (let i = 0; i < (dataSet && dataSet.length) || 0; i++) {
        const tableContent = document.createElement('div');
        tableContent.classList.add('mypage-table-content');
        tableContent.setAttribute('data-numbers', JSON.stringify(dataSet[i].numbers));

        if (i !== 0 && i % 10 === 0) {
            tableContent.style.borderTop='0.5rem solid #09538e';
        }else if (i !== 0 && i % 5 === 0) {
            tableContent.style.borderTop='0.5rem solid #449ce3';
        }else {
            tableContent.style.borderTop = "1px solid rgba(0,0,0,0.1)";
        }
        if (i === dataSet.length - 1) {
            tableContent.style.borderBottom = "1px solid rgba(0,0,0,0.1)";
        }

        if (info) {
            const tableCheckBox = document.createElement('div');
            tableCheckBox.classList.add('mypage-table-checkbox');
            tableCheckBox.appendChild(makeInputCheckBox());
            tableContent.appendChild(tableCheckBox);
        }

        const tableRound = document.createElement('div');
        tableRound.classList.add('mypage-table-round');
        tableRound.textContent = round.toString();

        tableContent.appendChild(tableRound);

        const tableDate = document.createElement('div');
        tableDate.classList.add('mypage-table-date');
        tableDate.textContent = isoStringToDate(dataSet[i].date).slice(0, 10);

        tableContent.appendChild(tableDate);

        const tableDivision = document.createElement('div');
        tableDivision.classList.add('mypage-table-division');
        let division: string;
        switch (dataSet[i].tool) {
            case 'a': division = "무료";
            switch (dataSet[i].method) {
                case 'a': division += " 자동"
                    break;
                case 'm': division += " 수동"
                    break;
            }
                break;
            case 'b': division = "유료"
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
        tableNum.classList.add('mypage-table-num');

        const tableNumList = document.createElement('div');
        tableNumList.classList.add('mypage-table-num-list');

        let count = 0;
        for (let j = 0; j < dataSet[i].numbers.length; j++) {
            const div = document.createElement('div');
            div.textContent = dataSet[i].numbers[j].toString();
            if (answer && answer.numbers.some(item => Number(item) === dataSet[i].numbers[j])) {
                count++;
                setColorLotto(dataSet[i].numbers[j], div);
            } else {
                if (!answer) setColorLotto(dataSet[i].numbers[j], div);
                else setDisabledLotto(div);
            }

            tableNumList.appendChild(div);
        }

        tableNum.appendChild(tableNumList);
        tableContent.appendChild(tableNum);

        const tableIsWin = document.createElement('div');
        tableIsWin.classList.add('mypage-table-iswin');

        if (answer) {
            const winner = win(dataSet[i].numbers, count, answer);
            tableIsWin.textContent = winner > 0 ? winner + '등' : '-';
        } else {
            tableIsWin.textContent = '추첨전';
        }
        tableContent.appendChild(tableIsWin);

        canvas.appendChild(tableContent);

        if (info) {
            const infoTd = makePastFilterTable(dataSet[i]);
            canvas.appendChild(infoTd);
        }
    }
}

export function modifyTableBoundary(){
   const tableContent=document.querySelectorAll<HTMLElement>('.mypage-table-content');

   for(let i=0;i<tableContent.length;i++){
   if (i !== 0 && i % 10 === 0) {
    tableContent[i].style.borderTop='0.5rem solid #09538e';
}else if (i !== 0 && i % 5 === 0) {
    tableContent[i].style.borderTop='0.5rem solid #449ce3';
}else {
    tableContent[i].style.borderTop = "1px solid rgba(0,0,0,0.1)";
}
   }
    
}

export function win(numbers: number[], count: number, answer: { bonusNum: number }): number {
    if (numbers) {
        switch (count) {
            case 3://5등
                return 5;
            case 4://4등
                return 4;
            case 5:
                if (numbers.some(item => Number(answer.bonusNum) === item)) return 2;
                else return 3;
            case 6://1등
                return 1;
            default: return 0;
        }
    }
}

export function phoneString(phone: string) {
    const _phone = ('0' + phone.slice(3));
    return _phone.slice(0, 3) + '-' + _phone.slice(3, 7) + '-' + _phone.slice(7, 11);
}