import Layout3 from "./Layout3";
import LayoutToggle from "./LayoutToggle";
import DataAPI from "../DataAPI";
import DropDown from "../instanceBtns/DropDown";
import Checkbox from "../instanceBtns/CheckBox";
import NextBtn from "../instanceBtns/NextBtn";
import AutoBtn from "../instanceBtns/AutoBtn"
import ResetBtn from "../instanceBtns/ResetBtn";
import Question from "../Question"
import Layout1 from "./Layout1";
import Layout2 from "./Layout2";
const section = document.querySelector(".section1");
const infoText = document.querySelector<HTMLElement>(".checkbox-text");
const loading = document.querySelector<HTMLElement>('.loading');
const checkTextBox = document.querySelector<HTMLElement>('.checkbox-textbox');
export default class Layout extends LayoutToggle(Layout3) {
    dropDown: DropDown = new DropDown();
    checkBox: Checkbox = new Checkbox();
    nextBtn: NextBtn = new NextBtn();
    autoBtn: AutoBtn = new AutoBtn();
    resetBtn: ResetBtn = new ResetBtn();
    question: Question = new Question();
    nextAbleLimit: number = 1;
    options:any[] = [];
    layout1:Layout1 = new Layout1();
    layout2:Layout2 = new Layout2(this.options, DataAPI.getInstance().getStats2(), DataAPI.getInstance().getWinNums(), DataAPI.getInstance().getTOTAL());
    layout3:Layout3 = new Layout3();
    private setOption() {
        const currentFilter = DataAPI.getInstance().getCurrent();
        switch (currentFilter) {
            case 3:
                this.options[currentFilter] = this.layout2.checkedNumbers.slice();
                break;
            case 4: case 5:
                this.options[currentFilter] = this.layout2.checkedNumbers.slice();
                if (currentFilter === 4) {
                    this.options[currentFilter].push(...this.options[3]);
                } else if (currentFilter === 5) {
                    const winNum: number[] = DataAPI.getInstance().getWinNums()[0];
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
                    const range = DataAPI.getInstance().getLabels();
                    const option: number[] = [];
                    this.options[currentFilter].forEach((value: boolean, index: number) => {
                        if (value) {
                            option.push(index);
                        }
                    });
                    this.options[currentFilter] = option;
                } else if (currentFilter === 6) {
                    this.options[currentFilter] = DataAPI.getInstance().getLabels()[this.options[currentFilter].indexOf(true)];
                } else if (6 < currentFilter && currentFilter < DataAPI.getInstance().SIZE - 1) {
                    const range = DataAPI.getInstance().getLabels()
                    let from = range[this.options[currentFilter].indexOf(true)];
                    let to = range[this.options[currentFilter].lastIndexOf(true)]
                    if (currentFilter === 7) {
                        from = Number((<string>from).slice(0, (<string>from).indexOf('~')));
                        to = Number((<string>to).slice((<string>to).indexOf('~') + 1));
                    } else if (currentFilter === 12 && typeof from === 'string') {
                        from = Number((<string>from).slice(0, (<string>from).indexOf('~')));
                        to = Number((<string>to).slice((<string>to).indexOf('~') + 1));
                    } else {
                        from = Number(from);
                        to = Number(to);
                    }
                    this.options[currentFilter] = { from, to }
                } else if (currentFilter === DataAPI.getInstance().SIZE - 1) {
                    this.options[currentFilter] = this.options[currentFilter][0] ? false : true;
                }
        }
    }
    private async on(layoutVersion: number = 0) {
        if (layoutVersion === 0) {
            const currentFilter = DataAPI.getInstance().getCurrent();
            infoText.textContent = DataAPI.getInstance().infoList[currentFilter];
            if (DataAPI.getInstance().numbers) {
                this.layout3_1On();
            } else {
                switch (currentFilter) {
                    case 3: case 4: case 5:
                        this.layout2.reset();
                        this.checkBox.removeAllEvent();
                        if (currentFilter == 3) {
                            this.nextAbleLimit = this.options[currentFilter - 1].indexOf(true);
                            infoText.innerHTML = `전멸구간을 제외한 전회차 번호입니다. 이월될 수를 선택해주세요.(${this.nextAbleLimit}개) (나머지는 자동제외됩니다.)`;
                            if (this.nextAbleLimit === 0) {
                                this.dropDown.nodeList[currentFilter].textContent = '-';
                                this.options[currentFilter] = [];
                                await DataAPI.getInstance().forward(this.options[currentFilter]);
                                infoText.innerHTML = DataAPI.getInstance().infoList[currentFilter + 1];
                            }
                            this.layout2.includeVerson();
                        }
                        else if (currentFilter === 4) {
                            this.nextAbleLimit = 1;
                            this.layout2.includeVerson();
                        }
                        else if (currentFilter === 5) {
                            this.layout2.excludeVersion();
                        }
                        this.layout2.setOpacity();
                        this.layout2.refreshNumberBoard();
                        this.layout2On();
                        this.resetBtn.removeEvent();
                        this.resetBtn.addEvent(this.layout2.reset.bind(this));
                        break;
                    case DataAPI.getInstance().SIZE:
                        this.layout3_1On();
                        break;
                    default:
                        this.layout1On();
                        this.checkBox.init();
                        if (currentFilter === 1) {
                            this.layout1.clearStatsBoard();
                            this.nextAbleLimit = this.options[currentFilter - 1].indexOf(true);
                            if (this.nextAbleLimit === 0) {
                                this.dropDown.nodeList[currentFilter].textContent = '-';
                                this.options[currentFilter] = [];
                                await DataAPI.getInstance().forward(this.options[currentFilter]);
                                this.on();
                            } else if (this.nextAbleLimit === 1) {
                                this.checkBox.singleSelectEvent();
                            } else {
                                this.checkBox.multiSelectEvent(this.nextAbleLimit);
                            }
                        } else if (currentFilter <= 6) {
                            if (currentFilter === 0) {
                                this.dropDown.nodeList[currentFilter + 1].textContent = DataAPI.getInstance().getNextName();
                                this.nextAbleLimit = 1;
                            } else if (currentFilter === 2) {
                                this.dropDown.nodeList[currentFilter + 1].textContent = DataAPI.getInstance().getNextName();
                                this.nextAbleLimit = 1;
                            }
                            this.checkBox.singleSelectEvent();
                        } else {
                            this.checkBox.rangeSelectEvent();
                        }
                        this.resetBtn.removeEvent();
                        this.resetBtn.addEvent(this.checkBox.reset.bind(this.checkBox));
                        this.layout1.barSlide.init();
                        this.layout1.lineSlide.init();
                        this.layout1.bubbleChart.init();
                        break;
                }
            }
        }
    }

