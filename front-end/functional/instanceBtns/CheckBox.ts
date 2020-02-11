import DataAPI from "../DataAPI";

const checkBoxContainer = document.querySelector<HTMLElement>('.func1-checkbox');

export default class CheckBox {
    static readonly checkedStyle = 'func1-num-check-current';
    private nodeList: HTMLElement[] = [];
    private labelList: boolean[] = [];
    private getCheckedLabels(): boolean[] {
        return this.labelList;
    }
    private getCount(): number {
        let count = 0;
        this.labelList.forEach(value => {
            if (value) count++;
        });
        return count;
    }
    addEvent() {
        if(this.nodeList.length === 0){
            this.init();
        }
        let first: number;
        let last: number;
        this.nodeList.forEach((node, index, parent) => {
            node.addEventListener('click', () => {
                if (this.getCount() === 0) {
                    first = index;
                    node.classList.add(CheckBox.checkedStyle);
                    this.labelList[index] = true;
                } else if (this.getCount() === 1) {
                    if (this.labelList[index] === true) {
                        node.classList.remove(CheckBox.checkedStyle);
                        this.labelList[index] = false;
                    } else {
                        last = index;
                        const trueIndex = this.labelList.indexOf(true);
                        const min = Math.min(trueIndex, index);
                        const max = Math.max(trueIndex, index);
                        for (let i = min; i <= max; i++) {
                            parent[i].classList.add(CheckBox.checkedStyle);
                            this.labelList[i] = true;
                        }
                    }
                } else {
                    let min = Math.min(first, last);
                    let max = Math.max(first, last);
                    for (let i = min; i <= max; i++) {
                        parent[i].classList.remove(CheckBox.checkedStyle);
                        this.labelList[i] = false;
                    }

                    min = Math.min(last, index);
                    max = Math.max(last, index);
                    console.log(min, max)
                    for (let i = min; i <= max; i++) {
                        parent[i].classList.add(CheckBox.checkedStyle);
                        this.labelList[i] = true;
                    }
                    first = last;
                    last = index;
                }
            });
        });
    }
    reset() {
        console.log('!')
        if(this.nodeList.length === 0){
            this.init();
        }
        this.nodeList.forEach(node => {
            node.classList.remove('func1-num-check-current');
            this.labelList.fill(false);
        });
    }
    init() {
        this.nodeList = [];
        const labels = DataAPI.getInstance().getLabels().map(value => {
            if(typeof value === 'string'){
                const index = value.indexOf('~');
                if(index !== -1){
                    return value.slice(0,index+1);
                }
            }
            return value;
        });
        this.labelList = new Array<boolean>(labels.length).fill(false);
        Array.from(checkBoxContainer.children).forEach(node =>{
            node.remove();
        })
        labels.forEach(label => {
            const div = document.createElement('div');
            this.nodeList.push(div);
            const checkbox = document.createElement('input');
            const num = document.createTextNode(label.toString());
            div.appendChild(num);
            checkbox.classList.add('checkbox');
            div.appendChild(checkbox);
            checkBoxContainer.appendChild(div);
        });
    }
}