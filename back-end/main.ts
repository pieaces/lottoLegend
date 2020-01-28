import Lotto from './class/Lotto/Lotto'
import Chart from 'chart.js'
import Generator from './class/Generator/Generator'

function cout(obj: any, str = ''): void {
    console.log(str + ":", obj);
}

//mode: 12, 24, 48
const lotto: Lotto = new Lotto(require('./json/lotto.json'));

const gen = new Generator({lowCount:2, excludeNumbers:[4,11,42], includeNumbers:[3], sum:{from:130,to:160}});
/*
const button = document.getElementById('button');
button.onclick = function () {
    gen.generate();
    console.log(gen.getGeneratedNumbers());
}
*/
const method1 = lotto.gather$3Count.bind(lotto);
const method2 = lotto.expected$3Count.bind(lotto);

const button = document.getElementById('button');

    var canvas1 = <HTMLCanvasElement>document.getElementById("myChart1");
    var canvas2 = <HTMLCanvasElement>document.getElementById("myChart2");
    var canvas3 = <HTMLCanvasElement>document.getElementById("myChart3");
    var canvas4 = <HTMLCanvasElement>document.getElementById("myChart4");
    var ctx1 = canvas1.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    var ctx3 = canvas3.getContext("2d");
    var ctx4 = canvas4.getContext("2d");
    var chart1 = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels: ['0', '1', '2', '3', '4', '5', '6'],
            datasets: [{
                label: `Latest ${lotto.mode} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:12})
            },
            {
                label: `Ideal ${lotto.mode} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2(12)
            },
            ]
        },
    });

    var chart1 = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels: ['0', '1', '2', '3', '4', '5', '6'],
            datasets: [{
                label: `Latest ${lotto.mode} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:24})
            },
            {
                label: `Ideal ${lotto.mode} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2(24)
            },
            ]
        },
    });

    var chart1 = new Chart(ctx3, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels: ['0', '1', '2', '3', '4', '5', '6'],
            datasets: [{
                label: `Latest ${lotto.mode} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:48})
            },
            {
                label: `Ideal ${lotto.mode} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2(48)
            },
            ]
        },
    });

    var chart1 = new Chart(ctx4, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels: ['0', '1', '2', '3', '4', '5', '6'],
            datasets: [{
                label: `Latest ${lotto.mode} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1()
            },
            {
                label: `Ideal ${lotto.mode} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2()
            },
            ]
        },
    });

