import Swal from 'sweetalert2'
import bar from '../instance2/barInstance'
import gauss from '../instance2/gaussInstance'
import radar from '../instance2/radarInstance'
import { makeModal, rangeMake, setColorLotto } from '../../../functions';

const lottoNumbers = document.querySelectorAll<HTMLElement>('.func2-lotto-num');
const numTermFreqBox = document.querySelectorAll<HTMLElement>('.func2-lotto-checkbox');
const selectNumBox = document.querySelector<HTMLElement>('.func2-select-num-box');
const applyBtn = document.querySelector('#func2-num-inc-exc-btn');
const winNumContainerBox = document.querySelector('.func2-win-num-container-box');

const mean = document.querySelector<HTMLElement>('.stats-mean-value');
const $68 = document.querySelector<HTMLElement>('.stats-68-value');
const $95 = document.querySelector<HTMLElement>('.stats-95-value');
const last = document.querySelector<HTMLElement>('.stats-last-value');

type Version = 'include' | 'exclude' | 'carry';
const carryInfo =
    `<span style="font-size: 1.4rem;font-weight: 400;color: #bdbdbd;">*움직여보세요.</span>
우리의 모티브는 아래와 같습니다.
"수백회차가 진행되는 동안, 출현했던 번호만 계속 나온다면,
<span style="color:black;font-weight:bold;">큰수'법칙'</span>은 충족되지 않을것입니다."

흔히 <span style="color:blue">콜드수</span>라 불리는 로또용어가 있는데,
이는 <span style="color:blue">최근 미출현 번호</span>를 의미합니다.
기존에는 이것을 숫자로 분리표현하여 종합적으로 보기 힘들었습니다.
우리는 이를 <span style="color:black;font-weight:bold;">농도</span>로 표현함으로써 <span style="color:black;font-weight:bold;">종합적이고 직관적 판단</span>이 가능해졌습니다.

*<span style="color:blue;font-weight:bold;">번호빈도</span>: 엄밀한 수학적 예상값을 채우지 못할수록 진하게 표현하였습니다.
확률적 값에 비해 <span style="color:black;"><U>적게 출현할수록 진하고, 많이 출현할수록 옅습니다.</U></span>`;
const includeInfo =
    `<span style="font-size: 1.4rem;font-weight: 400;color: #bdbdbd;">*움직여보세요.</span>
우리의 모티브는 아래와 같습니다.
"수백회차가 진행되는 동안, 출현했던 번호만 계속 나온다면,
<span style="color:black;font-weight:bold;">큰수'법칙'</span>은 충족되지 않을것입니다."

흔히 <span style="color:blue">콜드수</span>라 불리는 로또용어가 있는데,
이는 <span style="color:blue">최근 미출현 번호</span>를 의미합니다.
기존에는 이것을 숫자로 분리표현하여 종합적으로 보기 힘들었습니다.
우리는 이를 <span style="color:black;font-weight:bold;">농도</span>로 표현함으로써 <span style="color:black;font-weight:bold;">종합적이고 직관적 판단</span>이 가능해졌습니다.

*<span style="color:blue;font-weight:bold;">번호빈도</span>: 엄밀한 수학적 예상값을 채우지 못할수록 진하게 표현하였습니다.
확률적 값에 비해 <span style="color:black;"><U>적게 출현할수록 진하고, 많이 출현할수록 옅습니다.</U></span>

*<span style="color:blue;font-weight:bold;">번호간격</span>: 마지막 출현회차가 오래될수록 진하게 표현하였습니다.
마지막 출현회차가 <span style="color:black;"><U>오래전일수록 진하고, 최근일수록 옅습니다.</U></span>

*<span style="color:blue;font-weight:bold;">빈도X간격</span>: 빈도의 계수(고유한수치)와 간격의 계수를 산술처리로 종합하였습니다.`;
const excludeInfo =
    `<span style="font-size: 1.4rem;font-weight: 400;color: #bdbdbd;">*움직여보세요.</span>
우리의 모티브는 아래와 같습니다.
"수백회차가 진행되는 동안, 출현했던 번호만 계속 나온다면,
<span style="color:black;font-weight:bold;">큰수'법칙'</span>은 충족되지 않을것입니다."

흔히 <span style="color:red">핫수</span>라 불리는 로또용어가 있는데,
이는 <span style="color:red">최근 출현 번호</span>를 의미합니다.
기존에는 이것을 숫자로 분리표현하여 종합적으로 보기 힘들었습니다.
우리는 이를 <span style="color:black;font-weight:bold;">농도</span>로 표현함으로써 <span style="color:black;font-weight:bold;">종합적이고 직관적 판단</span>이 가능해졌습니다.

*<span style="color:red;font-weight:bold;">번호빈도</span>: 엄밀한 수학적 예상값을 넘어갈수록 진하게 표현하였습니다.
확률적 값에 비해 <span style="color:black;"><U>많이 출현할수록 진하고, 적게 출현할수록 옅습니다.</U></span>

*<span style="color:red;font-weight:bold;">번호간격</span>: 마지막 출현회차가 최근일수록 진하게 표현하였습니다.
마지막 출현회차가 <span style="color:black;"><U>최근일수록 진하고, 오래 전이었을수록 옅습니다.</U></span>

*<span style="color:red;font-weight:bold;">빈도X간격</span>: 빈도의 계수(고유한수치)와 간격의 계수를 산술처리로 종합하였습니다.`;
export default class Layout2 {
    private limit = 40;
    static lottoNumDefaultColor = '#00048c';
    static readonly lottoNumSelectColor = '#e6e600';
    static readonly lottoNumDefaultFontColor = 'white';
    static readonly lottoNumSelectFontColor = 'black';
    static readonly lottoNumCheckedColor = 'rgb(49, 49, 49)';
    static readonly lottoNumExcludedColor = 'rgb(234, 234, 234)';
    static readonly numBoard = '.func2-lotto-num-container';
    static readonly lottoCheckCurrent = 'func2-lotto-check-current';
    public checkedNumbers = new Array<number>();
    private choice = null;
    private boardCurrent = 0;
    private numbersEventList = [];
    private frequencies: number[] = [];
    private terms: number[] = [];
    private freqTerm: number[] = [];
    protected layout2Data: any;
    protected total: number;
    protected winNumbers: number[][];
    public options: any[];
    private version: Version = 'include';
    constructor(options: any[], data: any, winNumbers: number[][], total: number) {
        this.options = options;
        this.layout2Data = data;
        this.winNumbers = winNumbers;
        this.total = total;
    }

