const header = document.querySelector("#header");
const logo = document.querySelector(".logo > a >h1");
const headerHeight = header.style.height;
const ctx = document.getElementById('myChart').getContext('2d');
/*
[
  0, 0, 1, 5,
  3, 2, 1
] [
  0.16384841642251924,
  1.0277764302867114,
  2.686233851885722,
  3.7444471874770664,
  2.9359869992717913,
  1.2277763815136578,
  0.21393073314253125
]
[
  1, 1, 4, 8,
  5, 4, 1
] [
  0.3276968328450385,
  2.055552860573423,
  5.372467703771444,
  7.488894374954133,
  5.871973998543583,
  2.4555527630273155,
  0.4278614662850625
]
[
   3, 4, 10, 12,
  11, 7,  1
] [
  0.655393665690077,
  4.111105721146846,
  10.744935407542888,
  14.977788749908266,
  11.743947997087165,
  4.911105526054631,
  0.855722932570125
]
[
   10, 60, 198, 309,
  231, 70,  16
] [
  12.206707023477684,
  76.56934405636001,
  200.1244219654863,
  278.96131546704146,
  218.73103144574847,
  91.4693404227675,
  15.937839619118579
]
*/
const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['0', '1', '2', '3', '4', '5', '6'],
        datasets: [{
            label: '실제 홀수',
            borderColor: '#0026ca',
            data: [
              0, 0, 1, 5,
              3, 2, 1
            ],
            fill: false
        },
        {
            label: '이상적',
            borderColor: '#388e3c',
            data: [
              0.16384841642251924,
              1.0277764302867114,
              2.686233851885722,
              3.7444471874770664,
              2.9359869992717913,
              1.2277763815136578,
              0.21393073314253125
            ],
            fill: false
        }]
    },

    // Configuration options go here
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: '로또리나'
        }
    }
});

// const chart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
//         datasets: [
//             {
//                 label: "Population (millions)",
//                 backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
//                 data: [2478, 5267, 734, 784, 433]
//             }
//         ]
//     },
//     options: {
//         legend: { display: false },
//         title: {
//             display: true,
//             text: 'Predicted world population (millions) in 2050'
//         }
//     }
// });

window.addEventListener('scroll', (e) => {
    const branchPercent = 0.2;
    if (window.scrollY <= (window.innerHeight) * (branchPercent / 2)) {
        header.style.height = headerHeight;
        logo.style.fontSize = "2rem";
    }
    else {
        header.style.height = "55px";
        logo.style.fontSize = "1.5rem";
    }
});

