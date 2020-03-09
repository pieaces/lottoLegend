import DataAPI from "../DataAPI";

const checkBoxContainer = document.querySelector<HTMLElement>('.func1-checkbox-box');

export default class CheckBox {
    static readonly checkedStyle = 'func1-num-check-current';
    private eventHandler: (() => void)[] = [];
    private nodeList: HTMLElement[] = [];
    private labelList: boolean[] = [];
    getCheckedLabels(): boolean[] {
        return this.labelList;
    }
    getCount(): number {
        let count = 0;
        this.labelList.forEach(value => {
            if (value) count++;
        });
        return count;
    }
    removeAllEvent() {
        if (this.eventHandler.length > 0) {
            this.nodeList.forEach((node, index) => {
                node.removeEventListener('click', this.eventHandler[index]);
            });
            this.eventHandler = [];
        }
    }
    singleSelectEvent() {
        this.removeAllEvent();
        this.nodeList.forEach((node, index, parent) => {
            const event = () => {
                const trueIndex = this.labelList.indexOf(true);
                if (trueIndex !== -1) {
                    parent[trueIndex].children[0].classList.remove(CheckBox.checkedStyle);
                    this.labelList[trueIndex] = false;
                }
                node.children[0].classList.add(CheckBox.checkedStyle);
                this.labelList[index] = true;
            }
            this.eventHandler[index] = event;
            node.addEventListener('click', event);
        });
    }
    multiSelectEvent(limit = this.labelList.length) {
        this.removeAllEvent();
        this.nodeList.forEach((node, index) => {
            const event = () => {
                const count = this.getCount();
                if (this.labelList[index]) {
                    node.children[0].classList.remove(CheckBox.checkedStyle);
                    this.labelList[index] = false;
                } else {
                    if (count < limit) {
                        node.children[0].classList.add(CheckBox.checkedStyle);
                        this.labelList[index] = true;
                    }
                }
            }
            this.eventHandler[index] = event;
            node.addEventListener('click', event);
        });
    }
    rangeSelectEvent() {
        this.removeAllEvent();
        if (this.nodeList.length === 0) {
            this.init();
        }
        let first: number;
        let last: number;

        this.nodeList.forEach((node, index, parent) => {
            const event = () => {
                const count = this.getCount();
                if (count === 0) {
                    first = index;
                    node.children[0].classList.add(CheckBox.checkedStyle);
                    this.labelList[index] = true;
                } else if (count === 1) {
                    if (this.labelList[index] === true) {
                        node.children[0].classList.remove(CheckBox.checkedStyle);
                        this.labelList[index] = false;
                    } else {
                        last = index;
                        const trueIndex = this.labelList.indexOf(true);
                        const min = Math.min(trueIndex, index);
                        const max = Math.max(trueIndex, index);
                        for (let i = min; i <= max; i++) {
                            parent[i].children[0].classList.add(CheckBox.checkedStyle);
                            this.labelList[i] = true;
                        }
                    }
                } else {
                    let min = Math.min(first, last);
                    let max = Math.max(first, last);
                    for (let i = min; i <= max; i++) {
                        parent[i].children[0].classList.remove(CheckBox.checkedStyle);
                        this.labelList[i] = false;
                    }

                    min = Math.min(last, index);
                    max = Math.max(last, index);
                    for (let i = min; i <= max; i++) {
                        parent[i].children[0].classList.add(CheckBox.checkedStyle);
                        this.labelList[i] = true;
                    }
                    first = last;
                    last = index;
                }
            }
            this.eventHandler[index] = event;
            node.addEventListener('click', event);
        });
    }
    reset() {
        if (this.nodeList.length === 0) {
            this.init();
        }
        this.nodeList.forEach(node => {
            node.children[0].classList.remove('func1-num-check-current');
            this.labelList.fill(false);
        });
    }
    init() {
        this.nodeList = [];
        let labels: (string | number)[];

        labels = DataAPI.getInstance().getLabels().map(value => {
            if (typeof value === 'string') {
                const index = value.indexOf('~');
                if (index !== -1) {
                    return value.slice(0, index + 1);
                } else return value;
            }
            return value;
        });

        this.labelList = new Array<boolean>(labels.length).fill(false);
        Array.from(checkBoxContainer.children).forEach(node => {
            node.remove();
        })
        labels.forEach(label => {
            const divBox = document.createElement('div');
            divBox.classList.add('func1-checkbox');
            this.nodeList.push(divBox);

            const div = document.createElement('div');

            const checkbox = document.createElement('input');
            const num = document.createTextNode(label.toString());
            div.appendChild(num);
            checkbox.classList.add('checkbox');
            div.appendChild(checkbox);
            divBox.appendChild(div);
            checkBoxContainer.appendChild(divBox);
        });
    }
}

// labels.forEach(label => {
//     const div = document.createElement('div');
//     this.nodeList.push(div);
//     const checkbox = document.createElement('input');
//     const num = document.createTextNode(label.toString());
//     div.appendChild(num);
//     checkbox.classList.add('checkbox');
//     div.appendChild(checkbox);
//     checkBoxContainer.appendChild(div);
// });