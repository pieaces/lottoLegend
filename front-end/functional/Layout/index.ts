import Layout3 from "./Layout3";
import DataAPI from "../DataAPI";
import DropDown from "../Buttons/DropDown";
import Checkbox from '../Buttons/CheckBox';
import NextBtn from "../Buttons/NextBtn";

const layout1 = document.querySelectorAll<HTMLElement>('.func1-layout');
const layout2 = document.querySelectorAll<HTMLElement>('.func2-layout');

export default class Layout extends Layout3 {
    optionList = [null, [3], null, [10, 20, 42, 43, 44], [2], 2, { from: 100, to: 190 }, { from: 2, to: 4 }, { from: 1, to: 3 }, { from: 0, to: 3 }, { from: 10, to: 14 }, { from: 30, to: 38 }, { from: 7, to: 10 }, true];
    dropDown: DropDown = new DropDown();
    checkBox: Checkbox = new Checkbox();
    nextBtn: NextBtn = new NextBtn();
    on() {
        const currentFilter = DataAPI.getInstance().getCurrent();
        switch (currentFilter) {
            case 3: case 4:
                layout1.forEach(node =>{
                    node.style.display = "none";
                });
                layout2.forEach(node => {
                    node.style.display = "block";
                });
                break;
            default:
                layout1.forEach(node =>{
                    node.style.display = "block";
                });
                layout2.forEach(node => {
                    node.style.display = "none";
                });
                break;
        }
    }
    init() {
        super.init();
        this.dropDown.init();
        this.checkBox.init();
        this.nextBtn.init(async () => {
            this.checkBox.reset();
            const option = undefined;
            const currentFilter = DataAPI.getInstance().getCurrent();

            await DataAPI.getInstance().forward(this.optionList[currentFilter]);
            this.on();
            this.dropDown.changeBoard();
        })
    }
}