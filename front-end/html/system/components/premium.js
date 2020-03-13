document.write(`<div class="filter-box-container-box func1-layout func2-layout box-color">
    <div class="filter-box-container">
        <div class="filter-box">
            <span></span>
            <i class="fas fa-sort-down filter-arrow"></i>
            <ul class="filter-list none">
            </ul>
        </div>
    </div>
    <div class="steps">
        <div class="past">
            <span> <strong></strong> </span>
        </div>
        <div class="triangle"></div>
        <div class="present">
            <span> <strong>1</strong> </span><i></i>
        </div>
        <div class="triangle"></div>
        <div class="future">
            <span> <strong>2</strong> </span>
        </div>
    </div>
</div>
<div class="auto-choose-container-box func1-layout func3-layout-2">
    <div class="extract-num box-color hide">
        추출된 번호 개수 : &nbsp;<span id="main-stats"></span>
    </div>
    <div class="auto-choose-container">
        <button type="button" class="btn circle-btn auto-choose">
            자동 선택
        </button>
    </div>
</div>
<div class="func1-layout">
    <div class="left-right-container func1-main-box-1">
        <div class="left-container func1-chart-container box-color">
            <div class="func1-chart-slide-num func1-chart-line-num">
                <div class="chart-slide-current ">1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
            </div>
            <div class="func1-chart-box">

                <canvas id="func1-chart-line"></canvas>
            </div>
            <div class="func1-chart-slide-btn-box">
                <i id="func1-left-line-chart-btn" class="func1-left-chart-btn fas fa-angle-left "></i>
                <i id="func1-right-line-chart-btn" class="func1-right-chart-btn fas fa-angle-right "></i>
            </div>
        </div>
        <div class="right-container func1-chart-textbox-container">
            <div class="func1-chart-textbox">
                <div class="func1-chart-title func1-line-values">
                    <div>
                        <div id="func1-line-times"></div>
                        <div id="func1-line-filter-name"></div>
                    </div>
                    <div>수학적 예상 개수</div>
                    <div>실제 당첨 개수</div>
                    <div>예측대비 실제 비율(%)</div>
                </div>
                <div class="func1-chart-value">
                    <table class="table-1 table" id="func1-line-table">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="left-right-container func1-main-box-1">
        <div class="left-container func1-chart-container box-color">
            <div class="func1-chart-slide-num func1-chart-bar-num">
                <div class="chart-slide-current ">1</div>
                <div>2</div>
                <div>3</div>
            </div>
            <div class="func1-chart-box">

                <canvas id="func1-chart-bar"></canvas>
            </div>
            <div class="func1-chart-slide-btn-box">
                <i id="func1-left-bar-chart-btn" class="func1-left-chart-btn fas fa-angle-left  "></i>
                <i id="func1-right-bar-chart-btn" class="func1-right-chart-btn fas fa-angle-right  "></i>
            </div>
        </div>
        <div class="right-container func1-chart-textbox-container">
            <div class="func1-chart-textbox">
                <div class="func1-chart-title func1-bar-values">
                    <div id="func1-bar-filter-name"></div>
                    <div>
                        최근 12회차 <span id="func1-bar-value-name"></span>
                    </div>
                </div>
                <div class="func1-chart-value">
                    <table class="table-1 table" id="func1-bar-table">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="left-right-container func1-main-2-box">
        <div class="left-container func1-chart-container box-color">
            <div class="que-container func1-bubble-que">
                <i class="far fa-question-circle"></i>
            </div>
            <div id="func1-chart-bubble">
            </div>
        </div>
        <div class="right-container func1-chart-textbox-container">
            <table class="table-2 table" id="func1-bubble-table">
                <tr>
                    <td>평균 : <span id="func1-bubble-mean-value"></span> </td>
                    <td>표준편차 : <span id="func1-bubble-stdev-value"></span> </td>
                </tr>
                <tr>
                    <td>최솟값 : <span id="func1-bubble-min-value"></span> </td>
                    <td>최댓값 : <span id="func1-bubble-max-value"></span> </td>
                </tr>
                <tr>
                    <td>68% 범위 : <span id="func1-bubble-s-percent-value"></span></td>
                    <td>95% 범위 : <span id="func1-bubble-b-percent-value"></span></td>
                </tr>
            </table>
            <div class="func1-bubble-text">
            </div>
        </div>


    </div>
</div>
<div class="func2-layout func3-layout-2 none">
    <div class="left-right-container func2-main-1-box">
        <div class="left-container box-color">
            <div class="func2-win-num-container-box">
            </div>
        </div>
        <div class="right-container box-color">
            <div class="func2-chart-gauss-container">
                <canvas class="func2-chart-gauss"></canvas>
            </div>
        </div>
    </div>
    <div class="left-right-container func2-main-2-box">
        <div class="left-container box-color">
            <div class="func2-lotto-checkbox-container">
                <div class="func2-lotto-checkbox func2-num-term func2-lotto-check-current">
                    번호빈도
                </div>
                <div class="func2-lotto-checkbox func2-num-freq ">
                    번호간격
                </div>
                <div class="func2-lotto-checkbox func2-num-freq-term">
                    빈도X간격
                </div>
            </div>
            <div class="func2-lotto-num-container">
                <table class="func2-lotto-num-box">
                    <tr>
                        <td>
                            <div class=" func2-lotto-num"> 1
                            </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 2
                            </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 3
                            </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 4
                            </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 5
                            </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 6
                            </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 7
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" func2-lotto-num"> 8
                            </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 9
                            </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 10</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 11</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 12</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 13</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 14</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" func2-lotto-num"> 15 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 16 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 17 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 18 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 19 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 20 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 21 </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" func2-lotto-num"> 22 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 23 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 24 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 25 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 26 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 27 </div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num"> 28 </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" func2-lotto-num">29</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">30</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">31</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">32</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">33</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">34</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">35</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" func2-lotto-num">36</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">37</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">38</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">39</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">40</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">41</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">42</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" func2-lotto-num">43</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">44</div>
                        </td>
                        <td>
                            <div class=" func2-lotto-num">45</div>
                        </td>

                        <td colspan="2">
                            <div class="que-container func2-numboard-que">
                                <i class="far fa-question-circle"></i>
                            </div>
                        </td>
                        <td colspan="2" class="func2-lotto-num-except">
                            <button type="button" class="btn circle-btn" id="func2-num-inc-exc-btn">
                                제외
                            </button>
                        </td>
                    </tr>
                </table>


            </div>

        </div>

        <div class="right-container">
            <div class="func2-chart-radar-container-box box-color">

                <div class="func2-chart-radar-container">
                    <div class="que-container func2-radar-que">
                        <i class="far fa-question-circle"></i>
                    </div>
                    <div class="func2-chart-radar-box">
                        <canvas class="func2-chart-radar"></canvas>
                    </div>
                </div>
                <div class="stats-container">
                    <div class="stats-box">

                        <div class="stats-mean-term-text">
                            간격 평균
                        </div>
                        <div class="stats-mean-value">

                        </div>

                    </div>
                    <div class="stats-box">

                        <div class="stats-stdev-term-text">
                            전체 68%의
                            <br />간격
                        </div>
                        <div class="stats-68-value">

                        </div>

                    </div>
                    <div class="stats-box">

                        <div class="stats-last-show-num-text">
                            전체 95%의
                            <br />간격
                        </div>
                        <div class="stats-95-value">

                        </div>

                    </div>
                    <div class="stats-box">

                        <div class="stats-last-show-date-text">
                            마지막
                            <br />출현
                        </div>
                        <div class="stats-last-value">

                        </div>

                    </div>
                </div>


            </div>
            <div class="func2-chart-bar-container box-color">
                <canvas class="func2-chart-bar"></canvas>
            </div>
        </div>
    </div>
</div>

<div class="func3-layout none">
    <div class="func3-filter-container-box-1 box-color">
        <div class="func3-filter-container ">
            <div class="func3-filter-title">전멸구간</div>
            <div class="func3-filter-value-container">
                <div class="func3-filter-value-box " id="excludedLineCount-text">
                </div>
            </div>
        </div>
        <div class="func3-filter-container">
            <div class="func3-filter-title">이월수</div>
            <div class="func3-filter-value-container">
                <div class="func3-filter-value-box">
                    <div class="func3-select-num">1</div>
                    <div class="func3-select-num">2</div>
                    <div class="func3-select-num">3</div>
                    <div class="func3-select-num">4</div>
                    <div class="func3-select-num">5</div>
                    <div class="func3-select-num">6</div>
                    <div class="func3-select-num">7</div>
                    <div class="func3-select-num">8</div>
                    <div class="func3-select-num">9</div>
                    <div class="func3-select-num">10</div>
                </div>
            </div>
        </div>

        <div class="func3-filter-container">
            <div class="func3-filter-title">나의 추천수</div>
            <div class="func3-filter-value-container">
                <div class="func3-filter-value-box" id="include">
                </div>
            </div>
        </div>
        <div class="func3-filter-container">
            <div class="func3-filter-title">나의 제외수</div>
            <div class="func3-filter-value-container">
                <div class="func3-filter-value-box" id="exclude">
                </div>
            </div>
        </div>

    </div>
    <div class="func3-filter-container-box-2">
        <table class="table func3-filter-table">
            <tr>
                <td>저값 개수</td>
                <td>번호 합계</td>
                <td>홀수 개수</td>
                <td>소수 개수</td>
                <td>3배수 개수</td>
                <td>첫수 합</td>
                <td>고저 차</td>
                <td>AC</td>
                <td>연속수 포함</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
            </tr>
        </table>
    </div>
    <div class="line-gen-toggle-btn-box">
        <button type="button" class="btn line-gen-toggle-btn">구간(색상)별 개수 조건 추가</button>
    </div>
    <div class="line-gen-num-container">
        <table class="table line-gen-num-table">
            <tr>
                <td>
                    <div class="line-gen-num-input-container">
                        <label for="first-nums">1번대</label>
                        <div class="line-gen-num-input-box">
                            <input type="number" id="first-nums">
                        </div>
                    </div>
                </td>
                <td>
                    <div class="line-gen-num-input-container">
                        <label for="tenth-nums">10번대</label>
                        <div class="line-gen-num-input-box">
                            <input type="number" id="tenth-nums">
                        </div>
                    </div>
                </td>
                <td>
                    <div class="line-gen-num-input-container">
                        <label for="twentieth-nums">20번대</label>
                        <div class="line-gen-num-input-box">
                            <input type="number" id="twentieth-nums">
                        </div>
                    </div>
                </td>
                <td>
                    <div class="line-gen-num-input-container">
                        <label for="thirtieth-nums">30번대</label>
                        <div class="line-gen-num-input-box">
                            <input type="number" id="thirtieth-nums">
                        </div>
                    </div>
                </td>
                <td>
                    <div class="line-gen-num-input-container">
                        <label for="fortieth-nums">40번대</label>
                        <div class="line-gen-num-input-box">
                            <input type="number" id="fortieth-nums">
                        </div>
                    </div>
                </td>

            </tr>
        </table>
        <div class="line-gen-make-btn-box">
            <button type="button" class="btn make-btn" id="make">생성</button>
        </div>
    </div>
    <div class="line-gen-stack-chart-container ">
        <div class="line-gen-stack-chart-box box-color">
            <canvas id="predict-canvas"></canvas>
        </div>
        <div class="line-gen-stack-chart-box box-color">
            <canvas id="actual-canvas"></canvas>
        </div>
        <div class="line-gen-stack-chart-box box-color">
            <canvas id="lately-canvas"></canvas>
        </div>
        <div class="line-gen-stack-chart-box box-color">
            <canvas id="selection-canvas"></canvas>
        </div>
    </div>
    <div class="func3-num-wrapper none">
        <div class="func3-all-check-box-container box-color">
            <div class="func3-all-check-box">
                <div class="input-checkbox-container">
                    <input type="checkbox" id="all-check" />
                    <div class="input-checkbox-text-box">
                        <div class="input-checkbox-text none">
                            ✔
                        </div>
                    </div>
                </div>
            </div>

            <span>모두</span>
            <div class="func3-save-box-1">
                <button type="button" class="btn save-btn">저장</button>
            </div>
        </div>
        <div class="func3-num-container-box">
        </div>
        <div class="func3-save-box-2 box-color">
            <button type="button" class="btn save-btn">저장</button>
        </div>
    </div>
</div>`);