    private async next(current: number) {
        section.scrollIntoView({
            behavior: 'auto'
        });
        loading.classList.remove('none');
        console.log(DataAPI.getInstance().getGeneratedNums());
        await DataAPI.getInstance().forward(this.options[current]);
        await this.on();
        loading.classList.add('none');
        this.checkBox.reset();
        this.dropDown.changeBoard();
        this.dropDown.changeDropDownColor();
        console.log(this.options);
    }
    init() {
        this.question.bubbleQue.on();
        this.question.numBoardQue.on();
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
        infoText.textContent = DataAPI.getInstance().infoList[0];
        this.layout1.setStatsBoard(DataAPI.getInstance().getStats().stats);

        this.nextBtn.addEvent(async () => {
            const currentFilter = DataAPI.getInstance().getCurrent();
            if (this.checkBox.getCount() >= this.nextAbleLimit ||
                currentFilter === 3 && this.layout2.checkedNumbers.length === this.nextAbleLimit ||
                currentFilter === 4 || currentFilter === 5) {
                this.setOption();
                this.next(currentFilter);
            } else {
                const text = checkTextBox.textContent;
                checkTextBox.classList.add('checkbox-alert');
                if (currentFilter <= 6) checkTextBox.textContent = `딱 ${this.nextAbleLimit}개 선택해주세요~`;
                if (currentFilter > 6) checkTextBox.textContent = `최소 ${this.nextAbleLimit}개 이상 산텍헤주세요~`;
                setTimeout(function () {
                    checkTextBox.classList.remove('checkbox-alert');
                    checkTextBox.textContent = text;
                }, 1000)
            }
        });
        this.autoBtn.addEvent(async () => {
            const current = DataAPI.getInstance().getCurrent();
            let index: number;
            let rand: number;
            let pos: number[];
            let temp: any;
            let set: Set<number>
            switch (current) {
                case 0:
                    rand = Math.random();
                    if (rand > 0.5) this.options[current] = [false, true, false, false, false];
                    else if (rand > 0.2) this.options[current] = [false, false, true, false, false];
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
                    rand = Math.random();
                    if (rand > 0.6) this.options[current] = [false, true, false, false, false, false, false];
                    else if (rand > 0.2) this.options[current] = [true, false, false, false, false, false, false];
                    else this.options[current] = [false, false, true, false, false, false, false]
                    break;
                case 3: case 4: case 5: break;
                case 6:
                    rand = Math.random();
                    index = Math.floor(rand * DataAPI.getInstance().getLabels().length);
                    console.log(index, DataAPI.getInstance().getLabels())
                    this.options[current] = DataAPI.getInstance().getLabels()[index];
                    break;
                case DataAPI.getInstance().SIZE - 1:
                    this.options[current] = true;
                    break;
                default:
                    index = 0;
                    pos = DataAPI.getInstance().getStats().pos;
                    temp = pos[0]
                    for (let i = 1; i < pos.length; i++) {
                        if (temp < pos[i]) {
                            index = i; temp = pos[i];
                        }
                    }
                    const range = DataAPI.getInstance().getLabels()
                    let from = range[index];
                    let to = range[index];
                    if (current === 7 || current === 12 && typeof from === 'string') {
                        console.log(from, to);
                        from = Number((<string>from).slice(0, (<string>from).indexOf('~')));
                        to = Number((<string>to).slice((<string>to).indexOf('~') + 1));
                        console.log(from, to);
                    } else {
                        from = Number(from);
                        to = Number(to);
                    }

                    this.options[current] = { from, to }
                    break;
            }
            this.next(current);
        });
        this.dropDown.nodeList.forEach((node, index) => {
            node.addEventListener('click', async () => {
                const current = DataAPI.getInstance().getCurrent();
                if (index < current && node.textContent !== '-' && confirm(`'${DataAPI.getInstance().getFilterList()[index]}'(으)로 되돌아가시겠습니까?`)) {
                    section.scrollIntoView({
                        behavior: 'auto'
                    });
                    for (let i = 0; i < current - index; i++) this.options.pop();
                    DataAPI.getInstance().leap(index);
                    await this.on();
                    this.checkBox.reset();
                    this.dropDown.changeBoard();
                    this.dropDown.changeDropDownColor();
                }
            })
        });

    }
}