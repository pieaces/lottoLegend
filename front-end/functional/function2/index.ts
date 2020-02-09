const lottoNumbers = document.querySelectorAll<HTMLElement>('.func2-lotto-num-box> div > div');
const selectNumBox = document.querySelector<HTMLElement>('.func2-select-num-box');
const applyBtn = document.querySelector('.func2-num-exclude-btn');
const resetNumBtn = document.querySelector('#reset');
const winNums = document.querySelectorAll<HTMLElement>('.func2-win-num-box > div');
const numTerm = document.querySelector('.func2-num-term');
const numFreq = document.querySelector('.func2-num-freq');
import bar from './barInstance'
import gauss from './gaussInstance'
import radar from './radarInstance'
import DataAPI from '../DataAPI'

export default class Layout2 {
    static readonly MAX_SIZE = 10;
    static readonly lottoNumDefaultColor = 'rgba(231, 76, 60, 0.2)';
    static readonly lottoNumSelectColor = '#e6e600';
    static readonly lottoNumCheckedColor = 'darkgray';
    checkedNumbers = new Array<number>();
    choice = null;
    private updateChart() {
        const data = DataAPI.getInstance().getStats().data;
        const TOTAL = data.total;
        bar.dataBox.datasets[0].data = [TOTAL * 6 / 45, data.frequency[this.choice - 1]];
        radar.dataBox.datasets[0].data = data.interval[this.choice - 1].list;
        gauss.dataBox.datasets[0].data = data.emergence[this.choice - 1];
    }
    private cancelCheck() {
        let myExclusiveEl = Array.from(document.querySelectorAll<HTMLElement>('body *'));
        let myEls = Array.from(document.querySelectorAll<HTMLElement>('.main-1-3 *'));

        myExclusiveEl = myExclusiveEl.filter(parent => {
            let containedByExclusionNode = myEls.filter(child => {
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
                if (this.choice !== null) {
                    lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
                    this.choice = null;
                }
            });
        }
    }
    private setColorLotto(num: number, Box: HTMLElement) {
        if (1 <= num && num <= 10) {
            Box.style.backgroundColor = '#FBC400';
        } else if (num <= 20) {
            Box.style.backgroundColor = '#69C8F2';
        } else if (num <= 30) {
            Box.style.backgroundColor = '#FF7272';
        } else if (num <= 40) {
            Box.style.backgroundColor = '#AAAAAA';
        } else if (num <= 45) {
            Box.style.backgroundColor = '#B0D840';
        }
    }
    setColorWinNum() {
        winNums.forEach(node => {
            const nodeValue = parseInt(node.textContent);
            this.setColorLotto(nodeValue, node);
        });
    }
    numFreqOrTermToggle() {
        numTerm.addEventListener('click', () => {
            numTerm.classList.add('lotto-check-current');
            numFreq.classList.remove('lotto-check-current');
        });

        numFreq.addEventListener('click', () => {
            numFreq.classList.add('lotto-check-current');
            numTerm.classList.remove('lotto-check-current');
        });
    }

    addEvent() {
        lottoNumbers.forEach((node: HTMLElement) => {
            node.addEventListener('click', e => {
                const nodeValue = parseInt(node.textContent);
                if (this.checkedNumbers.indexOf(nodeValue) === -1) {
                    if (this.choice !== null) {
                        if (this.checkedNumbers.indexOf(this.choice) === -1) {
                            lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
                        }
                    }
                    this.choice = nodeValue;
                    node.style.backgroundColor = Layout2.lottoNumSelectColor;
                    this.updateChart();
                } else {
                    if (confirm(`번호 ${nodeValue} 선택취소하시겠습니까?`)) {
                        if (this.choice !== null) {
                            lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
                        }
                        this.choice = nodeValue;
                        node.style.backgroundColor = Layout2.lottoNumSelectColor;
                        selectNumBox.children[this.checkedNumbers.length - 1].classList.remove(`select-num-box${this.checkedNumbers.length}`);
                        this.updateChart();

                        for (let i = 0; i < selectNumBox.children.length; i++) {
                            if (this.checkedNumbers.indexOf(nodeValue) !== -1) {
                                selectNumBox.children[this.checkedNumbers.indexOf(nodeValue)].textContent = '';
                                this.checkedNumbers.splice(this.checkedNumbers.indexOf(nodeValue), 1);
                                break;
                            }
                        }
                        for (let i = 0; i < selectNumBox.children.length; i++) {
                            selectNumBox.children[i].textContent = this.checkedNumbers[i].toString();
                            (<HTMLElement>selectNumBox.children[i]).style.backgroundColor = '';
                        }
                        for (let i = 0; i < this.checkedNumbers.length; i++) {
                            this.setColorLotto(parseInt(selectNumBox.children[i].textContent), <HTMLElement>selectNumBox.children[i]);
                        }
                    } else {
                        lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
                        this.choice = null;
                    }
                }
                e.stopPropagation();
            });
        });
        resetNumBtn.addEventListener('click', e => {
            if (this.checkedNumbers.length > 0) {
                if (confirm(`선택번호를 모두 초기화하시겠습니까?`)) {
                    for (const node of Array.from(selectNumBox.children)) {
                        node.textContent = '';
                        (<HTMLElement>node).style.backgroundColor = '';
                    }
                    for (let i = 0; i < this.checkedNumbers.length; i++) {
                        lottoNumbers[this.checkedNumbers[i] - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
                        selectNumBox.children[i].classList.remove(`select-num-box${i + 1}`);
                    }
                    this.checkedNumbers.splice(0, this.checkedNumbers.length);
                    if (this.choice !== null) {
                        lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
                        this.choice = null;
                    }
                }
            }
            e.stopPropagation();
        });

        applyBtn.addEventListener('click', e => {
            if (this.checkedNumbers.length < Layout2.MAX_SIZE) {
                if (this.checkedNumbers.indexOf(this.choice) === -1) {
                    if (this.choice !== null) {
                        lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumCheckedColor;
                        this.checkedNumbers.push(this.choice);
                        const numOrder = this.checkedNumbers.indexOf(this.choice);
                        selectNumBox.children[numOrder].classList.add(
                            `select-num-box${numOrder + 1}`
                        );
                        selectNumBox.children[numOrder].textContent = this.choice;
                        this.setColorLotto(this.choice, <HTMLElement>selectNumBox.children[numOrder]);
                        this.choice = null;
                    }
                }
            } else {
                alert(`더 이상 번호를 제외할 수 없습니다(최대 개수:${Layout2.MAX_SIZE})`);
            }
            e.stopPropagation();
        });
        this.cancelCheck();
    }
    init() {
        this.numFreqOrTermToggle();
        this.setColorWinNum();
        this.addEvent();
    }
}