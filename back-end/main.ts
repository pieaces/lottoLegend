import LottoStat from './class/Lotto/LottoStat'
import fetchLotto from './function/fetchLotto'
import Chart from 'chart.js'
import Generator from './class/Generator/Generator'

function cout(obj: any, str = ''): void {
    console.log(str + ":", obj);
}

//mode: 12, 24, 48
let lottoStat: LottoStat = new LottoStat(require('./lotto.json'), 48);

const gen = new Generator();
gen.exceptedLineCount = 1;
gen.exceptedLines = [3];
gen.sum$10 = {from:10, to:15};
gen.oddCount = 3;
gen.$3Count = 2;
gen.ac = {from:7, to:8};
gen.diffMaxMin = {from:32, to:40};
gen.includeNumber = [9];
gen.excludeNumber = [1, 19, 10];
const button = document.getElementById('button');
button.onclick = function () {
    console.log(gen.generate());
}


/*
fetchLotto()
.then(data =>{
    lottoStat = new LottoStat(data);
});
*/
/*
const button = document.getElementById('button');
button.onclick = function () {
    var canvas = <HTMLCanvasElement>document.getElementById("myChart");
    var ctx = canvas.getContext("2d");
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels: ['0', '1', '2', '3', '4', '5', '6'],
            datasets: [{
                label: `Latest ${lottoStat.getSize()} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: lottoStat.gatherOddCount()
            },
            {
                label: `Ideal ${lottoStat.getSize()} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: Statistics.pqc(6, 23/45).map(value => Number((value*lottoStat.getSize()).toFixed(2)))
            },
            ]
        },
    });
}
*/