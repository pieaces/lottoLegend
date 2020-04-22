import { isNull } from "util";
import 'core-js/stable/weak-map'
const allCheckBox = document.querySelector<HTMLInputElement>('#all-check');
const currentSize = document.querySelector<HTMLElement>('#num-list-select-current');
const totalSize = document.querySelector<HTMLElement>('#num-list-select-total');

export default class CheckBoxToggle {
    private inputBoxes: NodeListOf<HTMLInputElement> = null;
    private static currentValue = 0;
    private static totalValue = 0;
    private static checkBoxEvents:WeakMap<HTMLInputElement, any> = new WeakMap();
    constructor(){
        currentSize.textContent='0'
    }
    static inputChangeEvent(node:HTMLInputElement){
        if (node.checked) {
            CheckBoxToggle.currentValue++;
        } else {
            CheckBoxToggle.currentValue--;
        }
        currentSize.textContent = CheckBoxToggle.currentValue.toString();
    }

    setInputBoxes(inputBoxes: NodeListOf<HTMLInputElement>) {
        if(!isNull(this.inputBoxes)){
            this.inputBoxes.forEach(node => {
                const event = CheckBoxToggle.checkBoxEvents.get(node);
                node.removeEventListener('change', event);
                CheckBoxToggle.checkBoxEvents.delete(node);
            });
        }
        CheckBoxToggle.currentValue = 0;
        currentSize.textContent = '0';
        CheckBoxToggle.totalValue = inputBoxes.length;
        this.inputBoxes = inputBoxes;
    }
    getInputBoxes(){
        return this.inputBoxes
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
    addCheckBoxEvent() {
        totalSize.textContent = this.inputBoxes.length.toString();
        this.inputBoxes.forEach(node => {
            if (isNull(node.getAttribute('disabled'))) {
                const event = CheckBoxToggle.inputChangeEvent.bind(null, node);
                node.addEventListener('change', event);
                CheckBoxToggle.checkBoxEvents.set(node, event);
            }
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
    getCurrentValue(){
        return CheckBoxToggle.currentValue;
    }
    static allCheckedReset() {
        allCheckBox.checked = false;
    }
}