import { setColorLotto } from "../../functions";

export function getStaticsName(method: string) {
    let name: string;
    switch (method) {
        case 'excludedLineCount': name = '전멸구간&개수'
            break;
        case "carryCount": name = '이월수&개수'
            break;
        case "lowCount": name = '저값 개수'
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
            filterArrow.classList.remove("owf-down");
            filterArrow.classList.add("owf-up");
            filterListBox.classList.remove("none");
        } else {
            filterArrow.classList.add("owf-down");
            filterArrow.classList.remove("owf-up");
            filterListBox.classList.add("none");
        }
        flag = !flag;

        e.stopPropagation();
    }

    function dropDownExceptEvent(e) {
        if (flag) {
            //target 다른 곳
            filterListBox.classList.add("none");
            filterArrow.classList.add("owf-down");
            filterArrow.classList.remove("owf-up");
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
    let upperBoxes: HTMLDivElement[] = [];
    let underBoxes: HTMLDivElement[] = [];

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

        let lineBox: HTMLDivElement;
        if (info[index - 1]) {
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

        let count = 0;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                if (count >= info[index - 1]) break;

                if (Number(underBoxes[i] && underBoxes[i].textContent) === Number(upperBoxes[j].textContent)) {
                    adjustLine(underBoxes[i], upperBoxes[j], lineBox, Number(underBoxes[i].textContent));
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

function adjustLine(from: HTMLElement, to: HTMLElement, canvas: HTMLElement, num: number) {
    from.classList.add('canvas-num-checked');
    to.classList.add('canvas-num-checked');
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
    setColorLotto(num, lineElement);
    
    const darkenColor = LightenDarkenColor(lineElement.style.backgroundColor, -85);
    from.style.borderColor = darkenColor;
    to.style.borderColor = darkenColor;
    lineElement.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
    lineElement.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
    lineElement.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
    lineElement.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
    lineElement.style["-transform"] = 'rotate(' + ANG + 'deg)';
    lineElement.style.top = top + 'px';
    lineElement.style.left = left - 7 + 'px';
    lineElement.style.height = H + 'px';
    canvas.appendChild(lineElement);
}

export function LightenDarkenColor(_colorCode:string, amount:number) {
    let colorCode = _colorCode;
    if (colorCode[0] == "#") {
        colorCode = colorCode.slice(1);
    }else{
        colorCode = rgbToHex(colorCode).slice(1);
    }
 
    var num = parseInt(colorCode, 16);
 
    var r = (num >> 16) + amount;
 
    if (r > 255) {
        r = 255;
    } else if (r < 0) {
        r = 0;
    }
 
    var b = ((num >> 8) & 0x00FF) + amount;
 
    if (b > 255) {
        b = 255;
    } else if (b < 0) {
        b = 0;
    }
 
    var g = (num & 0x0000FF) + amount;
 
    if (g > 255) {
        g = 255;
    } else if (g < 0) {
        g = 0;
    }
 
    return  "#"  + (g | (b << 8) | (r << 16)).toString(16);
}

function rgbToHex ( rgbType ){ 
    var rgb = rgbType.replace( /[^%,.\d]/g, "" ); 
    rgb = rgb.split( "," ); 

    for ( var x = 0; x < 3; x++ ) { 
            if ( rgb[ x ].indexOf( "%" ) > -1 ) rgb[ x ] = Math.round( parseFloat( rgb[ x ] ) * 2.55 ); 
    } 

    var toHex = function( string ){ 
            string = parseInt( string, 10 ).toString( 16 ); 
            string = ( string.length === 1 ) ? "0" + string : string; 

            return string; 
    }; 

    var r = toHex( rgb[ 0 ] ); 
    var g = toHex( rgb[ 1 ] ); 
    var b = toHex( rgb[ 2 ] ); 

    var hexType = "#" + r + g + b; 

    return hexType; 
} 