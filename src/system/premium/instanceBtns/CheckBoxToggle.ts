import { isNull } from "util";

const allCheckBox = document.querySelector<HTMLInputElement>('#all-check');
const currentSize = document.querySelector<HTMLElement>('#num-list-select-current');
const totalSize = document.querySelector<HTMLElement>('#num-list-select-total');

export default class CheckBoxToggle {
    private inputBoxes: NodeListOf<HTMLInputElement>;
    private static currentValue = 0;
    private static totalValue = 0;
    constructor(){currentSize.textContent='0'}

    setInputBoxes(inputBoxes: NodeListOf<HTMLInputElement>) {
        CheckBoxToggle.currentValue = 0;
        currentSize.textContent = '0';
        CheckBoxToggle.totalValue = inputBoxes.length;
        this.inputBoxes = inputBoxes;
    }
    allBtnEvent() {
        if (this.inputBoxes) {
            allCheckBox.addEventListener('change', () => {
                if (allCheckBox.checked) {
                    let sum = 0;
                    this.inputBoxes.forEach(node => {
                        if(isNull(node.getAttribute('disabled'))) {
                            node.checked = true;
                            sum++;
                        }
                    });
                    CheckBoxToggle.currentValue = sum;
                    currentSize.textContent = sum.toString();
                } else {
                    this.inputBoxes.forEach(node => {
                        node.checked = false;
                    });
                    CheckBoxToggle.currentValue = 0;
                    currentSize.textContent = '0';
                }
            });
        }
    }
    checkBoxEvent(){
        totalSize.textContent = this.inputBoxes.length.toString();
        this.inputBoxes.forEach((node) => {
            node.addEventListener('change', () => {
                if (node.checked) {
                    CheckBoxToggle.currentValue++;
                } else {
                    CheckBoxToggle.currentValue--;
                }
                currentSize.textContent = CheckBoxToggle.currentValue.toString();
            });
        });
    }
    static subtract(minus:number){
        CheckBoxToggle.currentValue = 0;
        currentSize.textContent = '0';
        CheckBoxToggle.totalValue -= minus;
        totalSize.textContent = CheckBoxToggle.totalValue.toString();
    }
    getTotal(){
        return CheckBoxToggle.totalValue;
    }
    static allCheckedReset() {
        allCheckBox.checked = false;
    }
}