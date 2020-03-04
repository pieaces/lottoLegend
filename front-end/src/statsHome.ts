
import configure from './amplify/configure'
import ChartBase from './functional/Chart/Charts';
import { getUnAuthAPI } from './amplify/api';
import Swal from 'sweetalert2'

configure();
const compartColor = ['#FBC400', '#69C8F2', '#FF7272', '#AAAAAA', '#B0D840'];

const stackCanvas: HTMLCanvasElement = document.querySelector('.stack-chart');
const stackDataBox = {
    labels: ['구간별 출현횟수'],
    datasets: [
        {
            label: '1번대',
            backgroundColor: compartColor[0],
            data: null
        },
        {
            label: '10번대',
            backgroundColor: compartColor[1],
            data: null
        },
        {
            label: '20번대',
            backgroundColor: compartColor[2],
            data: null
        },
        {
            label: '30번대',
            backgroundColor: compartColor[3],
            data: null
        },
        {
            label: '40번대',
            backgroundColor: compartColor[4],
            data: null
        }
    ]
};

const stackOption: Chart.ChartOptions = {
    legend: { display: false },
    tooltips: {
        mode: 'index',
        intersect: false
    },
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
            stacked: true,
        }],
        yAxes: [{
            stacked: true
        }]
    }
};

const winBox = document.querySelector<HTMLElement>('.win-num-box');
const round = document.getElementById('round');
const winner = document.getElementById('winner');
const winAmount = document.getElementById('winAmount');
const date = document.getElementById('date');
const rightBtn = document.getElementById('right-btn');
const leftBtn = document.getElementById('left-btn');
const stackInstance = new ChartBase('bar', stackCanvas, stackDataBox, stackOption);
const lottoNums = document.querySelectorAll<HTMLElement>('.lotto-num');

getUnAuthAPI('/numbers/win')
    .then(data => {
        const max: number = data.round;
        stackInstance.create();
        write(data);
        rightBtn.addEventListener('click', async () => {
            const currentRound = Number(round.textContent);
            if (currentRound < max) {
                const data = await getUnAuthAPI('/numbers/win', { round: currentRound + 1 });
                winBox.innerHTML = '';
                write(data);
            } else {
                Swal.fire({
                    title:'마지막회차입니다.',
                    icon:'info'
                });
            }
        });
        leftBtn.addEventListener('click', async () => {
            const currentRound = Number(round.textContent);
            if (0 < currentRound) {
                const data = await getUnAuthAPI('/numbers/win', { round: currentRound - 1 });
                winBox.innerHTML = '';
                write(data);
            } else {
                Swal.fire({
                    title:'첫회차입니다.',
                    icon:'info'
                });
            }
        });
    });
const lottoNumTemp:HTMLElement[] = [];
function write(data: any) {
    round.textContent = data.round;
    winner.textContent = data.winner;
    winAmount.textContent = Math.round(data.winAmount / 100000000).toString();
    date.textContent = data.date;
    const compart:number[] = new Array(5).fill(0);
    for (let i = 0; i < 6; i++) {
        lottoNumTemp[i] && (lottoNumTemp[i].style.background = "");
        lottoNumTemp[i] = lottoNums[data.numbers[i]-1];
        lottoNumTemp[i].style.background = '#000000e3';
        const num = document.createElement('div');
        num.classList.add('win-num');
        num.textContent = data.numbers[i];
        const compartIndex = Math.floor((data.numbers[i]-1) /10);
        compart[compartIndex]++;
        num.style.background = compartColor[compartIndex];
        winBox.appendChild(num);
    }
    stackInstance.dataBox.datasets.forEach((data,index) => data.data=[compart[index]]);
    stackInstance.update();
    const plus = document.createElement('div');
    plus.classList.add('plus');
    plus.textContent = '+';
    winBox.appendChild(plus);
    lottoNumTemp[6] && (lottoNumTemp[6].style.background = "");
    lottoNumTemp[6] = lottoNums[data.bonusNum-1];
    lottoNumTemp[6].style.background = 'yellow';
    const bonus = document.createElement('div');
    bonus.classList.add('win-num');
    bonus.textContent = data.bonusNum;
    const compartIndex = Math.floor((data.bonusNum-1) /10);
    bonus.style.background = compartColor[compartIndex];
    winBox.appendChild(bonus);
}