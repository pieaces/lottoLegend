import DataAPI from "./DataAPI";
import DropDown from "./Buttons/DropDown";
import Layout2 from './Layout/Layout2'
import Layout1 from "./Layout/Layout1";
import CheckBox from "./Buttons/CheckBox";

const nextBtn = document.getElementById('nextBtn');
const reset = document.querySelector('#reset');
const layout1 = new Layout1();
const layout2 = new Layout2();
const dropDown = new DropDown();
const checkBox = new CheckBox();
const optionList = [null, [3], null, [10, 20, 42, 43, 44], [2], 2, { from: 100, to: 190 }, { from: 2, to: 4 }, { from: 1, to: 3 }, { from: 0, to: 3 }, { from: 10, to: 14 }, { from: 30, to: 38 }, { from: 7, to: 10 }, true];
async function execute() {
    await DataAPI.getInstance().init();
    dropDown.init();
    checkBox.init();
    layout1.init();
    layout2.init();

    reset.addEventListener('click', () => {
        checkBox.reset();
    });
    nextBtn.addEventListener('click', async () => {
        checkBox.reset();
        const option = undefined;
        const currentFilter = DataAPI.getInstance().getCurrent();

        await DataAPI.getInstance().forward(optionList[currentFilter]);
        switch (currentFilter + 1) {
            case 3: case 4:
                layout2.on();
                break;
            default:
                layout1.on();
                layout1.init();
        }
        dropDown.changeBoard();
    });
}
execute();