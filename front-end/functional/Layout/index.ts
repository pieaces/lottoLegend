import Layout3 from "./Layout3";
import DataAPI from "../DataAPI";
import DropDown from "../instanceBtns/DropDown";
import Checkbox from '../instanceBtns/CheckBox';
import NextBtn from "../instanceBtns/NextBtn";
import ResetBtn from '../instanceBtns/ResetBtn'
const layout1 = document.querySelectorAll<HTMLElement>('.func1-layout');
const layout2 = document.querySelectorAll<HTMLElement>('.func2-layout');
const section = document.querySelector('.section1');

export default class Layout extends Layout3 {
    optionList = [null, [3], null, [10, 20, 42, 43, 44], [2], 2, { from: 100, to: 190 }, { from: 2, to: 4 }, { from: 1, to: 3 }, { from: 0, to: 3 }, { from: 10, to: 14 }, { from: 30, to: 38 }, { from: 7, to: 10 }, true];
    dropDown: DropDown = new DropDown();
    checkBox: Checkbox = new Checkbox();
    nextBtn: NextBtn = new NextBtn();
    resetBtn: ResetBtn = new ResetBtn();

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
    on(layoutVersion: number = 0) {
        if (layoutVersion === 0) {
            const currentFilter = DataAPI.getInstance().getCurrent();
            switch (currentFilter) {
                case 3: case 4:
                    this.reset();
                    if (currentFilter === 3) this.includeVerson();
                    if (currentFilter === 4) this.excludeVersion();
                    this.layout2On();
                    this.resetBtn.removeEvent();
                    this.resetBtn.addEvent(this.reset.bind(this));
                    break;
                default:
                    this.layout1On();
                    this.checkBox.init();
                    this.checkBox.addEvent();
                    this.resetBtn.removeEvent();
                    this.resetBtn.addEvent(this.checkBox.reset.bind(this.checkBox));
                    this.barSlide.init();
                    this.lineSlide.init();
                    this.bubbleChart.init();
                    break;
            }
        } else {
            if (layoutVersion === 1) this.layout1On();
            else if (layoutVersion === 2) this.layout2On();
        }
    }
    init() {
        super.init();
        this.dropDown.init();
        this.dropDown.changeDropDownColor();
        this.dropDown.addEvent();
        this.checkBox.init();
        this.checkBox.addEvent();
        this.resetBtn.addEvent(this.checkBox.reset.bind(this.checkBox));

        this.barSlide.init();
        this.lineSlide.init();
        this.bubbleChart.init();
        this.statsBoard.textContent = JSON.stringify(DataAPI.getInstance().getStats().stats);
        this.nextBtn.addEvent(async () => {
            section.scrollIntoView({
                behavior: 'auto'
            });
            this.checkBox.reset();
            const currentFilter = DataAPI.getInstance().getCurrent();

            await DataAPI.getInstance().forward(this.optionList[currentFilter]);
            this.on();

            this.dropDown.changeBoard();
            this.dropDown.changeDropDownColor();

            super.init();
        })
    }
}