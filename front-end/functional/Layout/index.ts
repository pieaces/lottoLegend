import Layout3 from "./Layout3";
import DataAPI from "../DataAPI";
import DropDown from "../instanceBtns/DropDown";
import Checkbox from "../instanceBtns/CheckBox";
import NextBtn from "../instanceBtns/NextBtn";
import ResetBtn from "../instanceBtns/ResetBtn";
import Question from "../Question"
const layout1 = document.querySelectorAll<HTMLElement>(".func1-layout");
const layout2 = document.querySelectorAll<HTMLElement>(".func2-layout");
const section = document.querySelector(".section1");
const infoText = document.querySelector(".checkbox-text");
const loading = document.querySelector<HTMLElement>('.loading');
const alertText = document.querySelector<HTMLElement>('.checkbox-alert');

export default class Layout extends Layout3 {
    //optionList2 = [null, [3], null, [10, 20, 42, 43, 44], [2], 2, { from: 100, to: 190 }, { from: 2, to: 4 }, { from: 1, to: 3 }, { from: 0, to: 3 }, { from: 10, to: 14 }, { from: 30, to: 38 }, { from: 7, to: 10 }, true];
    dropDown: DropDown = new DropDown();
    checkBox: Checkbox = new Checkbox();
    nextBtn: NextBtn = new NextBtn();
    resetBtn: ResetBtn = new ResetBtn();
    question: Question = new Question();
    nextAbleLimit: number = 1;
    private layout1On() {
        layout1.forEach(node => {
            node.classList.remove('none');
        });
        layout2.forEach(node => {
            node.classList.add('none');
        });
    }
    private layout2On() {
        layout1.forEach(node => {
            node.classList.add('none');
        });
        layout2.forEach(node => {
            node.classList.remove('none');
        });
    }

    private setOption() {
        const currentFilter = DataAPI.getInstance().getCurrent();
        switch (currentFilter) {
            case 3:
                this.options[currentFilter] = this.checkedNumbers.slice();
                break;
            case 4: case 5:
                this.options[currentFilter] = this.checkedNumbers.slice();
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
            switch (currentFilter) {
                case 3: case 4: case 5:
                    this.reset();
                    this.checkBox.removeAllEvent();
                    if (currentFilter == 3) {
                        this.nextAbleLimit = this.options[currentFilter - 1].indexOf(true);
                        if (this.nextAbleLimit === 0) {
                            this.options[currentFilter] = [];
                            await DataAPI.getInstance().forward(this.options[currentFilter]);
                        }
                        this.includeVerson();
                    }
                    else if (currentFilter === 4) this.includeVerson();
                    else if (currentFilter === 5) this.excludeVersion();
                    this.setOpacity();
                    this.refreshNumberBoard();
                    this.layout2On();
                    this.resetBtn.removeEvent();
                    this.resetBtn.addEvent(this.reset.bind(this));
                    break;
                default:
                    this.layout1On();
                    this.checkBox.init();
                    if (currentFilter === 1) {
                        this.nextAbleLimit = this.options[currentFilter - 1].indexOf(true);
                        if (this.nextAbleLimit === 0) {
                            this.options[currentFilter] = [];
                            await DataAPI.getInstance().forward(this.options[currentFilter]);
                            this.on();
                        } else if (this.nextAbleLimit === 1) {
                            this.checkBox.singleSelectEvent();
                        } else {
                            this.checkBox.multiSelectEvent(this.nextAbleLimit);
                        }
                    } else if (currentFilter <= 6) {
                        this.checkBox.singleSelectEvent();
                    } else {
                        this.checkBox.rangeSelectEvent();
                    }
                    this.resetBtn.removeEvent();
                    this.resetBtn.addEvent(this.checkBox.reset.bind(this.checkBox));
                    this.barSlide.init();
                    this.lineSlide.init();
                    this.bubbleChart.init();
                    break;
            }
        }
    }

    init() {
        super.init();
        this.question.init();
        this.dropDown.init();
        this.dropDown.changeDropDownColor();
        this.dropDown.addEvent();
        this.checkBox.init();
        this.checkBox.singleSelectEvent();
        this.resetBtn.addEvent(this.checkBox.reset.bind(this.checkBox));
        this.barSlide.init();
        this.lineSlide.init();
        this.bubbleChart.init();

        this.statsBoard.textContent += JSON.stringify(DataAPI.getInstance().getStats().stats);

        this.nextBtn.addEvent(async () => {
            const currentFilter = DataAPI.getInstance().getCurrent();
            if (this.checkBox.getCount() > 0 ||
                currentFilter === 1 && this.checkBox.getCount() === this.nextAbleLimit ||
                currentFilter === 3 && this.checkedNumbers.length === this.nextAbleLimit ||
                currentFilter === 4 || currentFilter === 5) {
                section.scrollIntoView({
                    behavior: 'auto'
                });
                this.setOption();
                loading.classList.remove('none');
                await DataAPI.getInstance().forward(this.options[currentFilter]);
                await this.on();
                loading.classList.add('none');
                this.checkBox.reset();
                this.dropDown.changeBoard();
                this.dropDown.changeDropDownColor();
            } else {
                alertText.style.opacity = "1";
                alertText.textContent = "몇개를 찍으셔야 합니다";
                setTimeout(function () {
                    alertText.style.opacity = "0";
                }, 1500)
            }
        });
        this.dropDown.nodeList.forEach((node, index) => {
            node.addEventListener('click', async () => {
                const current = DataAPI.getInstance().getCurrent();
                if (index < current) {
                    section.scrollIntoView({
                        behavior: 'auto'
                    });
                    for (let i = 0; i < current - index; i++) this.options.pop();
                    DataAPI.getInstance().leap(index);
                    console.log(DataAPI.getInstance().getCurrent(), index);
                    await this.on();
                    this.checkBox.reset();
                    this.dropDown.changeBoard();
                    this.dropDown.changeDropDownColor();
                }
            })
        })
    }
}

// const div=document.querySelector('.func1-stats-container > div:nth-child(3)');

// if 보여줄려면 div.classList.remove('none');

//     div.children[1].textContent="???";

// else 안 보여줄려면div.classList.add('none');