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
const method1 = lotto.gatherSum49.bind(lotto);
const method2 = lotto.expectedSum49.bind(lotto);
const labels:string[] = [];
for(let i =0; i<=25; i++){
    labels.push(i.toString());
}
const button = document.getElementById('button');

    var canvas1 = <HTMLCanvasElement>document.getElementById("myChart1");
    var canvas2 = <HTMLCanvasElement>document.getElementById("myChart2");
    var canvas3 = <HTMLCanvasElement>document.getElementById("myChart3");
    var canvas4 = <HTMLCanvasElement>document.getElementById("myChart4");
    var canvas5 = <HTMLCanvasElement>document.getElementById("myChart5");
    var canvas6 = <HTMLCanvasElement>document.getElementById("myChart6");
    var canvas7 = <HTMLCanvasElement>document.getElementById("myChart7");
    var canvas8 = <HTMLCanvasElement>document.getElementById("myChart8");
    var canvas9 = <HTMLCanvasElement>document.getElementById("myChart9");
    var canvas10 = <HTMLCanvasElement>document.getElementById("myChart10");
    var canvas11 = <HTMLCanvasElement>document.getElementById("myChart11");
    var canvas12 = <HTMLCanvasElement>document.getElementById("myChart12");

    var ctx1 = canvas1.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    var ctx3 = canvas3.getContext("2d");
    var ctx4 = canvas4.getContext("2d");
    var ctx5 = canvas5.getContext("2d");
    var ctx6 = canvas6.getContext("2d");
    var ctx7 = canvas7.getContext("2d");
    var ctx8 = canvas8.getContext("2d");
    var ctx9 = canvas9.getContext("2d");
    var ctx10 = canvas10.getContext("2d");
    var ctx11 = canvas11.getContext("2d");
    var ctx12 = canvas12.getContext("2d");
    var chart1 = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels,
            datasets: [{
                label: `${12} ${method1.name}`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:12})
            },
            {
                label: `Ideal ${12} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2({mode:12})
            },
            ]
        },
        options: {
            // This chart will not respond to mousemove, etc
            events: ['click']
        }
    });

    
    var chart2 = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels,
            datasets: [{
                label: `Latest ${24} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:24})
            },
            {
                label: `Ideal ${24} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2({mode:24})
            },
            ]
        },
    });

    var chart3 = new Chart(ctx3, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels,
            datasets: [{
                label: `Latest ${48} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:48})
            },
            {
                label: `Ideal ${48} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2({mode:48})
            },
            ]
        },
    });

    var chart4 = new Chart(ctx4, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels,
            datasets: [{
                label: `Latest ${96} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:96})
            },
            {
                label: `Ideal ${96} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2({mode:96})
            },
            ]
        },
    });

    var chart5 = new Chart(ctx5, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels,
            datasets: [{
                label: `Latest ${384} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:384})
            },
            {
                label: `Ideal ${384} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2({mode:384})
            },
            ]
        },
    });


    var chart7 = new Chart(ctx7, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels,
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
    var chart9 = new Chart(ctx9, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels,
            datasets: [{
                label: `Latest ${12} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:-12})
            },
            {
                label: `Ideal ${12} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2({mode:-12})
            },
            ]
        },
    });
    var chart10 = new Chart(ctx10, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels,
            datasets: [{
                label: `Latest ${24} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:[-12, -24]})
            },
            {
                label: `Ideal ${24} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2({mode:[-12,-24]})
            },
            ]
        },
    });
    var chart11 = new Chart(ctx11, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels,
            datasets: [{
                label: `Latest ${48} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:[-24, -36]})
            },
            {
                label: `Ideal ${48} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2({mode:[-24, -36]})
            },
            ]
        },
    });
    var chart12 = new Chart(ctx12, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //labels: new Array<number>(893).fill(0).map((item, index) => index+1).map(value => String(value)),
            labels,
            datasets: [{
                label: `Latest ${894-768} Lotto Odd Count`,
                //backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: method1({mode:[-36, -48]})
            },
            {
                label: `Ideal ${894-768} Odd Count`,
                //backgroundColor: 'rgb(99, 99, 132)',
                borderColor: 'rgb(14, 99, 132)',
                data: method2({mode:[-36, -48]})
            },
            ]
        },
    });