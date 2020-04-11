import { setColorLotto } from "../../functions";

export function getStaticsName(method: string) {
    let name: string;
    switch (method) {
        case 'excludedLineCount': name = '전멸구간 개수'
            break;
        case "carryCount": name = '이월 개수'
            break;
        case "lowCount": name = '저값(1~22) 개수'
            break;
        case "sum": name = '번호 합계'
            break;
        case "oddCount": name = '홀수 개수'
            break;
        case "primeCount": name = '소수 개수'
            break;
        case "$3Count": name = '3배수 개수'
            break;
        case "sum$10": name = '첫수(십의자리) 합'
            break;
        case "diffMaxMin": name = '고저차'
            break;
        case "AC": name = 'AC'
            break;
    }
    return name;
}

export function mqMobileInit() {
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const filterBoxContainer = document.querySelector('.filter-box-container');
    const filterBox = document.querySelector('.filter-box');
    const filterArrow = document.querySelector('.filter-arrow');
    const filterListBox = document.querySelector<HTMLElement>(".filter-list");

    if (mqMobile.matches) {
        //모바일 레이아웃
        mqMobileInit();
    } else {
        //데스크탑 레이아웃
        mqDeskTopInit();
    }
    mqMobile.addListener(mqFunc);

    let flag = false;

    filterBox.addEventListener("click", dropDownEvent);
    document.addEventListener('click', dropDownExceptEvent);

    function dropDownEvent(e) {
        if (!flag) {
            filterArrow.classList.remove("fa-sort-down");
            filterArrow.classList.add("fa-sort-up");
            filterListBox.classList.remove("none");
        } else {
            filterArrow.classList.add("fa-sort-down");
            filterArrow.classList.remove("fa-sort-up");
            filterListBox.classList.add("none");
        }
        flag = !flag;

        e.stopPropagation();
    }

    function dropDownExceptEvent(e) {
        if (flag) {
            //target 다른 곳
            filterListBox.classList.add("none");
            filterArrow.classList.add("fa-sort-down");
            filterArrow.classList.remove("fa-sort-up");
            flag = false;
        }
    }

    function mqFunc(mediaQuery) {
        if (mediaQuery.matches) {
            //모바일 레이아웃
            mqMobileInit();
        } else {
            mqDeskTopInit();
        }
    }

    function mqMobileInit() {
        filterBoxContainer.classList.remove('none');
        filterBox.addEventListener("click", dropDownEvent);
        document.addEventListener('click', dropDownExceptEvent);
    }
    function mqDeskTopInit() {
        filterBoxContainer.classList.add('none');
        filterBox.removeEventListener("click", dropDownEvent);
        document.removeEventListener('click', dropDownExceptEvent);
    }
}


export function makeCarryNumbers(container: HTMLElement, _round: number, numsArr: number[][], info: number[]) {
    let round = _round;
    let upperBoxes:HTMLDivElement[] = [];
    let underBoxes:HTMLDivElement[] = [];

    const numContainer = makeNumContainer();
    numContainer.appendChild(makeRoundElement(round));
    const numbersDiv = makeNumbersElement(numsArr[0]);
    const numBox = makeNumBox();
    numbersDiv.forEach(div => {
        numBox.appendChild(div);
        underBoxes.push(div);
    });
    numContainer.appendChild(numBox);
    container.appendChild(numContainer);
round--;

    for (let index = 1; index < numsArr.length; index++) {
        upperBoxes = underBoxes;
        underBoxes = [];

        const oneLine = document.createElement('div');

        let lineBox:HTMLDivElement;
        if (info[index-1]) {
            lineBox = document.createElement('div');
            lineBox.classList.add('line-box');
            oneLine.appendChild(lineBox);
        }
        container.appendChild(oneLine);

        const numContainer = makeNumContainer();
        numContainer.appendChild(makeRoundElement(round));
        const numbersDiv = makeNumbersElement(numsArr[index]);
        const numBox = makeNumBox();
        numbersDiv.forEach(div => {
            numBox.appendChild(div);
            underBoxes.push(div);
        });
        numContainer.appendChild(numBox);
        oneLine.appendChild(numContainer);

        let count =0;
        for(let i =0; i<6; i++){
            for(let j = 0; j<6; j++){
                if(count >= info[index-1]) break;

                if(Number(underBoxes[i] && underBoxes[i].textContent) === Number(upperBoxes[j].textContent)){
                    adjustLine(underBoxes[i], upperBoxes[j], lineBox);
                    count++;
                }
            }
        }
        round--;

    }
}

function makeNumContainer() {
    const numContainer = document.createElement('div');
    numContainer.classList.add('canvas-num-container');
    numContainer.classList.add('box-color');
    return numContainer;
}
function makeRoundElement(round: number) {
    const roundElement = document.createElement('div');
    roundElement.classList.add('canvas-num-times');
    roundElement.textContent = round.toString();
    return roundElement;
}
function makeNumBox() {
    const numBox = document.createElement('div');
    numBox.classList.add('canvas-num-box');
    return numBox;

}
function makeNumbersElement(numbers: number[]) {
    return numbers.map(item => {
        const div = document.createElement('div');
        div.textContent = item.toString();
        setColorLotto(item, div);
        return div;
    });
}

function adjustLine(from: HTMLElement, to: HTMLElement, canvas:HTMLElement) {
    var fT = from.offsetTop + from.offsetHeight / 2;
    var tT = to.offsetTop + to.offsetHeight / 2;
    var fL = from.offsetLeft + from.offsetWidth / 2;
    var tL = to.offsetLeft + to.offsetWidth / 2;

    var CA = Math.abs(tT - fT);
    var CO = Math.abs(tL - fL);
    var H = Math.sqrt(CA * CA + CO * CO);
    var ANG = 180 / Math.PI * Math.acos(CA / H);

    if (tT > fT) {
        var top = (tT - fT) / 2 + fT;
    } else {
        var top = (fT - tT) / 2 + tT;
    }
    if (tL > fL) {
        var left = (tL - fL) / 2 + fL;
    } else {
        var left = (fL - tL) / 2 + tL;
    }

    if ((fT < tT && fL < tL) || (tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
        ANG *= -1;
    }
    top -= H / 2;
    const lineElement = document.createElement('div');
    lineElement.classList.add('line');
    lineElement.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
    lineElement.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
    lineElement.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
    lineElement.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
    lineElement.style["-transform"] = 'rotate(' + ANG + 'deg)';
    lineElement.style.top = top + 'px';
    lineElement.style.left = left-10 + 'px';
    lineElement.style.height = H + 'px';
    canvas.appendChild(lineElement);
}