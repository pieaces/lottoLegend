import Layout3 from "./Layout3";
import LayoutToggle from "./LayoutToggle";
import DropDown from "../instanceBtns/DropDown";
import Checkbox from "../instanceBtns/CheckBox";
import NextBtn from "../instanceBtns/NextBtn";
import AutoBtn from "../instanceBtns/AutoBtn"
import ResetBtn from "../instanceBtns/ResetBtn";
import Layout1 from "./Layout1";
import Layout2 from "./Layout2";
import Swal from 'sweetalert2'
import SaveBtn, { Tool } from "../instanceBtns/SaveBtn";

const section = document.querySelector(".section1");
const infoText = document.querySelector<HTMLElement>(".checkbox-text");
const loading = document.querySelector<HTMLElement>('.loading-box');
const filteredCounterBox = document.querySelector<HTMLElement>('.extract-num');
const filteredCounter = document.getElementById('main-counter');
const filteredSubCounter = document.getElementById('sub-counter');

export interface IDataAPI {
    getStats2: () => any;
    getWinNums: () => number[][];
    getTOTAL: () => number;
    getCurrent: () => number;
    getPreviousName?: () => string;
    getLabels: () => string[];
    getNextName: () => string;
    getCurrentName?: () => string;
    getStats: () => any;
    forward: (option: any) => Promise<void>;
    leap: (page: number) => void;
    numbersData: any[];
    filterList: string[];
    SIZE: number;
    filteredCount: number;
    infoList: string[];
}
export default class Layout extends LayoutToggle(Layout3) {
    dropDown: DropDown;
    checkBox: Checkbox;
    nextBtn: NextBtn = new NextBtn();
    autoBtn: AutoBtn = new AutoBtn();
    resetBtn: ResetBtn = new ResetBtn();
    nextAbleLimit: number = 1;
    options: any[] = [];
    layout1: Layout1;
    layout2: Layout2;
    layout3: Layout3;

