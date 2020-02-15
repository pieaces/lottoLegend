import BarSlide from "../Slide/BarSlide";
import LineSlide from "../Slide/LineSlide";
import barSlide from "../instance1/barSlide";
import lineSlide from '../instance1/lineSlide'
import bubbleChart from '../instance1/bubbleInstance'

const mean = document.querySelector<HTMLElement>('.func1-mean-value');
const stdev = document.querySelector<HTMLElement>('.func1-stdev-value');
const min = document.querySelector<HTMLElement>('.func1-min-value');
const max = document.querySelector<HTMLElement>('.func1-max-value');
const filteredCount = document.querySelector<HTMLElement>('func1-filtered-value');
const statsBoard = document.querySelector<HTMLElement>('.func1-stats-box ');

interface Stats{
    mean?:number;
    stdev?:number;
    max?:number;
    min?:number;
    filteredCount?:number;
}
function isNumber(num): num is number{
    return typeof num === 'number'
}
export default class Layout1 {
    options: any = [];
    barSlide: BarSlide = barSlide;
    lineSlide: LineSlide = lineSlide;
    bubbleChart = bubbleChart;

    public setStatsBoard(stats:Stats){
        console.log(stats);
        if(isNumber(stats.mean)) mean.textContent = stats.mean.toFixed(2);
        if(isNumber(stats.stdev)) stdev.textContent = stats.stdev.toFixed(2);
        if(isNumber(stats.max)) max.textContent = stats.max.toFixed(2);
        if(isNumber(stats.min)) min.textContent = stats.min.toFixed(2);
        if(isNumber(stats.filteredCount)) {
            filteredCount.textContent = stats.filteredCount.toFixed(2);
            statsBoard;
        }
    }
}