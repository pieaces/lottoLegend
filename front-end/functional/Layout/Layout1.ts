import BarSlide from "../Slide/BarSlide";
import LineSlide from "../Slide/LineSlide";
import barSlide from "../instance1/barSlide";
import lineSlide from '../instance1/lineSlide'
import bubbleChart from '../instance1/bubbleInstance'

export default class Layout1 {
    barSlide:BarSlide = barSlide;
    lineSlide:LineSlide = lineSlide;
    bubbleChart = bubbleChart;

    init(){
        barSlide.init();
        lineSlide.init();
        bubbleChart.init();
    }
}