    private initCoefVerInclude() {
        const fMin = Math.min(...this.layout2Data.frequency);
        const terms = this.layout2Data.howLongNone.map(ele => this.total - ele.round + 1);
        const tMax = Math.max(...terms);
        for (let i = 0; i < 45; i++) {
            this.frequencies[i] = Math.pow(fMin, 2) / Math.pow(this.layout2Data.frequency[i], 2);
            this.terms[i] = Math.pow(terms[i], 1 / 3) / Math.pow(tMax, 1 / 3);
            this.freqTerm[i] = this.frequencies[i] * this.terms[i];
        }
        const ftMax = Math.max(...this.freqTerm);
        for (let i = 0; i < 45; i++) {
            this.freqTerm[i] /= ftMax;
        }
    }
    private initCoefVerExclude() {
        const fMax = Math.max(...this.layout2Data.frequency);
        const terms = this.layout2Data.howLongNone.map(ele => this.total - ele.round + 1);
        const tMin = Math.min(...terms);
        for (let i = 0; i < 45; i++) {
            this.frequencies[i] = Math.pow(this.layout2Data.frequency[i], 2) / Math.pow(fMax, 2);
            this.terms[i] = Math.pow(tMin, 1 / 3) / Math.pow(terms[i], 1 / 3);
            this.freqTerm[i] = this.frequencies[i] * this.terms[i];
        }
        const ftMax = Math.max(...this.freqTerm);
        for (let i = 0; i < 45; i++) {
            this.freqTerm[i] /= ftMax;
        }
    }
    carryVersion() {
        this.version = 'carry';
    }
    includeVerson(limit?: number) {
        if (limit) this.limit = limit;
        this.version = 'include';
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
    excludeVersion(limit?: number) {
        if (limit) this.limit = limit;
        this.version = 'exclude';
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
        const stats = this.layout2Data.interval[this.choice - 1].stats;
        mean.textContent = (stats.mean).toFixed(2);
        $68.textContent = rangeMake(stats, 1, 1);
        $95.textContent = rangeMake(stats, 2, 1);
        last.innerHTML = `${this.layout2Data.howLongNone[this.choice - 1].round}회</br>${this.layout2Data.howLongNone[this.choice - 1].date.slice(2)}`
        bar.dataBox.datasets[0].data = [this.layout2Data.frequency[this.choice - 1], this.total * 6 / 45];
        radar.dataBox.datasets[0].data = this.layout2Data.interval[this.choice - 1].list;
        gauss.dataBox.datasets[0].data = this.layout2Data.emergence[this.choice - 1];
        const temp: string[] = [];
        const total = this.total;
        for (let i = 11; i >= 0; i--)temp.push((total - i).toString());
        gauss.dataBox.labels = temp;
        this.updateChart();
    }
    private clearChart() {
        bar.clear();
        radar.clear();
        gauss.clear();
    }
    private cancelCheck() {
        let flag = false;
        document.addEventListener('click', () => {
            if (!flag) {
                //target 다른 곳
                if (this.choice !== null) {
                    lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
                    lottoNumbers[this.choice - 1].style.color = Layout2.lottoNumDefaultFontColor;
                    lottoNumbers[this.choice - 1].style.opacity = `${this.getOpacity(this.choice - 1)}`;
                    this.choice = null;
                }
            }
            flag = false;
        })
        document.querySelector(Layout2.numBoard).addEventListener('click', () => {
            //target
            flag = true;
        })
    }
    private doesExcluded(index: number): boolean {
        if (this.checkedNumbers.indexOf(index + 1) !== -1 ||
            this.options[1] && this.options[1].indexOf(Math.floor((index + 1) / 10)) !== -1 || //전멸구간
            !this.options[3] && this.winNumbers[0].indexOf(index + 1) === -1 || //이월수만 포함하라.
            this.options[3] && typeof this.options[3] === 'object' && this.winNumbers[0].indexOf(index + 1) !== -1 || //이월수는 제외하라
            this.options[4] && (this.winNumbers[0].indexOf(index + 1) !== -1 || this.options[4].indexOf(index + 1) !== -1) ||
            this.options[5] && this.options[5].indexOf(index + 1) !== -1) { //포함수
            return true;
        } else {
            return false;
        }
    }
    private setColorWinNum() {
        const winNums = document.querySelectorAll<HTMLElement>('.func2-win-num-box > div');
        winNums.forEach(node => {
            const nodeValue = parseInt(node.textContent);
            setColorLotto(nodeValue, node);
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
            if (this.doesExcluded(index)) {
                node.classList.add('nopointer');
            } else {
                node.style.opacity = `${opacities[index]}`;
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
    private select() {
        if (this.checkedNumbers.length < this.limit) {
            if (this.checkedNumbers.indexOf(this.choice) === -1) {
                if (this.choice !== null) {
                    lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumCheckedColor;
                    lottoNumbers[this.choice - 1].style.color = Layout2.lottoNumDefaultFontColor;
                    lottoNumbers[this.choice - 1].style.opacity = '';
                    this.checkedNumbers.push(this.choice);
                    const selectNum = document.createElement('div');
                    selectNum.classList.add('func2-select-num');
                    const div = document.createElement('div');

                    const text = document.createTextNode(this.choice);
                    div.appendChild(text);
                    setColorLotto(this.choice, <HTMLElement>div);
                    selectNum.appendChild(div);

                    selectNumBox.appendChild(selectNum);
                    this.choice = null;
                }
            }
        } else {
            Swal.fire({
                title: '더이상 입력할 수 없습니다.',
                text: `최대개수: ${this.limit}`,
                icon: 'info',
            });
        }
    }
    addEvent() {
        applyBtn.addEventListener('click', e => {
            this.select();
            e.stopPropagation();
        });
        this.cancelCheck();
    }
    selectEvent(node: HTMLElement) {
        const nodeValue = parseInt(node.textContent);
        if (this.checkedNumbers.indexOf(nodeValue) === -1) { //선택번호가 제외번호가 아닐때,
            if (this.choice === nodeValue) {
                this.select();
            } else {
                if (this.choice) {
                    lottoNumbers[this.choice - 1].style.opacity = this.getOpacity(this.choice - 1).toString();
                    if (this.checkedNumbers.indexOf(this.choice) === -1) { // 그전에 선택한 번호가 제외된 번호가 아닐때
                        lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
                        lottoNumbers[this.choice - 1].style.color = Layout2.lottoNumDefaultFontColor;
                    }
                }
                this.choice = nodeValue;
                node.style.backgroundColor = Layout2.lottoNumSelectColor;
                node.style.color = Layout2.lottoNumSelectFontColor;
                this.updateChartData();
            }
        } else { //선택한 번호가 이미 제외된 번호일 때,
            Swal.fire({
                title: '알림',
                text: '선택취소하시겠어요?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '네',
                cancelButtonText: '아니요',
            }).then(async (result) => {
                if (result.value) {
                    if (this.choice !== null) {  // 그전에 선택한 적이 있을 때
                        lottoNumbers[this.choice - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
                        lottoNumbers[this.choice - 1].style.color = Layout2.lottoNumDefaultFontColor;
                        lottoNumbers[this.choice - 1].style.opacity = this.getOpacity(this.choice - 1).toString();
                    }
                    this.choice = nodeValue;
                    node.style.backgroundColor = Layout2.lottoNumSelectColor;
                    node.style.color = Layout2.lottoNumSelectFontColor;
                    node.style.opacity = this.getOpacity(this.choice - 1).toString();

                    this.updateChartData();
                    for (let i = 0; i < selectNumBox.children.length; i++) {
                        if (this.checkedNumbers.indexOf(nodeValue) !== -1) {
                            selectNumBox.children[this.checkedNumbers.indexOf(nodeValue)].remove();
                            this.checkedNumbers.splice(this.checkedNumbers.indexOf(nodeValue), 1);
                            break;
                        }
                    }
                } else {
                    this.choice = null;
                }
            });
        }
    }
    public reset() {
        mean.textContent = "";
        $68.textContent = "";
        $95.textContent = "";
        last.textContent = "";
        for (const node of Array.from(selectNumBox.children)) {
            node.remove();
        }
        for (let i = 0; i < this.checkedNumbers.length; i++) {
            lottoNumbers[this.checkedNumbers[i] - 1].style.backgroundColor = Layout2.lottoNumDefaultColor;
        }
        this.checkedNumbers = [];
        this.setOpacity();
        if (this.choice !== null) {
            this.choice = null;
        }
    }
    public resetConfirm(e: Event) {
        if (this.checkedNumbers.length > 0) {
            Swal.fire({
                title: '알림',
                text: '입력하신 번호를 초기화할까요?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '네',
                cancelButtonText: '아니요',
            }).then(result => {
                if (result.value) this.reset();
            })
        }
        e.stopPropagation();
    }
    init() {
        bar.option.scales.yAxes[0].ticks = {
            min: Math.floor(Math.min(...this.layout2Data.frequency) / 10) * 10,
            max: Math.ceil(Math.max(...this.layout2Data.frequency) / 10) * 10
        };
        makeWinNum(this.winNumbers, this.total);
        bar.create();
        this.numFreqOrTermToggle();
        this.setColorWinNum();
        this.addEvent();
        document.querySelector<HTMLElement>('.func2-numboard-que').addEventListener('click', () => {
            if (this.version === 'include') makeModal(includeInfo, 55);
            else if (this.version === 'exclude') makeModal(excludeInfo, 55);
            else makeModal(carryInfo, 55);
        });
        document.querySelector<HTMLElement>('.func2-radar-que').addEventListener('click', () => {
            const radarInfo =
                `<span style="font-size: 1.4rem;font-weight: 400;color: #bdbdbd;">*움직여보세요.</span>
우리의 모티브는 아래와 같습니다.
"수백회차가 진행되는 동안, 출현했던 번호만 계속 나온다면,
<span style="color:black;font-weight:bold;">큰수'법칙'</span>은 충족되지 않을것입니다."

전체 회차에 대한 번호별 출현간격은
레이더차트를 이용해 12간격까지 나타내었습니다.
그리고 그밖의 데이터를 표로 나타내었습니다.
여기서 전체 68%의 간격, 95%의 간격이라 함은,
말 그대로 전체회차의 68%, 95%에서 택하신 번호의 간격이
해당 범위 안에 포함되었음을 뜻합니다.`
            makeModal(radarInfo, 50);
        })
    }

    refreshNumberBoard() {
        for (let i = 0; i < this.numbersEventList.length; i++) {
            lottoNumbers[i].removeEventListener('click', this.numbersEventList[i]);
        }
        lottoNumbers.forEach((node, index) => {
            if (this.doesExcluded(index)) {
                node.style.backgroundColor = Layout2.lottoNumExcludedColor;
                node.style.color = Layout2.lottoNumDefaultFontColor;
                node.style.opacity = '';
                node.classList.add('nopointer');
            } else {
                const event = (e: Event) => {
                    this.selectEvent(node);
                    e.stopPropagation();
                };
                this.numbersEventList[index] = event;
                node.addEventListener('click', event);
                node.classList.remove('nopointer');
            }
        });
    }
}

function makeWinNum(winNumArr: number[][], total: number) {
    for (let i = 0; i < winNumArr.length; i++) {
        const winNumContainer = document.createElement('div');
        winNumContainer.classList.add('func2-win-num-container');

        const winNumTimes = document.createElement('div');
        winNumTimes.classList.add('func2-win-num-times');
        winNumTimes.textContent = total.toString();
        total--;
        winNumContainer.appendChild(winNumTimes);

        const winNumBox = document.createElement('div');
        winNumBox.classList.add('func2-win-num-box');

        for (let j = 0; j < winNumArr[i].length; j++) {
            const winNum = document.createElement('div');
            winNum.textContent = winNumArr[i][j].toString();
            winNumBox.appendChild(winNum);
        }

        winNumContainer.appendChild(winNumBox);
        winNumContainerBox.appendChild(winNumContainer);
    }
}