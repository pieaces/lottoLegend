import Layout3 from './functional/Layout/Layout3'

const winNumBox = document.querySelector('.mypage-win-num');
const nickname = document.querySelector('#nickname');
const point = document.querySelector('#point');
const phoneNumber = document.querySelector('#phone-number');
const service = document.querySelector('#service');
const expiryDate = document.querySelector('#service-expiry-date');
const nicknameUpdateBtn = document.querySelector('#nickname-update');
const serviceUpdateBtn = document.querySelector('#service-update');
const rank = document.querySelector('rank');
const incNum = document.querySelector('#inc-num');
const excNum = document.querySelector('#exc-num');
const excNumTotal = document.querySelector('#exc-num-total');
const lottoRank = document.querySelector('#lotto-rank');
const numContainer = document.querySelector('.mypage-num-container');
const tableNumHeader = document.querySelector('.mypage-table-num tr:nth-child(1)');

nickname.textContent = "luckysso";
phoneNumber.textContent = "010-9524-2432";
service.textContent = "일반";
expiryDate.textContent = "20.12.31까지";
rank.classList.add('rank-first');
rank.textContent = '1';
point.textContent = "93점";
incNum.textContent = "2";
excNum.textContent = "13";
excNumTotal.textContent = "15";
lottoRank.textContent = "5";

function makeWinNum(numbers: number[]) {
    numbers.forEach((num) => {
        const div = document.createElement('div');
        div.textContent = num.toString();
        winNumBox.appendChild(div);
    })
}

function makeNum(numbers: number[][]) {

    for (let i = 0; i < numbers.length; i++) {
        const numBox = document.createElement('div');
        numBox.classList.add('mypage-num-box');
        for (let j = 0; j < numbers[i].length; j++) {
            const num = document.createElement('div');
            num.textContent = numbers[i][j].toString();
            Layout3.setColorLotto(numbers[i][j], num);
            numBox.appendChild(num);
        }
        numContainer.appendChild(numBox);
    }

}


function makeTable(dataSet: { numbers: number[] }[]) {

    for (let i = 0; i < dataSet.length; i++) {
        const tr = document.createElement('tr');
        tr.classList.add('mypage-table-num-list-box');

        const numberInfoMap = new Map([
            [0, dataSet[i]["round"]],
            [1, dataSet[i]["date"]],
            [2, dataSet[i]["auto"]],
            [3, dataSet[i]["isWin"]],
        ])

        numberInfoMap.forEach((value, key) => {
            if (key <= 2) {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            }
        })

        const tdNumList = document.createElement('td');
        const numBox = document.createElement('div');
        numBox.classList.add('mypage-table-num-list');

        for (let j = 0; j < dataSet[i].numbers.length; j++) {
            const num = document.createElement('div');
            num.textContent = dataSet[i].numbers[j].toString();
            Layout3.setColorLotto(dataSet[i].numbers[j], num);
            numBox.appendChild(num);
        }
        tdNumList.appendChild(numBox);
        tr.appendChild(tdNumList);

        const tdWin = document.createElement('td');
        tdWin.textContent = dataSet[i].isWin;
        tr.appendChild(tdWin);

        tableNumHeader.appendChild(tr);
    }

}


nicknameUpdateBtn.addEventListener('click', nicknameUpdate);
serviceUpdateBtn.addEventListener('click', serviceUpdate)

function nicknameUpdate() {

}

function serviceUpdate() {

}
