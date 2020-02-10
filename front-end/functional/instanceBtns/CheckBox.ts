import DataAPI from "../DataAPI";

const checkBox = document.querySelectorAll<HTMLElement>('.func1-checkbox > div');

export default class CheckBox {
    static readonly checkedStyle = 'func1-num-check-current';
    private labelList:boolean[] = [];
    getCheckedLabels(): boolean[]{
        return this.labelList;
    }
    private getCount():number{
        let count = 0;
        this.labelList.forEach(value =>{
            if(value) count++;
        });
        return count;
    }
    private addEvent() {
        let first:number;
        let last:number;
        checkBox.forEach((node, index, parent) => {
            node.addEventListener('click', () => {
                if(this.getCount() === 0){
                    first = index;
                    node.classList.add(CheckBox.checkedStyle);
                    this.labelList[index] = true;
                }else if(this.getCount() === 1){
                    if(this.labelList[index] === true){
                        node.classList.remove(CheckBox.checkedStyle);
                        this.labelList[index] = false;
                    }else{
                        last = index;
                        const trueIndex = this.labelList.indexOf(true);
                        const min = Math.min(trueIndex, index);
                        const max = Math.max(trueIndex, index);
                        for(let i =min; i<=max; i++){
                            parent[i].classList.add(CheckBox.checkedStyle);
                            this.labelList[i] = true;
                        }
                    }
                }else{
                    let min = Math.min(first, last);
                    let max = Math.max(first, last);
                    for(let i = min; i <= max; i++){
                        parent[i].classList.remove(CheckBox.checkedStyle);
                        this.labelList[i] = false;
                    }
                    
                    min = Math.min(last, index);
                    max = Math.max(last, index);
                    console.log(min, max)
                    for(let i = min; i <= max; i++){
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
        checkBox.forEach(node => {
            node.classList.remove('func1-num-check-current');
            this.labelList.fill(false);
        });
    }
    init() {
        this.labelList = new Array<boolean>(DataAPI.getInstance().getLabels().length).fill(false);
        this.addEvent();
    }
}