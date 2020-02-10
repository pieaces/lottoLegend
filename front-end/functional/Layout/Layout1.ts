import BarSlide from "../Slide/BarSlide";
import LineSlide from "../Slide/LineSlide";
import barSlide from "../function1/barSlide";
import lineSlide from '../function1/lineSlide'
import bubbleChart from '../function1/bubbleInstance'

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