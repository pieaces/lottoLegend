import LottoStat from './class/Lotto/LottoStat'
import fetchLotto from './fetchLotto'
import Chart from 'chart.js'

function cout(obj: any, str = ''): void {
    console.log(str + ":", obj);
}
enum Mode { $1 = 1, $2 = 2, $4 = 4, $12 = 12, $24 = 24, $48 = 48, $96 = 96, $384 = 384 };

let lottoStat: LottoStat = new LottoStat(require('./lotto.json'));
/*
fetchLotto()
.then(data =>{
    lottoStat = new LottoStat(data);
});
*/
const button = document.getElementById('button');
button.onclick = function () {
    const oddCount = lottoStat.gatherOddCount();

    var canvas = <HTMLCanvasElement>document.getElementById("myChart");
    var ctx = canvas.getContext("2d");
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['0', '1', '2', '3', '4', '5', '6'],
            datasets: [{
                label: '홀수 개수',
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: oddCount
            },
            {
                label: '홀수 개수',
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: [10,40,200,300,140,20,10]
            },
            ]
        },
    });
}
