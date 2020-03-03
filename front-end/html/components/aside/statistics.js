document.write(`
<div class="anchor-title">
분석실
</div>
<ul class="anchor-list-container">
<li>
    <h3> <a href="../analBoard/analList.html">분석 Tip 공유</a></h3>
</li>
<li>
    <h3> <a href="../incExcBoard/incExcNumList.html">포함/제외수 공유</a> </h3>
</li>
<li class="arrow-box">
    <h3> <a href="#">통계자료</a><i class="fas fa-sort-up filter-arrow"></i> </h3>
    <ul class="anchor-list-box">
        <li> <a href="statsHome.html">통계 홈</a> </li>
        <li> <a href="statistics.html?method=excludedLineCount">전멸구간 개수</a> </li>
        <li> <a href="statistics.html?method=carryCount">이월 개수</a> </li>
        <li> <a href="statistics.html?method=lowCount">저값(1~22) 개수</a> </li>
        <li> <a href="statistics.html?method=sum">번호 합계</a> </li>
        <li> <a href="statistics.html?method=oddCount">홀수 개수</a> </li>
        <li> <a href="statistics.html?method=primeCount">소수 개수</a> </li>
        <li> <a href="statistics.html?method=$3Count">3배수 개수</a> </li>
        <li> <a href="statistics.html?method=sum$10">첫수(십의자리) 합</a> </li>
        <li> <a href="statistics.html?method=diffMaxMin">고저차</a> </li>
        <li> <a href="statistics.html?method=AC">AC</a> </li>
    </ul>
</li>


</ul>
`)