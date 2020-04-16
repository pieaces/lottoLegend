
import configure from '../amplify/configure'
import ChartBase from '../system/premium/Chart/Charts';
import { getUnAuthAPI } from '../amplify/api';
import Swal from 'sweetalert2'
import Selectr, { IOptions } from 'mobius1-selectr';

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
//const round = document.getElementById('round');
const winner = document.getElementById('winner');
const winAmount = document.getElementById('winAmount');
const date = document.getElementById('date');
const rightBtn = document.getElementById('right-btn');
const leftBtn = document.getElementById('left-btn');
const stackInstance = new ChartBase('bar', stackCanvas, stackDataBox, stackOption);
const lottoNums = document.querySelectorAll<HTMLElement>('.lotto-num');
const statsValues = document.querySelectorAll('.stats-table tr >td:nth-child(2)');
const roundSelectBox = document.querySelector<HTMLSelectElement>('#round-selectbox');

getUnAuthAPI('/numbers/win')
    .then(data => {
        const max: number = data.round;
        stackInstance.create();
        write(data);

        const roundConfig: IOptions = {
            nativeDropdown:false,
            placeholder:'회차',
            data: []
        };
        for (let round = data.round; round >= 1; round--) {
            roundConfig.data.push({
                text: round, value: round
            });
        }
        Object.defineProperty(Selectr.prototype, 'mobileDevice', {
            get() { return false; },
            set() {},
            enumerable: true,
            configurable: true
        });
        const roundSelect = new Selectr(roundSelectBox, roundConfig);
        roundSelect.on('selectr.change', async (option) => {
            const data = await getUnAuthAPI('/numbers/win', { round: option.value });
            winBox.innerHTML = '';
            write(data);
        });

        rightBtn.addEventListener('click', async () => {
            const currentRound = Number(roundSelect.getValue());
            if (currentRound < max) {
                roundSelect.setValue((currentRound + 1).toString());
            } else {
                Swal.fire({
                    title: '마지막회차입니다.',
                    icon: 'info'
                });
            }
        });
        leftBtn.addEventListener('click', async () => {
            const currentRound = Number(roundSelect.getValue());
            if (0 < currentRound) {
                roundSelect.setValue((currentRound - 1).toString());
            } else {
                Swal.fire({
                    title: '첫회차입니다.',
                    icon: 'info'
                });
            }
        });
    });
const lottoNumTemp: HTMLElement[] = [];
function write(data: any) {
    //round.textContent = data.round;
    winner.textContent = data.winner;
    winAmount.textContent = Math.round(data.winAmount / 100000000).toString();
    date.textContent = data.date;
    const compart: number[] = new Array(5).fill(0);
    lottoNumTemp.forEach(lotto => {
        lotto.style.backgroundColor = ""
        lotto.style.color = "black";
    });
    for (let i = 0; i < 6; i++) {
        lottoNumTemp[i] = lottoNums[data.numbers[i] - 1];
        lottoNumTemp[i].style.backgroundColor = 'rgb(49, 49, 49)';
        lottoNumTemp[i].style.color = 'rgb(226, 226, 226)';
        const num = document.createElement('div');
        num.classList.add('win-num');
        num.textContent = data.numbers[i];
        const compartIndex = Math.floor((data.numbers[i] - 1) / 10);
        compart[compartIndex]++;
        num.style.backgroundColor = compartColor[compartIndex];
        winBox.appendChild(num);
    }
    stackInstance.dataBox.datasets.forEach((data, index) => data.data = [compart[index]]);
    stackInstance.update();
    const plus = document.createElement('div');
    plus.classList.add('plus');
    plus.textContent = '+';
    winBox.appendChild(plus);
    lottoNumTemp[6] = lottoNums[data.bonusNum - 1];
    lottoNumTemp[6].style.backgroundColor = 'yellow';
    lottoNumTemp[6].style.color = 'black';
    const bonus = document.createElement('div');
    bonus.classList.add('win-num');
    bonus.textContent = data.bonusNum;
    const compartIndex = Math.floor((data.bonusNum - 1) / 10);
    bonus.style.backgroundColor = compartColor[compartIndex];
    winBox.appendChild(bonus);
    statsValues[0].textContent = data.stats.excludedLineCount;
    statsValues[1].textContent = data.stats.carryCount;
    statsValues[2].textContent = data.stats.lowCount;
    statsValues[3].textContent = data.stats.sum;
    statsValues[4].textContent = data.stats.oddCount;
    statsValues[5].textContent = data.stats.primeCount;
    statsValues[6].textContent = data.stats['$3Count'];
    statsValues[7].textContent = data.stats['sum$10'];
    statsValues[8].textContent = data.stats.diffMaxMin;
    statsValues[9].textContent = data.stats.AC;
}
