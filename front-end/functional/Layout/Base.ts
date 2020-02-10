import DropDown from "../Buttons/DropDown";
import DataAPI from "../DataAPI";

const func1MainLayout = document.querySelector<HTMLElement>('.func1-main-bottom-container');
const func2MainLayout = document.querySelector<HTMLElement>('.func2-main-bottom-container');
const func1CheckBox = document.querySelector<HTMLElement>('.func1-checkbox-container');
const func2SelectNumBox = document.querySelector<HTMLElement>('.func2-select-num-box-container');

export default class Base {
    dropDown:DropDown;

    constructor() { }
    on() {
        const currentFilter = DataAPI.getInstance().getCurrent();
        switch (currentFilter) {
            case 3: case 4:
                func1MainLayout.style.display = "none";
                func2MainLayout.style.display = "block";
                func1CheckBox.style.display = "none"
                func2SelectNumBox.style.display = "block"
                break;
            default:
                func1MainLayout.style.display = "block";
                func2MainLayout.style.display = "none";
                func1CheckBox.style.display = "block"
                func2SelectNumBox.style.display = "none";
                break;
        }
    }
    protected init(){
        this.dropDown.init();
    }
}