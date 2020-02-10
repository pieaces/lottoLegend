import BarSlide from "../Slide/BarSlide";
import LineSlide from "../Slide/LineSlide";
import barSlide from "../function1/barSlide";
import lineSlide from '../function1/lineSlide'
import bubbleChart from '../function1/bubbleInstance'
import Base from "./Base";

export default class Layout1 extends Base {
    barSlide:BarSlide = barSlide;
    lineSlide:LineSlide = lineSlide;
    bubbleChart = bubbleChart;

    constructor() {
        super();
    }
    init(){
        barSlide.init();
        lineSlide.init();
        bubbleChart.init();
    }
}