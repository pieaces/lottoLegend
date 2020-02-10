import Layout3 from "./Layout3";
import DataAPI from "../DataAPI";
import DropDown from "../instanceBtns/DropDown";
import Checkbox from '../instanceBtns/CheckBox';
import NextBtn from "../instanceBtns/NextBtn";
import ResetBtn from '../instanceBtns/ResetBtn'
const layout1 = document.querySelectorAll<HTMLElement>('.func1-layout');
const layout2 = document.querySelectorAll<HTMLElement>('.func2-layout');

export default class Layout extends Layout3 {
    optionList = [null, [3], null, [10, 20, 42, 43, 44], [2], 2, { from: 100, to: 190 }, { from: 2, to: 4 }, { from: 1, to: 3 }, { from: 0, to: 3 }, { from: 10, to: 14 }, { from: 30, to: 38 }, { from: 7, to: 10 }, true];
    dropDown: DropDown = new DropDown();
    checkBox: Checkbox = new Checkbox();
    nextBtn: NextBtn = new NextBtn();
    resetBtn: ResetBtn = new ResetBtn();

    private layout1On() {
        layout1.forEach(node => {
            node.style.display = "block";
        });
        layout2.forEach(node => {
            node.style.display = "none";
        });
    }
    private layout2On() {
        layout1.forEach(node => {
            node.style.display = "none";
        });
        layout2.forEach(node => {
            node.style.display = "block";
        });
    }
    on(layoutVersion: number = 0) {
        if (layoutVersion === 0) {
            const currentFilter = DataAPI.getInstance().getCurrent();
            switch (currentFilter) {
                case 3: case 4:
                    this.layout2On();
                    this.resetBtn.init((e) => { this.reset(e) });
                    break;
                default:
                    this.layout1On();
                    this.resetBtn.init(() => { this.checkBox.reset() });
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
        this.checkBox.init();
        this.resetBtn.init(() => { this.checkBox.reset() });
        this.nextBtn.init(async () => {
            this.checkBox.reset();
            const option = undefined;
            const currentFilter = DataAPI.getInstance().getCurrent();

            await DataAPI.getInstance().forward(this.optionList[currentFilter]);
            this.on();
            this.dropDown.changeBoard();
            super.init();
        })
    }
}