import BarSlide from "../Slide/BarSlide";
import barSlide from "../instance1/barSlide";
import lineSlide from '../instance1/lineSlide2'
import bubbleChart from '../instance1/bubbleInstance'
import LineSlide2 from "../Slide/LineSlide2";
import { makeModal } from "../../../functions";

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
const bubbleInfo = `<span class="modal-pc-text" style="font-size: 1.4rem;font-weight: 400;color: #bdbdbd;">*움직여보세요.</span>
우리의 모티브는 아래와 같습니다.
"수백회차가 진행되는 동안, 출현했던 번호만 계속 나온다면,
<span style="color:black;font-weight:bold;">대수법칙</span>은 충족되지 않을것입니다."

기존의 통계자료는 숫자만 덩그러니 놓여있어 분석하기 불편했습니다.
따라서 새로운 도구가 필요하였는데, 통계학의 <span style="color:black;font-weight:bold;">산포도 그래프</span>에서 아이디어를 가져왔습니다.
그리고 우리는 그 결과물을 이와 같이 나타내었습니다.

*<span style="color:green;font-weight:bold;">가로방향</span>: 전체 회차에 대해서, 수학적 예상값과 실제값의 차이를 수치화하였습니다.
왼쪽일수록 예상값 초과, 오른쪽일수록 미만을 의미합니다.

*<span style="color:green;font-weight:bold;">세로방향</span>: 최근 회차에 대해서, 수학적 예상값과 실제값의 차이를 수치화하였습니다.
아래쪽일수록 예상값 초과, 위쪽일수록 미만을 의미합니다.

*<span style="color:green;font-weight:bold;">농도</span>: 가로방향과 세로방향의 값을 산술처리로 종합하였습니다.

*<span style="color:green;font-weight:bold;">크기</span>: 크기가 클수록 수학적 확률값, 즉 출현확률 자체가 높음을 의미합니다.

<span style="font-size:1.2rem">예시1) 좌하향, 옅은 농도 => 해당 수치가 예상치보다 많이 나왔음을 의미합니다.
예시1) 우상향, 짙한 농도 => 해당 수치가 예상치보다 적게 나왔음을 의미합니다.</span>`;
export default class Layout1 {
    barSlide: BarSlide = barSlide;
    lineSlide: LineSlide2 = lineSlide;
    bubbleChart = bubbleChart;
    constructor() {
        document.querySelector<HTMLElement>('.func1-bubble-que').addEventListener('click', () => {
            makeModal(bubbleInfo, 60);
        });
    }
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