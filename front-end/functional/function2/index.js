
import { ChartBase } from '../Slide/Charts'
import DataAPI from '../DataAPI'


function numExclude() {
    const lottoNumbers = document.querySelectorAll('.lotto-num-box> div > div');
    const selectNumBox = document.querySelector('.select-num-box');
    const applyBtn = document.querySelector('.num-exclude-btn');
    const resetNumBtn = document.querySelector('.reset-num-btn');
    const winNum = document.querySelectorAll('.win-num-box > div');
    const numTerm = document.querySelector('.num-term');
    const numFreq = document.querySelector('.num-freq');
    function setColorLotto(choice, Box) {
        if (1 <= choice && choice <= 10) {
            Box.style.backgroundColor = '#FBC400';
        } else if (choice <= 20) {
            Box.style.backgroundColor = '#69C8F2';
        } else if (choice <= 30) {
            Box.style.backgroundColor = '#FF7272';
        } else if (choice <= 40) {
            Box.style.backgroundColor = '#AAAAAA';
        } else if (choice <= 45) {
            Box.style.backgroundColor = '#B0D840';
        }
    }

    function setColorWinNum() {
        for (const node of winNum) {
            const nodeValue = parseInt(node.textContent);
            setColorLotto(nodeValue, node);
        }
    }

    function numFreqOrTermToggle() {
        numTerm.addEventListener('click', () => {
            numTerm.classList.add('lotto-check-current');
            numFreq.classList.remove('lotto-check-current');
        });

        numFreq.addEventListener('click', () => {
            numFreq.classList.add('lotto-check-current');
            numTerm.classList.remove('lotto-check-current');
        });
    }

    const barCanvas = document.querySelector('.chart-func2-bar');
    const barDataBox = {
        labels: ['예측값', '실제값'],
        datasets: [
            {
                label: 'Ice Cream Sales ',
                fill: true,
                backgroundColor: ['moccasin', 'saddlebrown'],
                data: null
            }
        ]
    };
    const barOption = {
        legend: { display: false },
    };

    const bar = new ChartBase('bar', barCanvas, barDataBox, barOption);
    const gaussCanvas = document.querySelector('.chart-func2-gauss');
    const gaussDataBox = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].reverse(),
        datasets: [
            {
                steppedLine: true,
                borderColor: 'red',
                fill: false,
                data: null,
            }
        ]
    };
    const gaussOption = {
        responsive: true,
        legend: { display: false },
        title: {
            display: true,
            text: 'hi'
        }
    };
    const gauss = new ChartBase('line', gaussCanvas, gaussDataBox, gaussOption);
    const radarCanvas = document.querySelector('.chart-func2-radar');
    const radarDataBox = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        datasets: [
            {
                fill: true,
                borderWidth: 1,
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                data: null
            }
        ]
    };
    const radarOption = {
        responsive: false,
        title: {
            display: false
        },
        legend: {
            display: false
        }
    };

    const radar = new ChartBase('radar', radarCanvas, radarDataBox, radarOption);
    function updateChart() {
        const data = DataAPI.getInstance().getStats();
        const TOTAL = 897;

        bar.dataBox.datasets[0].data = [TOTAL * 6 / 45, data.frequency[choice - 1]];
        radar.dataBox.datasets[0].data = data.interval[choice - 1].list;
        gauss.dataBox.datasets[0].data = data.emergence[choice - 1];
        bar.update();
        radar.update();
        gauss.update();
    }
    const EXCLUDE_MAX = 10;
    const lottoNumDefaultColor = 'rgba(231, 76, 60, 0.2)';
    const lottoNumSelectColor = '#e6e600';
    const lottoNumExcludeColor = 'darkgray';
    const excludedNumbers = new Array();
    let choice = null;

    for (const node of lottoNumbers) {
        node.addEventListener('click', e => {
            const nodeValue = parseInt(node.textContent);
            if (excludedNumbers.indexOf(nodeValue) === -1) {
                if (choice !== null) {
                    if (excludedNumbers.indexOf(choice) === -1) {
                        lottoNumbers[choice - 1].style.backgroundColor = lottoNumDefaultColor;
                    }
                }
                choice = nodeValue;
                node.style.backgroundColor = lottoNumSelectColor;
                updateChart();
            } else {
                if (confirm(`번호 ${nodeValue} 선택취소하시겠습니까?`)) {
                    if (choice !== null) {
                        lottoNumbers[choice - 1].style.backgroundColor = lottoNumDefaultColor;
                    }
                    choice = nodeValue;
                    node.style.backgroundColor = lottoNumSelectColor;
                    selectNumBox.children[excludedNumbers.length - 1].classList.remove(`select-num-box${excludedNumbers.length}`);
                    updateChart();

                    for (let i = 0; i < selectNumBox.children.length; i++) {
                        if (excludedNumbers.indexOf(nodeValue) !== -1) {
                            selectNumBox.children[excludedNumbers.indexOf(nodeValue)].textContent = '';
                            excludedNumbers.splice(excludedNumbers.indexOf(nodeValue), 1);
                            break;
                        }
                    }
                    for (let i = 0; i < selectNumBox.children.length; i++) {
                        selectNumBox.children[i].textContent = excludedNumbers[i];
                        selectNumBox.children[i].style.backgroundColor = '';
                    }
                    for (let i = 0; i < excludedNumbers.length; i++) {
                        setColorLotto(parseInt(selectNumBox.children[i].textContent), selectNumBox.children[i]);
                    }
                } else {
                    lottoNumbers[choice - 1].style.backgroundColor = lottoNumDefaultColor;
                    choice = null;
                }
            }
            e.stopPropagation();
        });
    }

    resetNumBtn.addEventListener('click', e => {
        if (excludedNumbers.length > 0) {
            if (confirm(`선택번호를 모두 초기화하시겠습니까?`)) {
                for (const node of [...selectNumBox.children]) {
                    node.textContent = '';
                    node.style.backgroundColor = '';
                }
                for (let i = 0; i < excludedNumbers.length; i++) {
                    lottoNumbers[excludedNumbers[i] - 1].style.backgroundColor = lottoNumDefaultColor;
                    selectNumBox.children[i].classList.remove(`select-num-box${i + 1}`);
                }
                excludedNumbers.splice(0, excludedNumbers.length);
                if (choice !== null) {
                    lottoNumbers[choice - 1].style.backgroundColor = lottoNumDefaultColor;
                    choice = null;
                }
            }
        }
        e.stopPropagation();
    });

    applyBtn.addEventListener('click', e => {
        if (excludedNumbers.length < EXCLUDE_MAX) {
            if (excludedNumbers.indexOf(choice) === -1) {
                if (choice !== null) {
                    lottoNumbers[choice - 1].style.backgroundColor = lottoNumExcludeColor;
                    excludedNumbers.push(choice);
                    const numOrder = excludedNumbers.indexOf(choice);
                    selectNumBox.children[numOrder].classList.add(
                        `select-num-box${numOrder + 1}`
                    );
                    selectNumBox.children[numOrder].textContent = choice;
                    setColorLotto(choice, selectNumBox.children[numOrder]);
                    choice = null;
                }
            }
        } else {
            alert(`더 이상 번호를 제외할 수 없습니다(최대 개수:${EXCLUDE_MAX})`);
        }
        e.stopPropagation();
    });

    let myExclusiveEl = document.querySelectorAll('body *');
    let myEls = document.querySelectorAll('.main-1-3 *');

    myExclusiveEl = [...myExclusiveEl].filter(parent => {
        let containedByExclusionNode = [...myEls].filter(child => {
            if (parent === child) {
                return true;
            } else {
                return false;
            }
        });
        if (containedByExclusionNode.length === 0) {
            return true;
        } else {
            return false;
        }
    });

    for (const node of myExclusiveEl) {
        node.addEventListener('click', e => {
            if (choice !== null) {
                lottoNumbers[choice - 1].style.backgroundColor = lottoNumDefaultColor;
                choice = null;
            }
        });
    }

    numFreqOrTermToggle();
    setColorWinNum();
}
export default function function2() {
    numExclude();
}