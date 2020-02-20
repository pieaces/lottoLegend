import Chart from 'chart.js'

const ctx = document.querySelector('#func1-chart-bar').getContext('2d');
const dataBox = {
    labels: [1, 2, 3, 4, 5, 7],
    datasets: [
        {
            label: [1, 2, 3, 4, 5, 6],
            backgroundColor: '#00B2EA',
            data: [1, 2, 3, 4, 5, 6,]
        }
    ]
};

const barInstance = new Chart(ctx, {
    type: 'bar',
    data: dataBox,
    options: {

        onAnimationProgress: function () {
            const sourceCanvas = this.chart.ctx.canvas;
            const copyWidth = this.scales["x-axis-0"].paddingLeft - 5;
            const copyHeight = this.scales["y-axis-0"].bottom + 5;
            console.log(this);
            const targetCtx = document.getElementById("func1-chart-bar-axis").getContext("2d");

            targetCtx.canvas.width = copyWidth;

            targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
        }

    }
});


export default barInstance;