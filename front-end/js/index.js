const header = document.querySelector("#header");
const logo = document.querySelector(".logo > a >h1");
const headerHeight = header.style.height;
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['0', '1', '2', '3', '4', '5', '6'],
        datasets: [{
            label: '실제 홀수',
            borderColor: '#0026ca',
            data: [0, 10, 5, 2, 20, 30, 45],
            fill: false
        },
        {
            label: '이상적',
            borderColor: '#388e3c',
            data: [0, 5, 7, 10, 8, 15, 13],
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

