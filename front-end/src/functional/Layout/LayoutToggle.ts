import Layout3 from "./Layout3";
import DataAPI from "../DataAPI";
// import CheckboxToggle from '../CheckboxToggle/CheckBoxToggle'

const layout1 = document.querySelectorAll<HTMLElement>(".func1-layout");
const layout2 = document.querySelectorAll<HTMLElement>(".func2-layout");
const layout3_1 = document.querySelectorAll<HTMLElement>('.func3-layout-1');
const layout3_2 = document.querySelectorAll<HTMLElement>('.func3-layout-2');

const excLineCountText = document.getElementById('excludedLineCount-text');
const carrycountCanvas = document.getElementById('carrycount');
const includeCanvas = document.getElementById('include');
const excludeCanvas = document.getElementById('exclude');
const filterTableValues = document.querySelectorAll('.func3-filter-table > tr:nth-child(2)>td');

type Constructor<T = {}> = new (...args: any[]) => T;
const layout1Class = 'func1-layout'
const layout2Class = 'func2-layout'
const layout3_1Class = 'func3-layout-1'
const layout3_2Class = 'func3-layout-2'

export default function LayoutToggle<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        layout1On() {
            layout2.forEach(node => {
                node.classList.add('none');
            });
            layout3_1.forEach(node => {
                node.classList.add('none');
            });
            layout3_2.forEach(node => {
                node.classList.add('none');
            });
            layout1.forEach(node => {
                if (node.classList.contains(layout1Class)) {
                    node.classList.remove('none');
                } else {
                    node.classList.add('none');
                }
            });

        }
        layout2On() {
            layout1.forEach(node => {
                node.classList.add('none');
            });
            layout3_1.forEach(node => {
                node.classList.add('none');
            });
            layout3_2.forEach(node => {
                node.classList.add('none');
            });
            layout2.forEach(node => {
                if (node.classList.contains(layout2Class)) {
                    node.classList.remove('none');
                } else {
                    node.classList.add('none');
                }
            });
        }

        layout3_1On() {
            Layout3.makeNumBoard(DataAPI.getInstance().numbersData);
            // CheckboxToggle.init();
            // CheckboxToggle.allCheck();
            // Layout3.makeLine(carrycountCanvas, "이월수 개수 데이터");
            // excLineCountText.textContent="전멸구간 텍스트";
            // Layout3.makeLine(includeCanvas, "추천 데이터");
            // Layout3.makeLine(excludeCanvas, "제외 데이터");
            // filterTableValues.forEach((node, index) => {
            // node.textContent = numbers[index];
            // numbers는 필터 데이터 배열
            // })
            layout1.forEach(node => {
                node.classList.add('none');
            });
            layout2.forEach(node => {
                node.classList.add('none');
            });
            layout3_2.forEach(node => {
                node.classList.add('none');
            });
            layout3_1.forEach(node => {
                if (node.classList.contains(layout3_1Class)) {
                    node.classList.remove('none');
                } else {
                    node.classList.add('none');
                }
            });
        }

        layout3_2On() {
            layout1.forEach(node => {
                node.classList.add('none');
            });
            layout2.forEach(node => {
                node.classList.add('none');
            });
            layout3_1.forEach(node => {
                node.classList.add('none');
            });
            layout3_2.forEach(node => {
                if (node.classList.contains(layout3_2Class)) {
                    node.classList.remove('none');
                } else {
                    node.classList.add('none');
                }
            });
        }
    };
}