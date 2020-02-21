import ChartBase from "../../Chart/Charts";

const canvas = document.querySelector('#func1-chart-bar');

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

const option = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        onComplete: function (animation) {
            var sourceCanvas = barInstance.instance.chart.canvas;
            var copyWidth = barInstance.instance.scales['y-axis-0'].width - 10;
            var copyHeight = barInstance.instance.scales['y-axis-0'].height + barInstance.instance.scales['y-axis-0'].top + 10;
            var targetCtx = document.getElementById("func1-chart-bar-axis").getContext("2d");
            targetCtx.canvas.width = copyWidth;
            targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
        }
    }
};

const barInstance = new ChartBase('bar', canvas, dataBox, option);
barInstance.create();

export default barInstance;