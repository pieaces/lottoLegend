import LottoStat from './class/Lotto/LottoStat'
import fetchLotto from './fetchLotto'
import Chart from 'chart.js'

function cout(obj: any, str = ''): void {
    console.log(str + ":", obj);
}
const AC = [0, 0.0001, 0.001, 0.0032, 0.0127, 0.0295, 0.1011, 0.1410, 0.325, 0.1976, 0.1854]
//mode: 12, 24, 48
let lottoStat: LottoStat = new LottoStat(require('./lotto.json'), 24);
cout(lottoStat.gatherCarry(), 'carry');
cout(lottoStat.gatherLineCount(), 'lineCount');
cout(lottoStat.factLineCount(lottoStat.mode), 'lineFACT');
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