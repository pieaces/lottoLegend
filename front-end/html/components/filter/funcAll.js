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
<div class="extract-num hide">
  추출된 번호 개수 : <span id="main-stats"></span>
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
      <div class="que-modal func1-bubble-que-modal none">
        <div class="que-cancel func1-bubble-que-cancel">
          <i class="fas fa-times"></i>
        </div>
        <div class="que-text func1-bubble-que-modal-text">
          <ul>
            <li>가로축: 전체포화도:<br>
              전체회차에 대해 수학적 예상값보다 많거나 적음을 수치화:<br>
              왼쪽일수록 포화상태(예상값보다 많이 출현)</li>
            <li>세로축: 최근포화도:<br>
              최근회차에 대해 수학적 예상값보다 많거나 적음을 수치화:<br>
              아래쪽일수록 포화상태(예상값보다 많이 출현)</li>
            <li>농도: 종합포화도:<br>
              전체포화도와 최근포화도를 종합하여 수치로 표현:<br>
              농도가 옅을수록 포화상태(예상값보다 많이 출현)</li>
            <li>크기: 수학적확률<br>
              크기가 클수록 수학적 확률값이 높음(출현가능성이 높음)</li>
            <li>요약: 좌하향, 옅은 농도 => 예상치보다 많이 나왔음을 의미함.<br>
              반면, 우상향, 짙한 농도 => 예상치보다 적게 나왔음을 의미함.<br>
              큰수 법칙 = 시행횟수가 커질수록, 실제값은 확률값을 따른다.<br></li>
            <li>크기, 우상향, 짙은농도를 장기적 경향성으로 연결지을 수 있음.</li>
          </ul>
        </div>
      </div>
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
       <div class="func2-lotto-checkbox func2-num-freq">
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
              <div class="que-modal func2-numboard-que-modal none">
                <div class="que-cancel func2-numboard-que-cancel">
                  <i class="fas fa-times"></i>
                </div>
                <div class="que-text func2-numboard-que-modal-text">
                  <ul>
                    <li></li>
                  </ul>
                </div>
              </div>
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
<div>
<div class="checkbox-textbox func1-layout func2-layout func3-layout-2">
  <div class="checkbox-text">
  </div>
</div>
<div class="showcase-container func1-layout func2-layout func3-layout-2 box-color">
  <div class="func1-checkbox-container func1-layout">
    <div class="func1-checkbox">

    </div>
  </div>
  <div class="func2-select-num-box-container func2-layout none">
    <div class="func2-select-num-box">
    </div>
  </div>
  <div class="next-btn-container func1-layout func2-layout func3-layout-2">
    <button type="reset" class="btn circle-btn" id="reset">초기화</button>
    <button type="button" class="btn circle-btn" id="nextBtn">다음</button>
  </div>
</div>
</div>
<div class="func3-layout-1 none">
<div class="func3-num-count">
  <div class="func3-filter-num">번호의 개수 : 0</div>
  <div class="func3-filter-text">
    <div>홀짝:1</div>
    <div>고저:2</div>
    <div>AC값:1.5</div>
    <div>끝수합:10</div>
  </div>
</div>
<div class="func3-num-container-box">
  <div class="func3-all-check-box">
    <input type="checkbox" name="" id="func3-all-check" />
    <span>모두</span>
  </div>
  <div class="func3-num-container">

  </div>
  <div class="func3-btn-container">
    <button type="button" class="btn circle-btn">저장</button>
  </div>
</div>

</div>`);