    constructor(dataAPI: IDataAPI) {
        super();
        this.dataAPI = dataAPI;
        this.layout1 = new Layout1();
        this.layout1.lineSlide.setDataAPI(dataAPI);
        this.layout1.barSlide.setDataAPI(dataAPI);
        this.layout1.bubbleChart.setDataAPI(dataAPI);
        this.checkBox = new Checkbox();
        this.checkBox.setDataAPI(this.dataAPI);
        this.layout2 = new Layout2(this.options, this.dataAPI.getStats2(), this.dataAPI.getWinNums(), this.dataAPI.getTOTAL());
        this.layout3 = new Layout3();
        this.dropDown = new DropDown();
        this.dropDown.setDataAPI(this.dataAPI);
    }
    private resetSlideNum() {
        const slideNum = document.querySelectorAll<HTMLElement>('.func1-chart-slide-num');
        Array.from(slideNum).forEach((node) => {
            Array.from(node.children).forEach((node, index) => {

                if (index === 0) {
                    node.classList.add('chart-slide-current');
                } else {
                    node.className = "";
                }
            })
        });
    }
    private setOption() {
        const currentFilter = this.dataAPI.getCurrent();
        switch (currentFilter) {
            case 3:
                this.options[currentFilter] = this.layout2.checkedNumbers.slice();
                break;
            case 4: case 5:
                this.options[currentFilter] = this.layout2.checkedNumbers.slice();
                if (currentFilter === 4) {
                    this.options[currentFilter].push(...this.options[3]);
                } else if (currentFilter === 5) {
                    const winNum: number[] = this.dataAPI.getWinNums()[0];
                    for (let i = 0; i < this.options[3].length; i++) {
                        const index = winNum.indexOf(this.options[3][i]);
                        if (index !== -1) {
                            winNum.splice(index, 1);
                        }
                    }
                    this.options[currentFilter].push(...winNum);
                }
                break;
            default:
                this.options[currentFilter] = this.checkBox.getCheckedLabels().slice();
                if (currentFilter === 1) {
                    const option: number[] = [];
                    this.options[currentFilter].forEach((value: boolean, index: number) => {
                        if (value) {
                            option.push(index);
                        }
                    });
                    this.options[currentFilter] = option;
                } else if (currentFilter === 6) {
                    this.options[currentFilter] = this.dataAPI.getLabels()[this.options[currentFilter].indexOf(true)];
                } else if (currentFilter === 7) {
                    const range = this.dataAPI.getLabels();
                    const list = [];
                    this.options[currentFilter].forEach((value: boolean, index: number) => {
                        if (value) {
                            if (typeof range[index] === 'string') {
                                const from = Number((<string>range[index]).slice(0, (<string>range[index]).indexOf('~')));
                                const to = Number((<string>range[index]).slice((<string>range[index]).indexOf('~') + 1));
                                list.push({ from, to });
                            } else list.push(range[index]);
                        }
                    });
                    this.options[currentFilter] = list;
                } else if (7 < currentFilter && currentFilter < this.dataAPI.SIZE - 1) {
                    const range = this.dataAPI.getLabels()
                    if (currentFilter === 12) {
                        const list = [];
                        this.options[currentFilter].forEach((value: boolean, index) => {
                            if (value) {
                                if (typeof range[index] === 'string') {
                                    const one = Number((<string>range[index]).slice(0, (<string>range[index]).indexOf('~')));
                                    const two = Number((<string>range[index]).slice((<string>range[index]).indexOf('~') + 1));
                                    list.push(one, two);
                                } else list.push(range[index]);
                            }
                        });
                        this.options[currentFilter] = list;
                    } else {
                        const list = [];
                        this.options[currentFilter].forEach((value: boolean, index) => {
                            if (value) list.push(range[index]);
                        });
                        this.options[currentFilter] = list;
                    }
                } else if (currentFilter === this.dataAPI.SIZE - 1) {
                    this.options[currentFilter] = this.options[currentFilter][0] ? false : true;
                }
        }
    }
    private async on() {
        const currentFilter = this.dataAPI.getCurrent();
        infoText.textContent = this.dataAPI.infoList[currentFilter];
        if (currentFilter > 7) {
            filteredCounterBox.classList.remove('hide');
            if (currentFilter > 8) {
                filteredSubCounter.textContent = (this.dataAPI.filteredCount - Number(filteredCounter.textContent)).toString();
            }
            filteredCounter.textContent = this.dataAPI.filteredCount.toString();
        } else {
            filteredCounterBox.classList.add('hide');
        }
        switch (currentFilter) {
            case 3: case 4: case 5:
                const numFreq = document.querySelector('.func2-num-freq');
                const numFreqTerm = document.querySelector('.func2-num-freq-term');

                this.layout2.reset();
                this.checkBox.removeAllEvent();
                if (currentFilter == 3) {
                    this.nextAbleLimit = this.options[currentFilter - 1].indexOf(true);
                    infoText.innerHTML = `전멸구간을 제외한 전회차 번호입니다. 이월될 수를 선택해주세요.(${this.nextAbleLimit}개) (나머지는 자동제외됩니다.)`;
                    if (this.nextAbleLimit === 0) {
                        this.dropDown.nodeList[currentFilter].textContent = '-';
                        this.options[currentFilter] = [];
                        await this.dataAPI.forward(this.options[currentFilter]);
                        infoText.innerHTML = this.dataAPI.infoList[currentFilter + 1];
                        this.layout2.includeVerson();
                    } else {
                        numFreq.classList.add('none');
                        numFreqTerm.classList.add('none');
                        this.layout2.includeVerson();
                        this.layout2.carryVersion();
                    }
                }
                else if (currentFilter === 4) {
                    numFreq.classList.remove('none');
                    numFreqTerm.classList.remove('none');
                    this.nextAbleLimit = 1;
                    this.layout2.includeVerson(5 - this.options[3].length);
                }
                else if (currentFilter === 5) {
                    numFreq.classList.remove('none');
                    numFreqTerm.classList.remove('none');
                    this.nextAbleLimit = 1;
                    this.layout2.excludeVersion(40);
                }
                this.layout2.setOpacity();
                this.layout2.refreshNumberBoard();
                this.layout2On();
                this.resetBtn.removeEvent();
                this.resetBtn.addEvent(this.layout2.resetConfirm.bind(this.layout2));
                break;
            case this.dataAPI.SIZE:
                this.layout3On(this.options);
                break;
            default:
                this.layout1On();
                this.checkBox.init();
                if (currentFilter === 0) {
                    this.dropDown.nodeList[currentFilter + 1].textContent = this.dataAPI.getNextName();
                    this.nextAbleLimit = 1;
                    this.checkBox.singleSelectEvent();
                } else if (currentFilter === 1) {
                    this.layout1.clearStatsBoard();
                    this.nextAbleLimit = this.options[currentFilter - 1].indexOf(true);
                    if (this.nextAbleLimit === 0) {
                        this.dropDown.nodeList[currentFilter].textContent = '-';
                        this.options[currentFilter] = [];
                        await this.dataAPI.forward(this.options[currentFilter]);
                        this.on();
                    } else if (this.nextAbleLimit === 1) {
                        this.checkBox.singleSelectEvent();
                    } else {
                        this.checkBox.multiSelectEvent(this.nextAbleLimit);
                    }
                } else if (currentFilter === 2) {
                    this.dropDown.nodeList[currentFilter + 1].textContent = this.dataAPI.getNextName();
                    this.nextAbleLimit = 1;
                    this.checkBox.singleSelectEvent();
                } else if (currentFilter <= 6) {
                    this.checkBox.singleSelectEvent();
                } else if (currentFilter === this.dataAPI.SIZE - 1) {
                    this.checkBox.singleSelectEvent();
                } else {
                    this.checkBox.multiSelectEvent();
                }
                this.resetBtn.removeEvent();
                this.resetBtn.addEvent(this.checkBox.reset.bind(this.checkBox));
                this.layout1.barSlide.init();
                this.layout1.lineSlide.init();
                this.layout1.bubbleChart.init();
                break;
        }
    }

