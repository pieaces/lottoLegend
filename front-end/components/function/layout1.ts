const text = `<div class="func1 section1">
<div class="grid-section-1 container">
  <div class="aside">
    <div class="aside-top">
      <div class="aside-1-1">
        마이 페이지
      </div>
    </div>
    <div class="aside-bottom">
      <div class="aside-1-2"></div>
      <div class="aside-1-3"></div>
      <div class="aside-1-4"></div>
      <div class="aside-1-5"></div>
    </div>
  </div>

  <div class="main">
    <div class="main-1-1">
      <div class="filter-box-container">
        <div class="filter-box">
          <a href="#">1</a>
          <i class="fas fa-sort-down filter-arrow"></i>
          <ul class="filter-list">
            <li>1-1</li>
            <li>1-2</li>
            <li>2</li>
            <li>3-1</li>
            <li>3-2</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
          </ul>
        </div>
      </div>
      <ul class="steps">
        <li class="past">
          <span> <strong></strong> </span>
        </li>
        <li class="present">
          <span> <strong>1</strong> </span><i></i>
        </li>
        <li class="future">
          <span> <strong>2</strong> </span>
        </li>
      </ul>
    </div>
    <div class="main-1-2">
      <div class="chart-slide-num chart-line-num">
        <div class="chart-slide-current ">1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
      <div class="chart-container">
        <i
          id="left-line-chart-btn"
          class="left-chart-btn fas fa-angle-left fa-4x "
        ></i>

        <i
          id="right-line-chart-btn"
          class="right-chart-btn fas fa-angle-right fa-4x "
        ></i>
        <canvas id="chart-func1-line" class="chart"></canvas>
      </div>
    </div>
    <div class="main-2-2">
      0
    </div>

    <div class="main-1-3">
      <div class="chart-slide-num chart-bar-num">
        <div class="chart-slide-current ">1</div>
        <div>2</div>
        <div>3</div>
      </div>
      <div class="chart-container">
        <i
          id="left-bar-chart-btn"
          class="left-chart-btn fas fa-angle-left fa-4x "
        ></i>

        <i
          id="right-bar-chart-btn"
          class="right-chart-btn fas fa-angle-right fa-4x "
        ></i>
        <canvas id="chart-func1-bar" class="chart"></canvas>
      </div>
    </div>
    <div class="main-2-3">0</div>

    <div class="main-1-4">
      <div id="chart-func1-bubble" class="chart"></div>
    </div>

    <div class="main-2-4"></div>

    <div class="main-1-5">
      <div class="checkbox-container">
        <div>
          1
          <input type="checkbox" name="" id="" class="checkbox" />
        </div>
        <div>
          2
          <input type="checkbox" name="" id="" class="checkbox" />
        </div>
        <div>
          3
          <input type="checkbox" name="" id="" class="checkbox" />
        </div>

        <div>
          4
          <input type="checkbox" name="" id="" class="checkbox" />
        </div>
        <div>
          5
          <input type="checkbox" name="" id="" class="checkbox" />
        </div>

        <div>
          6
          <input type="checkbox" name="" id="" class="checkbox" />
        </div>
      </div>
      <div class="next-btn-container">
        <button type="reset" class="btn circle-btn">초기화</button>
        <button type="button" class="btn circle-btn" id="nextBtn">다음</button>
      </div>
    </div>
  </div>
</div>
</div>
`;

export default text;