const roundEl = document.querySelectorAll('.one-line > td:nth-child(1)');
const numsEl = document.querySelectorAll('.one-line');
const sum = document.querySelector<HTMLElement>('#sum');
function check(div: HTMLElement) {
    if (div.classList.contains('lotto-num-checked')) {
        div.style.backgroundColor = 'rgb(101, 39, 158)';
        div.textContent = '2';
    } else if (div.textContent === '') {
        div.classList.add('lotto-num-checked');
        div.textContent = '1';
    } else if (div.textContent === '3') {
        div.style.backgroundColor = 'rgb(15, 0, 29)';
        div.textContent = '4';
    } else if (div.textContent === '2') {
        div.style.backgroundColor = 'rgb(46, 8, 80)';
        div.textContent = '3';
    }
}
export function insertUnitsTable(data: { total: number, lottos: number[][] }) {
    roundEl.forEach((element, index) => {
        element.textContent = (data.total - index).toString();
    });

    const unitsList: number[] = new Array(10).fill(0);
    for (let i = 0; i < numsEl.length; i++) {
        data.lottos[i].forEach(num => {
            const index = num % 10;
            switch (index) {
                case 0:
                    check(numsEl[i].children[10] as HTMLElement);
                    unitsList[9]++;
                    break;
                default:
                    check(numsEl[i].children[index] as HTMLElement);
                    unitsList[index - 1]++;
            }
        })
    }
    for (let i = 1; i < sum.children.length; i++) {
        sum.children[i].textContent = unitsList[i - 1].toString();
    }
}
function check2(div: HTMLElement) {
    div.classList.add('excluded-checked');
    div.textContent = '전멸';
}
export function insertexcludedLinesTable(data: { total: number, excludedLines: boolean[][] }) {
    roundEl.forEach((element, index) => {
        element.textContent = (data.total - index).toString();
    });

    const unitsList: number[] = new Array(5).fill(0);
    for (let i = 0; i < numsEl.length; i++) {
        data.excludedLines[i].forEach((bool, index) => {
            if (bool) {
                check2(numsEl[i].children[index+1] as HTMLElement);
                unitsList[index]++;
            }
        })
    }
    for (let i = 1; i < sum.children.length; i++) {
        sum.children[i].textContent = unitsList[i - 1].toString();
    }
}