    private async next(current: number) {
        loading.classList.remove('none');
        await this.dataAPI.forward(this.options[current]);
        if (this.dataAPI.getCurrent() < this.dataAPI.SIZE && this.dataAPI.numbersData) {
            Swal.fire({
                title: '현재 필터링된 번호가 50개이하입니다.',
                text: '남아있는 필터를 중단하고 생성페이지로 이동하시겠습니까?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '네',
                cancelButtonText: '아니요',
            }).then(async (result) => {
                if (result.value) this.layout3On(this.options);
            });
        }
        section.scrollIntoView({
            behavior: 'auto'
        });
        await this.on();
        loading.classList.add('none');
        this.checkBox.reset();
        this.dropDown.changeBoard();
        this.dropDown.changeDropDownColor();
        console.log(this.options);
    }
    init() {
        this.dropDown.init();
        this.dropDown.changeDropDownColor();
        this.dropDown.addEvent();
        this.checkBox.init();
        this.checkBox.singleSelectEvent();
        this.resetBtn.addEvent(this.checkBox.reset.bind(this.checkBox));
        this.layout1.barSlide.init();
        this.layout1.lineSlide.init();
        this.layout1.bubbleChart.init();
        this.layout2.init();
        infoText.textContent = this.dataAPI.infoList[0];
        this.layout1.setStatsBoard(this.dataAPI.getStats().stats);
        SaveBtn.init(Tool.charge);
        this.nextBtn.addEvent(async () => {
            const currentFilter = this.dataAPI.getCurrent();
            if (this.checkBox.getCount() >= this.nextAbleLimit ||
                currentFilter === 3 && this.layout2.checkedNumbers.length === this.nextAbleLimit ||
                currentFilter === 4 || currentFilter === 5) {

                this.setOption();
                this.next(currentFilter);
                this.resetSlideNum();
            } else {
                let alertMessage: string;
                if (currentFilter <= 6) alertMessage = `정확히 ${this.nextAbleLimit}개 선택해주세요`;
                if (currentFilter > 6) alertMessage = `최소 ${this.nextAbleLimit}개 이상 산텍헤주세요`;
                Swal.fire({
                    title: '알림',
                    text: alertMessage,
                    icon: 'info',
                })
            }
        });
        this.autoBtn.addEvent(async () => {
            const current = this.dataAPI.getCurrent();
            let index: number;
            let rand: number;
            let pos: number[];
            let temp: any;
            let set: Set<number>
            switch (current) {
                case 0:
                    rand = Math.random();
                    if (rand > 0.4) this.options[current] = [false, true, false, false, false];
                    else if (rand > 0.15) this.options[current] = [false, false, true, false, false];
                    else this.options[current] = [true, false, false, false, false];
                    break;
                case 1:
                    index = this.options[0].indexOf(true);
                    set = new Set<number>();
                    while (set.size < index) {
                        set.add(Math.floor(Math.random() * 5))
                    };
                    this.options[current] = Array.from(set);
                    this.options[current].sort((a: number, b: number) => a - b);
                    break;
                case 2:
                    console.log(this.checkBox.getCheckedLabels());
                    rand = Math.random();
                    if (rand > 0.5) this.options[current] = [false, true, false, false,];
                    else if (rand > 0.25) this.options[current] = [true, false, false, false];
                    else this.options[current] = [false, false, true, false];
                    break;
                case 3: case 4: case 5: break;
                case 6:
                    rand = Math.random();
                    index = Math.floor(rand * this.dataAPI.getLabels().length);
                    this.options[current] = this.dataAPI.getLabels()[index];
                    break;
                case this.dataAPI.SIZE - 1:
                    this.options[current] = true;
                    break;
                default:
                    index = 0;
                    pos = this.dataAPI.getStats().pos;
                    temp = pos[0]
                    for (let i = 1; i < pos.length; i++) {
                        if (temp < pos[i]) {
                            index = i; temp = pos[i];
                        }
                    }

                    const range = this.dataAPI.getLabels();
                    if (current === 7) {
                        this.options[current] = [];
                        const from = Number((<string>range[index]).slice(0, (<string>range[index]).indexOf('~')));
                        const to = Number((<string>range[index]).slice((<string>range[index]).indexOf('~') + 1));
                        this.options[current].push({ from, to });
                        rand = Math.random();
                        for (let i = 0; i < Math.floor(rand * pos.length / 2); i++) {
                            const index = Math.floor(Math.random() * pos.length);
                            const from = Number((<string>range[index]).slice(0, (<string>range[index]).indexOf('~')));
                            const to = Number((<string>range[index]).slice((<string>range[index]).indexOf('~') + 1));
                            let flag = true;
                            for (let j = 0; j < this.options[current].length; j++) {
                                if (this.options[current][j].from === from) {
                                    flag = false;
                                    break;
                                }
                            }
                            if (flag) this.options[current].push({ from, to });
                        }
                    } else if (current === 12) {
                        if (typeof range[index] === 'string') {
                            const one = Number((<string>range[index]).slice(0, (<string>range[index]).indexOf('~')));
                            const two = Number((<string>range[index]).slice((<string>range[index]).indexOf('~') + 1));
                            this.options[current] = [one, two];
                        } else this.options[current] = [range[index]];
                    } else {
                        this.options[current] = [range[index]];
                        rand = Math.random();
                        for (let i = 0; i < Math.floor(rand * pos.length); i++) {
                            const index = Math.floor(Math.random() * pos.length);
                            if (this.options[current].indexOf(range[index]) === -1) this.options[current].push(range[index]);
                        }
                    }
                    break;
            }
            this.next(current);
            this.resetSlideNum();
        });
        this.dropDown.nodeList.forEach((node, index) => {
            node.addEventListener('click', async () => {
                const current = this.dataAPI.getCurrent();
                if (index < current && node.textContent !== '-') {
                    Swal.fire({
                        title: '알림',
                        text: `'${this.dataAPI.filterList[index]}'(으)로 되돌아가시겠습니까?`,
                        icon: 'info',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '네',
                        cancelButtonText: '아니요',
                    }).then(async (result) => {
                        if (result.value) {
                            this.dataAPI.numbersData = null;

                            section.scrollIntoView({
                                behavior: 'auto'
                            });
                            for (let i = 0; i < current - index; i++) this.options.pop();
                            this.dataAPI.leap(index);
                            await this.on();
                            this.checkBox.reset();
                            this.dropDown.changeBoard();
                            this.dropDown.changeDropDownColor();
                        }
                    })

                }
            })
        });
        document.querySelector<HTMLElement>('.past').addEventListener('click', () => {
            if (this.dataAPI.getCurrent() > 0) {

            }
        })
    }
}