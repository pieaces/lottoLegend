import BarSlide from "../Slide/BarSlide";
import LineSlide from "../Slide/LineSlide";
import barSlide from "../instance1/barSlide";
import lineSlide from '../instance1/lineSlide'
import bubbleChart from '../instance1/bubbleInstance'

const meanValue = document.querySelector('#func1-bubble-mean-value');
const stdevValue = document.querySelector('#func1-bubble-stdev-value');
const minValue = document.querySelector('#func1-bubble-min-value');
const maxValue = document.querySelector('#func1-bubble-max-value');
const smallPercent = document.querySelector('#func1-bubble-s-percent-value');
const bigPercent = document.querySelector('#func1-bubble-b-percent-value');

interface Stats {
    mean: number;
    stdev: number;
    max: number;
    min: number;
}
function range(mean: number, stdev: number, multiple: number): [number, number] {
    return [mean - stdev * multiple, mean + stdev * multiple];
}
function rangeString(range: [number, number], min: number, max: number): string {
    return (range[0] < min ? min : range[0]).toFixed(2) + '~' + (range[1] > max ? max : range[1]).toFixed(2)
}
export default class Layout1 {
    options: any = [];
    barSlide: BarSlide = barSlide;
    lineSlide: LineSlide = lineSlide;
    bubbleChart = bubbleChart;

    public setStatsBoard(stats: Stats) {
        meanValue.textContent = stats.mean.toFixed(2);
        stdevValue.textContent = stats.stdev.toFixed(2);
        maxValue.textContent = stats.max.toFixed(2);
        minValue.textContent = stats.min.toFixed(2);
        const sRange = range(stats.mean, stats.stdev, 1);
        const bRange = range(stats.mean, stats.stdev, 2);
        smallPercent.textContent = rangeString(sRange, stats.min, stats.max);
        bigPercent.textContent = rangeString(bRange, stats.min, stats.max);
    }

    public clearStatsBoard() {
        meanValue.textContent = "";
        stdevValue.textContent = "";
        maxValue.textContent = "";
        minValue.textContent = "";
        smallPercent.textContent = "";
        bigPercent.textContent = "";
    }
}