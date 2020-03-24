
import Layout3 from "./Layout3";
import NumBoard from "./NumBoard";
import DataAPI from "../DataAPI";
import CheckBoxToggle from "../instanceBtns/CheckBoxToggle";
import { makeCheckdValueBox } from "./functions"
import generatorLoading from "../../generatorLoading";
import { IDataAPI } from ".";

const layout1 = document.querySelectorAll<HTMLElement>(".func1-layout");
const layout2 = document.querySelectorAll<HTMLElement>(".func2-layout");
const layout3 = document.querySelectorAll<HTMLElement>('.func3-layout');

const excLineCountText = document.getElementById('excludedLineCount-text');
const carrycountCanvas = document.getElementById('carrycount');
const includeCanvas = document.getElementById('include');
const excludeCanvas = document.getElementById('exclude');
const filterTableValues = document.querySelectorAll('.func3-filter-table > tbody > tr:nth-child(2) > td');


type Constructor<T = {}> = new (...args: any[]) => T;
const layout1Class = 'func1-layout'
const layout2Class = 'func2-layout'
const layout3Class = 'func3-layout'

export default function LayoutToggle<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        protected dataAPI: IDataAPI;
        private layout1Arr: HTMLElement[] = Array.from(layout1);
        private layout2Arr: HTMLElement[] = Array.from(layout2);
        private layout3Arr: HTMLElement[] = Array.from(layout3);
        layout1On() {
            this.layout2Arr.forEach(node => {
                node.classList.add('none');
            });
            this.layout3Arr.forEach(node => {
                node.classList.add('none');
            });
            this.layout1Arr.forEach(node => {
                if (node.classList.contains(layout1Class)) {
                    node.classList.remove('none');
                } else {
                    node.classList.add('none');
                }
            });
        }
        layout2On() {
            this.layout1Arr.forEach(node => {
                node.classList.add('none');
            });
            this.layout3Arr.forEach(node => {
                node.classList.add('none');
            });
            this.layout2Arr.forEach(node => {
                if (node.classList.contains(layout2Class)) {
                    node.classList.remove('none');
                } else {
                    node.classList.add('none');
                }
            });
        }

        layout3On(data: any) {
            generatorLoading(3000);
            const numBoard = new NumBoard(this.dataAPI.numbersData);
            numBoard.makeNumBoard();
            const checkBoxToggle = new CheckBoxToggle();
            checkBoxToggle.setInputBoxes(document.querySelectorAll<HTMLInputElement>('.input-checkbox-container > input'));
            checkBoxToggle.addEvent();
            makeCheckdValueBox();
            excLineCountText.textContent = (<number[]>data[1]).map(value => {
                switch (value) {
                    case 0: return '1번대';
                    case 1: return '10번대';
                    case 2: return '20번대';
                    case 3: return '30번대';
                    case 4: return '40번대';
                }
            }).join(', ');
            Layout3.makeLine(carrycountCanvas, data[3].sort((a, b) => a - b));
            Layout3.makeLine(includeCanvas, data[4].sort((a, b) => a - b));
            Layout3.makeLine(excludeCanvas, data[5].sort((a, b) => a - b));
            Array.from(filterTableValues).forEach((node, index) => {
                if (index === 0) {
                    node.innerHTML = data.slice(6)[index];
                } else if (index === 1) {
                    node.innerHTML = data.slice(6)[index].sort((a, b) => a.from - b.from).map(value => `<div class="func3-table-values func3-table-sum">${value.from}~${value.to}</div>`).join('');
                } else if (index < 8) {
                    const str = data.slice(6)[index] && data.slice(6)[index].sort((a, b) => a - b).map(value => `<div class="func3-table-values func3-table-piece">${value}</div>`).join('');
                    if (str) node.innerHTML = str;
                }
                else {
                    if (typeof data.slice(6)[index] === 'boolean') node.innerHTML = data.slice(6)[index] ? '포함' : '제외';
                }
            })
            this.layout1Arr.forEach(node => {
                node.classList.add('none');
            });
            this.layout2Arr.forEach(node => {
                node.classList.add('none');
            });
            this.layout3Arr.forEach(node => {
                if (node.classList.contains(layout3Class)) {
                    node.classList.remove('none');
                } else {
                    node.classList.add('none');
                }
            });
        }
    };
}