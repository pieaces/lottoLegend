import DataAPI from "./DataAPI";
import DropDown from "./Buttons/DropDown";
import Layout from './Layout'
import Layout1 from "./Layout/Layout1";
import CheckBox from "./Buttons/CheckBox";

const nextBtn = document.getElementById('nextBtn');
const reset = document.querySelector('#reset');
const layout = new Layout();
const dropDown = new DropDown();
const checkBox = new CheckBox();
const optionList = [null, [3], null, [10, 20, 42, 43, 44], [2], 2, { from: 100, to: 190 }, { from: 2, to: 4 }, { from: 1, to: 3 }, { from: 0, to: 3 }, { from: 10, to: 14 }, { from: 30, to: 38 }, { from: 7, to: 10 }, true];
async function execute() {
    await DataAPI.getInstance().init();
    dropDown.init();
    checkBox.init();
    layout.init();

    reset.addEventListener('click', () => {
        checkBox.reset();
    });
    nextBtn.addEventListener('click', async () => {
        checkBox.reset();
        const option = undefined;
        const currentFilter = DataAPI.getInstance().getCurrent();

        await DataAPI.getInstance().forward(optionList[currentFilter]);
        layout.on();
        dropDown.changeBoard();
    });
}
execute();