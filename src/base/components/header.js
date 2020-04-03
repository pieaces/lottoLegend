document.write(`    <header>
<nav class="mid-nav-container">
    <div class="click-menu-container">
        <ul class="click-menu-box click-menu-introduce none">
            <li><a href="/introduce/campaign.html">캠페인</a></li>
            <li> <a href="/introduce/system.html">베르누이 분석 시스템</a> </li>
            <li> <a href="/introduce/tool.html">베르누이 분석 툴</a> </li>
            <li> <a href="/introduce/event.html">이벤트</a> </li>
            <li> <a href="/introduce/pay.html">프리미엄 멤버십</a> </li>
        </ul>
        <ul class="click-menu-box click-menu-system none">
            <li> <a href="/system/experience.html">체험하기</a> </li>
            <li> <a href="/system/include.html">추천수</a>
            <li> <a href="/system/exclude.html">제외수</a> </li>
            <li> <a href="/system/basic.html">기본 필터</a> </li>
            <li> <a href="/system/premium.html">베르누이 분석 툴</a> </li>
        </ul>
        <ul class="click-menu-box click-menu-statistics none">
            <li> <a href="/statistics/weekNumbers.html">금주의 제외번호</a> </li>
            <li> <a href="/board/analysis/list.html">분석 Tip 공유</a> </li>
            <li><a href="/board/include/list.html">추천수 공유</a></li>
            <li><a href="/board/exclude/list.html">제외수 공유</a></li>
            <li><a href="/statistics/winNumbers.html">통계 자료</a></li>
        </ul>
        <ul class="click-menu-box click-menu-community none">
            <li><a href="/board/notice/list.html">공지사항</a></li>
            <li><a href="/board/win/list.html">당첨인증 게시판</a></li>
            <li><a href="/board/free/list.html">자유게시판</a> </li>
        </ul>
        <ul class="click-menu-box click-menu-qna none">
            <li><a href="/board/qna/oftenAskList.html">자주 묻는 질문</a></li>
            <li> <a href="/board/qna/list.html">Q & A</a> </li>
        </ul>

        <div class="click-menu-toggle none">더보기</div>
    </div>
    <div class="container mid-nav">
        <div class="mid-nav-mobile-box">
            <h1 class="mid-nav-logo">
                <a href="/main.html">
                    <img src="/base/img/logo.png">
                </a>
            </h1>
            <ul class="mid-nav-info-box">
                <li> <a class="mid-nav-info-anchor none" id="header-signin"
                        href="/account/signIn.html">로그인</a> </li>
                <li> <a class="mid-nav-info-anchor none" id="header-signup"
                        href="/account/join.html">회원가입</a> </li>
                <li class="mid-nav-info-text none" id="header-mypage">
                    <div class="nickname mid-nav-info-anchor"><span id="nickName"></span>님
                        <i class="fas fa-sort-down"></i>
                        <div class="mid-nav-info none">
                            <ul class="mid-nav-info-list">
                                <li><a href="/myPage/home.html">마이 홈</a> </li>
                                <li><a href="/myPage/numbersList.html">나의 번호리스트</a> </li>
                                <li><a href="/myPage/IncludeExclude.html">나의 추천/제외 번호</a> </li>
                                <li><a href="/myPage/pay.html">결제내역</a> </li>
                                <li> <span id="header-signout">로그아웃</span> </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li><a class="mid-nav-info-anchor" id="qna-anchor" href="/board/qna/list.html">고객문의</a></li>
            </ul>
        </div>
        <ul class="mid-nav-menu">
            <li><a href="#">안내</a></li>
            <li> <a href="#">시스템</a> </li>
            <li> <a href="#">분석실</a> </li>
            <li> <a href="#">커뮤니티</a> </li>
            <div class="hover-menu-container none">
                <ul>
                    <li> <a href="/introduce/campaign.html">캠페인</a> </li>
                    <li> <a href="/introduce/system.html">베르누이 분석 시스템</a> </li>
                    <li> <a href="/introduce/tool.html">베르누이 분석 툴</a> </li>
                    <li> <a href="/introduce/pay.html">프리미엄 멤버십</a> </li>
                </ul>
                <ul>
                    <li> <a href="/system/experience.html">체험하기</a> </li>
                    <li> <a href="/system/include.html">추천/제외수 생성기</a> </li>
                    <li> <a href="/system/basic.html">기본 필터</a> </li>
                    <li> <a href="/system/premium.html">베르누이 분석 툴</a> </li>
                </ul>
                <ul>
                    <li> <a href="/statistics/weekNumbers.html">금주의 제외번호</a> </li>
                    <li> <a href="/board/analysis/list.html">공유 게시판</a> </li>
                    <li> <a href="/statistics/winNumbers.html">당첨번호</a> </li>
                    <li> <a href="/statistics/statistics.html?method=excludedLineCount">통계자료</a> </li>
                </ul>
                <ul>
                    <li> <a href="/board/notice/list.html">공지사항</a> </li>
                    <li> <a href="/board/win/list.html">당첨인증 게시판</a> </li>
                    <li> <a href="/board/free/list.html">자유게시판</a> </li>
                </ul>
            </div>
        </ul>
    </div>
</nav>
<nav class="bottom-nav-container">
    <div class="container bottom-nav">
        <div class="bottom-nav-left">
            <ul>
                <li>공지</li>
                <li>
                    [831회 11억 실제 1등 당첨자 탄생] 역대 90번째 실제1등! 2주연속 1등
                    조합배출!
                </li>
            </ul>
        </div>
        <div class="bottom-nav-right">
            <p>캔버스로또만의 시스템을 이용해보시기 바랍니다</p>
        </div>
    </div>
</nav>
<div class="loading-box none">
    <div class="loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
</header>`);