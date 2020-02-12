const lottoNumbers = document.querySelectorAll<HTMLElement>('.func2-lotto-num-box> div > div');
const numTermFreqBox = document.querySelectorAll<HTMLElement>('.func2-lotto-checkbox > div');
const selectNumBox = document.querySelector<HTMLElement>('.func2-select-num-box');
const applyBtn = document.querySelector('.func2-num-exclude-btn');
const winNums = document.querySelectorAll<HTMLElement>('.func2-win-num-box > div');

import bar from '../instance2/barInstance'
import gauss from '../instance2/gaussInstance'
import radar from '../instance2/radarInstance'
import radarSlide from '../instance2/radarSlide'
import DataAPI from '../DataAPI'
import Layout1 from './Layout1';
import RadarSlide from '../Slide/radarSlide';

export default class Layout2 extends Layout1 {
    radarSlide: RadarSlide = radarSlide;
    static readonly MAX_SIZE = 10;
    static lottoNumDefaultColor = '#00048c';
    static readonly lottoNumSelectColor = '#e6e600';
    static readonly lottoNumCheckedColor = 'darkgray';
    static readonly body = 'body *';
    static readonly numBoard = '.func2-main-1-4 *';
    static readonly lottoCheckCurrent = 'func2-lotto-check-current';
    static readonly selectNumBox = 'func2-select-num-box';
    private data: any;
    private TOTAL: number;
    private checkedNumbers = new Array<number>();
    private choice = null;
    private boardCurrent = 0;
    private frequencies:number[] = [];
    private terms:number[] = [];
    private freqTerm:number[] = [];
    includeVerson(){
        applyBtn.textContent = '포함'
        lottoNumbers.forEach((node: HTMLElement) => {
            node.style.backgroundColor = '#00048c';
        })
    }
    excludeVersion(){
        applyBtn.textContent = '제외'
        Layout2.lottoNumDefaultColor = '#8c0000';
        lottoNumbers.forEach((node: HTMLElement) => {
            node.style.backgroundColor = '#8c0000';
        })
    }
    private updateChart() {
        bar.dataBox.datasets[0].data = [this.TOTAL * 6 / 45, this.data.frequency[this.choice - 1]];
        radar.dataBox.datasets[0].data = this.data.interval[this.choice - 1].list;
        gauss.dataBox.datasets[0].data = this.data.emergence[this.choice - 1];
        bar.update();
        radar.update();
        gauss.update();
    }
    private cancelCheck() {
        let myExclusiveEl = Array.from(document.querySelectorAll<HTMLElement>(Layout2.body));
        let myEls = Array.from(document.querySelectorAll<HTMLElement>(Layout2.numBoard));

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
                    let opacities: number[];
                    switch(this.boardCurrent){
                        case 0: opacities = this.frequencies; break;
                        case 1: opacities = this.terms; break;
                        case 2: opacities = this.freqTerm; break;
                    }
                    lottoNumbers[this.choice - 1].style.opacity = `${opacities[this.choice-1]}`;
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
    private setColorWinNum() {
        winNums.forEach(node => {
            const nodeValue = parseInt(node.textContent);
            this.setColorLotto(nodeValue, node);
        });
    }
    private setOpacity(coef:number[]) {
        lottoNumbers.forEach((node, index) => {
            node.style.opacity = `${coef[index]}`;
        })
    }
    numFreqOrTermToggle() {
        numTermFreqBox.forEach((node: HTMLElement, index: number) => {
            node.addEventListener('click', () => {
                numTermFreqBox[this.boardCurrent].classList.remove(Layout2.lottoCheckCurrent);
                numTermFreqBox[index].classList.add(Layout2.lottoCheckCurrent);
                this.boardCurrent = index;
                if (this.boardCurrent === 0) this.setOpacity(this.frequencies);
                else if (this.boardCurrent === 1) this.setOpacity(this.terms);
                else if (this.boardCurrent === 2) this.setOpacity(this.freqTerm);
            })
        })
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
                        selectNumBox.children[this.checkedNumbers.length - 1].classList.remove(`${Layout2.selectNumBox}${this.checkedNumbers.length}`);
                        this.updateChart();

                        for (let i = 0; i < selectNumBox.children.length; i++) {
                            if (this.checkedNumbers.indexOf(nodeValue) !== -1) {
                                selectNumBox.children[this.checkedNumbers.indexOf(nodeValue)].textContent = '';
                                this.checkedNumbers.splice(this.checkedNumbers.indexOf(nodeValue), 1);
                                break;
                            }
                        }
                        for (let i = 0; i < selectNumBox.children.length; i++) {
                            if (this.checkedNumbers.length !== 0) {
                                selectNumBox.children[i].textContent = this.checkedNumbers[i].toString();
                            }
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

        applyBtn.addEventListener('click', e => {
            if (this.checkedNumbers.length < Layout2.MAX_SIZE) {
                if (this.checkedNumbers.indexOf(this.choice) === -1) {
                    if (this.choice !== null) {
                        lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumCheckedColor;
                        lottoNumbers[this.choice - 1].style.opacity = '';
                        this.checkedNumbers.push(this.choice);
                        const numOrder = this.checkedNumbers.indexOf(this.choice);

                        selectNumBox.children[numOrder].classList.add(
                            `${Layout2.selectNumBox}${numOrder + 1}`
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
    protected reset(){
        for (const node of Array.from(selectNumBox.children)) {
            node.textContent = '';
            (<HTMLElement>node).style.backgroundColor = '';
        }
        for (let i = 0; i < this.checkedNumbers.length; i++) {
            lottoNumbers[this.checkedNumbers[i] - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
            selectNumBox.children[i].classList.remove(`${Layout2.selectNumBox}${i + 1}`);
        }
        this.checkedNumbers.splice(0, this.checkedNumbers.length);
        if (this.choice !== null) {
            lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
            this.choice = null;
        }
    }
    protected resetConfirm(e: Event) {
        if (this.checkedNumbers.length > 0) {
            if (confirm(`선택번호를 모두 초기화하시겠습니까?`)) {
                this.reset();
            }
        }
        e.stopPropagation();
    }
    private initCoef() {
        const fMin = Math.min(...this.data.frequency);
        const terms = this.data.howLongNone.map(ele => this.TOTAL - ele.round + 1);
        const tMax = Math.max(...terms);
        for (let i = 0; i < 45; i++) {
            this.frequencies[i] = Math.pow(fMin, 2) / Math.pow(this.data.frequency[i], 2);
            this.terms[i] = Math.pow(terms[i], 1 / 3) / Math.pow(tMax, 1 / 3);
            this.freqTerm[i] = this.frequencies[i] * this.terms[i];
        }
        const ftMax = Math.max(...this.freqTerm);
        for (let i = 0; i < 45; i++) {
            this.freqTerm[i] /= ftMax;
        }
    }
    init() {
        this.data = DataAPI.getInstance().getStats2();
        this.TOTAL = DataAPI.getInstance().getTOTAL();
        this.initCoef();
        this.numFreqOrTermToggle();
        this.setColorWinNum();
        this.setOpacity(this.frequencies);
        this.addEvent();
    }
}