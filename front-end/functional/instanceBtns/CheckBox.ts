import DataAPI from "../DataAPI";

const checkBox = document.querySelectorAll<HTMLElement>('.func1-checkbox > div');

export default class CheckBox {
    static readonly checkedStyle = 'func1-num-check-current';
    private labelList:boolean[] = [];

    getCheckedLabels(): boolean[]{
        return this.labelList;
    }
    private addEvent() {
        checkBox.forEach((node, index, parent) => {
            node.addEventListener('click', () => {
                if(!this.labelList.length){
                    node.classList.add(CheckBox.checkedStyle);
                    this.labelList[index] = true;
                }else if(this.labelList.length === 1){
                    if(this.labelList[index] === true){
                        node.classList.remove(CheckBox.checkedStyle);
                        this.labelList[index] = false;
                    }else{
                        const trueIndex = this.labelList.indexOf(true);
                        const min = Math.min(trueIndex, index);
                        const max = Math.max(trueIndex, index);
                        for(let i =min; i<=max; i++){
                            parent[i].classList.add(CheckBox.checkedStyle);
                            this.labelList[i] = true;
                        }
                    }
                }
                if ((<HTMLInputElement>node.children[0]).checked) {
                    node.classList.add('func1-num-check-current');
                } else {
                    node.classList.remove('func1-num-check-current');
                }
            });
        });
    }
    reset() {
        checkBox.forEach(node => {
            node.classList.remove('func1-num-check-current');
        });
    }
    init() {
        this.labelList = new Array<boolean>(DataAPI.getInstance().getLabels().length).fill(false);
        this.addEvent();
    }
}