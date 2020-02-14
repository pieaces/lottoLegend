const lottoNumbers = document.querySelectorAll<HTMLElement>('.func2-lotto-num-box> div > div');
const numTermFreqBox = document.querySelectorAll<HTMLElement>('.func2-lotto-checkbox > div');
const lottoNumBox = document.querySelector<HTMLElement>('.lotto-num-box');
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
    static readonly lottoNumDefaultFontColor = 'white';
    static readonly lottoNumSelectFontColor = 'black';
    static readonly lottoNumCheckedColor = 'rgb(168, 168, 168)';
    static readonly lottoNumExcludedColor = 'rgb(234, 234, 234)';
    static readonly body = 'body *';
    static readonly numBoard = '.func2-main-1-4 *';
    static readonly lottoCheckCurrent = 'func2-lotto-check-current';
    protected checkedNumbers = new Array<number>();
    private choice = null;
    private boardCurrent = 0;
    private numbersEventList = [];
    private frequencies: number[] = [];
    private terms: number[] = [];
    private freqTerm: number[] = [];

    private initCoefVerInclude() {
        const fMin = Math.min(...DataAPI.getInstance().getStats2().frequency);
        const terms = DataAPI.getInstance().getStats2().howLongNone.map(ele => DataAPI.getInstance().getTOTAL() - ele.round + 1);
        const tMax = Math.max(...terms);
        for (let i = 0; i < 45; i++) {
            this.frequencies[i] = Math.pow(fMin, 2) / Math.pow(DataAPI.getInstance().getStats2().frequency[i], 2);
            this.terms[i] = Math.pow(terms[i], 1 / 3) / Math.pow(tMax, 1 / 3);
            this.freqTerm[i] = this.frequencies[i] * this.terms[i];
        }
        const ftMax = Math.max(...this.freqTerm);
        for (let i = 0; i < 45; i++) {
            this.freqTerm[i] /= ftMax;
        }
    }
    private initCoefVerExclude() {
        const fMax = Math.max(...DataAPI.getInstance().getStats2().frequency);
        const terms = DataAPI.getInstance().getStats2().howLongNone.map(ele => DataAPI.getInstance().getTOTAL() - ele.round + 1);
        const tMin = Math.min(...terms);
        for (let i = 0; i < 45; i++) {
            this.frequencies[i] = Math.pow(DataAPI.getInstance().getStats2().frequency[i], 2) / Math.pow(fMax, 2);
            this.terms[i] = Math.pow(tMin, 1 / 3) / Math.pow(terms[i], 1 / 3);
            this.freqTerm[i] = this.frequencies[i] * this.terms[i];
        }
        const ftMax = Math.max(...this.freqTerm);
        for (let i = 0; i < 45; i++) {
            this.freqTerm[i] /= ftMax;
        }
    }
    includeVerson() {
        this.clearChart();
        this.updateChart();
        this.initCoefVerInclude();
        applyBtn.textContent = '포함'
        Layout2.lottoNumDefaultColor = '#00048c';
        lottoNumbers.forEach((node: HTMLElement) => {
            node.style.backgroundColor = '#00048c';
        })
        gauss.dataBox.datasets[0].borderColor = '#3E3D55';
    }
    excludeVersion() {
        this.clearChart();
        this.updateChart();
        this.initCoefVerExclude();
        applyBtn.textContent = '제외'
        Layout2.lottoNumDefaultColor = '#8c0000';
        lottoNumbers.forEach((node: HTMLElement) => {
            node.style.backgroundColor = '#8c0000';
        })
        gauss.dataBox.datasets[0].borderColor = '#8c0000';
    }
    private updateChart() {
        bar.update();
        radar.update();
        gauss.update();
    }
    private updateChartData() {
        console.log(DataAPI.getInstance().getTOTAL())
        bar.dataBox.datasets[0].data = [DataAPI.getInstance().getStats2().frequency[this.choice - 1], DataAPI.getInstance().getTOTAL() * 6 / 45];
        radar.dataBox.datasets[0].data = DataAPI.getInstance().getStats2().interval[this.choice - 1].list;
        gauss.dataBox.datasets[0].data = DataAPI.getInstance().getStats2().emergence[this.choice - 1];
        this.updateChart();
    }
    private clearChart() {
        bar.clear();
        radar.clear();
        gauss.clear();
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
                    lottoNumbers[this.choice - 1].style.color = Layout2.lottoNumDefaultFontColor;
                    lottoNumbers[this.choice - 1].style.opacity = `${this.getOpacity(this.choice - 1)}`;
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
    private getOpacities(): number[] {
        let opacities: number[];
        switch (this.boardCurrent) {
            case 0: opacities = this.frequencies;
                break;
            case 1: opacities = this.terms;
                break;
            case 2: opacities = this.freqTerm;
                break;
        }
        return opacities;
    }
    setOpacity() {
        let opacities = this.getOpacities();
        lottoNumbers.forEach((node, index) => {
            if (!(this.options[1].indexOf(Math.floor((index + 1) / 10)) !== -1 || (this.options[3] && this.options[3].indexOf(index + 1) !== -1))) {
                node.style.opacity = `${opacities[index]}`;
            } else {
                node.classList.add('nopointer')
            }
        });
    }
    private getOpacity(index: number) {
        let opacities = this.getOpacities();
        return opacities[index];
    }
    numFreqOrTermToggle() {
        numTermFreqBox.forEach((node: HTMLElement, index: number) => {
            node.addEventListener('click', () => {
                numTermFreqBox[this.boardCurrent].classList.remove(Layout2.lottoCheckCurrent);
                numTermFreqBox[index].classList.add(Layout2.lottoCheckCurrent);
                this.boardCurrent = index;
                this.setOpacity();
            })
        })
    }
    addEvent() {
        applyBtn.addEventListener('click', e => {
            if (this.checkedNumbers.length < Layout2.MAX_SIZE) {
                if (this.checkedNumbers.indexOf(this.choice) === -1) {
                    if (this.choice !== null) {
                        lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumCheckedColor;
                        lottoNumbers[this.choice - 1].style.color = Layout2.lottoNumDefaultFontColor;
                        lottoNumbers[this.choice - 1].style.opacity = '';
                        this.checkedNumbers.push(this.choice);
                        const div = document.createElement('div');
                        const text = document.createTextNode(this.choice);
                        div.appendChild(text);
                        this.setColorLotto(this.choice, <HTMLElement>div);
                        selectNumBox.appendChild(div);
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
    protected reset() {
        for (const node of Array.from(selectNumBox.children)) {
            node.remove();
        }
        for (let i = 0; i < this.checkedNumbers.length; i++) {
            lottoNumbers[this.checkedNumbers[i] - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
        }
        this.setOpacity();
        this.checkedNumbers = [];
        if (this.choice !== null) {
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
    init() {
        bar.option.scales.yAxes[0].ticks = {
            min: Math.floor(Math.min(...DataAPI.getInstance().getStats2().frequency) / 10) * 10,
            max: Math.ceil(Math.max(...DataAPI.getInstance().getStats2().frequency) / 10) * 10
        };
        bar.create();
        this.numFreqOrTermToggle();
        this.setColorWinNum();
        this.addEvent();
    }

    refreshNumberBoard() {
        for (let i = 0; i < this.numbersEventList.length; i++) {
            lottoNumbers[i].removeEventListener('click', this.numbersEventList[i]);
        }
        lottoNumbers.forEach((node: HTMLElement, index) => {
            if (this.options[1].indexOf(Math.floor((index + 1) / 10)) !== -1 ||
            !this.options[3] && DataAPI.getInstance().getWinNums()[0].indexOf(index + 1) === -1 ||
            this.options[3] && DataAPI.getInstance().getWinNums()[0].indexOf(index + 1) !== -1 ||
            this.options[4] && (DataAPI.getInstance().getWinNums()[0].indexOf(index + 1) !== -1 || this.options[4].indexOf(index + 1) !== -1)) {
                node.style.backgroundColor = Layout2.lottoNumExcludedColor;
                node.style.color = Layout2.lottoNumDefaultFontColor;
                node.style.opacity = '';
                node.classList.add('nopointer');
            } else {
                const event = (e: Event) => {
                    selectEvent(this, node);
                    e.stopPropagation();
                };
                this.numbersEventList[index] = event;
                node.addEventListener('click', event);
                node.classList.remove('nopointer');
            }
        });
    }
}

function selectEvent(obj: any, node: HTMLElement) {
    const nodeValue = parseInt(node.textContent);
    if (obj.checkedNumbers.indexOf(nodeValue) === -1) { //선택한 번호가 박스에 있는 번호와 중복이 안될 때
        if (obj.choice !== null) { // 다른 곳에 선택한 번호가 있을 때(노란색)
            lottoNumbers[obj.choice - 1].style.opacity = obj.getOpacity(obj.choice - 1).toString();
            if (obj.checkedNumbers.indexOf(obj.choice) === -1) { // 선택한 번호가 박스에 있는 번호와 중복이 안될 때
                lottoNumbers[obj.choice - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
                lottoNumbers[obj.choice - 1].style.color = Layout2.lottoNumDefaultFontColor;
            }
        }
        // 처음에 선택할 때
        obj.choice = nodeValue;
        node.style.backgroundColor = Layout2.lottoNumSelectColor;
        node.style.color = Layout2.lottoNumSelectFontColor;
        //node.style.opacity = '';
        obj.updateChartData();
    } else { //선택한 번호가 박스에 있는 번호와 중복이 될 때
        if (confirm(`번호 ${nodeValue} 선택취소하시겠습니까?`)) {
            if (obj.choice !== null) {  // 다른 곳에 선택한 번호가 있을 때
                lottoNumbers[obj.choice - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
                lottoNumbers[obj.choice - 1].style.color = Layout2.lottoNumDefaultFontColor;
                lottoNumbers[obj.choice - 1].style.opacity = obj.getOpacity(obj.choice - 1).toString();

            } //없을 때
            obj.choice = nodeValue;
            node.style.backgroundColor = Layout2.lottoNumSelectColor;
            node.style.color = Layout2.lottoNumSelectFontColor;
            node.style.opacity = obj.getOpacity(obj.choice - 1).toString();

            obj.updateChartData();
            for (let i = 0; i < selectNumBox.children.length; i++) {
                if (obj.checkedNumbers.indexOf(nodeValue) !== -1) {
                    selectNumBox.children[obj.checkedNumbers.indexOf(nodeValue)].remove();
                    obj.checkedNumbers.splice(obj.checkedNumbers.indexOf(nodeValue), 1);
                    break;
                }
            }
            for (let i = 0; i < selectNumBox.children.length; i++) {
                selectNumBox.children[i].classList.add('animation-none');
            }
        } else {
            obj.choice = null;
        }
    }
}



