const headerMenuTitle = document.querySelectorAll('.mid-nav-menu >li:nth-child(1)~li > a'); //소개부터 고객문의 까지 다섯개 배열
const headerMenuListBox = document.querySelector('.hover-menu-container');
const mqMobile = window.matchMedia("(max-width: 767px)");
const clickMenuBox = document.querySelectorAll('.click-menu-box'); //사이드 메뉴 배열

mqMobile.addListener(mqHeaderFunc);

if (mqMobile.matches) {
    //모바일 레이아웃

    let current = null;
    headerMenuTitle.forEach((node, index) => {
        node.addEventListener('click', (e) => {
            switch (index) {
                case 0:
                    break;
                case 1:
                    if (current !== null) {
                        clickMenuBox[current].classList.add('none');
                    }
                    document.querySelector('.click-menu-system').classList.remove('none');
                    current = 0;
                    break;
                case 2:
                    if (current !== null) {
                        clickMenuBox[current].classList.add('none');
                    }
                    document.querySelector('.click-menu-statistics').classList.remove('none');
                    current = 1;
                    break;
                case 3:
                    if (current !== null) {
                        clickMenuBox[current].classList.add('none');
                    }
                    document.querySelector('.click-menu-community').classList.remove('none');
                    current = 2;
                    break;
                case 4:
                    if (current !== null) {
                        clickMenuBox[current].classList.add('none');
                    }
                    document.querySelector('.click-menu-qna').classList.remove('none');
                    current = 3;
                    break;
            }
            e.stopPropagation();
        })
    })

    let isMenuClick = false;
    const menu = document.querySelector('.click-menu-container');
    document.addEventListener('click', () => {
        if (!isMenuClick) {
            //target 다른 곳
            if (current !== null) {
                clickMenuBox[current].classList.add('none');
            }
        }
        isMenuClick = false;
    })
    menu.addEventListener('click', () => {
        //target
        isMenuClick = true;
    })

} else {
    //데스크탑 레이아웃
    headerMenuHover();
}

function mqHeaderFunc(mediaQuery) {
    if (mediaQuery.matches) {
        //모바일 레이아웃
        for (const node of headerMenuTitle) {
            node.removeEventListener('mouseover', headerMenuListShow);
            node.removeEventListener('mouseout', headerMenuListHide);
        }
        headerMenuListBox.removeEventListener('mouseover', headerMenuListShow);
        headerMenuListBox.removeEventListener('mouseout', headerMenuListHide);



    } else {
        //데스크탑 레이아웃
        headerMenuHover();
    }
}

function headerMenuListShow() {
    headerMenuListBox.classList.remove('none');
}

function headerMenuListHide() {
    headerMenuListBox.classList.add('none');
}

function headerMenuHover() {
    for (const node of headerMenuTitle) {
        node.addEventListener('mouseover', headerMenuListShow);
        node.addEventListener('mouseout', headerMenuListHide);
    }
    headerMenuListBox.addEventListener('mouseover', headerMenuListShow);
    headerMenuListBox.addEventListener('mouseout', headerMenuListHide);
}

