const menuTitle = document.querySelectorAll('.mid-nav-menu >li > a'); //소개부터 커뮤니티 까지 네개 배열
const menuListBox = document.querySelector('.hover-menu-container');
const mqMobile = window.matchMedia("(max-width: 767px)");
const clickMenuBox = document.querySelectorAll('.click-menu-box'); //사이드 메뉴 배열
const menu = document.querySelector('.click-menu-container');
const menuInfoText = document.querySelector('.mid-nav-menu-info-text');
const menuInfo = document.querySelector('.mid-nav-menu-info');


mqInit();
// menuInfoToggle();

function mqInit() {

    let menuTitleEventHandler = [];
    let menuExceptEvent;
    let menuEvent;
    let current = null;

    if (mqMobile.matches) {
        //모바일 레이아웃
        mqMobileInit();
    } else {
        //데스크탑 레이아웃
        mqDeskTopInit();
    }

    mqMobile.addListener(mqFunc);

    function mqMobileInit() {
        menu.classList.remove('none');
        let isMenuClick = false;
        menuTitle.forEach((node, index) => {
            const event = function (e) {
                if (current !== null) {
                    clickMenuBox[current].classList.add('none');
                }
                switch (index) {
                    case 0:
                        break;
                    case 1:
                        document.querySelector('.click-menu-system').classList.remove('none');
                        current = 0;
                        break;
                    case 2:
                        document.querySelector('.click-menu-statistics').classList.remove('none');
                        current = 1;
                        break;
                    case 3:
                        document.querySelector('.click-menu-community').classList.remove('none');
                        current = 2;
                        break;
                    case 4:
                        document.querySelector('.click-menu-qna').classList.remove('none');
                        current = 3;
                        break;
                }
                e.stopPropagation();
            }
            menuTitleEventHandler.push(event);
            node.addEventListener('click', event);
        })

        menuExceptEvent = function () {
            if (!isMenuClick) {
                //target 다른 곳
                if (current !== null) {
                    clickMenuBox[current].classList.add('none');
                }
            }
            isMenuClick = false;
        }
        document.addEventListener('click', menuExceptEvent);

        menuEvent = function () {
            //target
            isMenuClick = true;
        }
        menu.addEventListener('click', menuEvent);
    }

    function mqFunc(mediaQuery) {
        if (mediaQuery.matches) {
            //모바일 레이아웃
            menuHoverRemoveEvent();
            mqMobileInit();
        } else {
            //데스크탑 레이아웃

            if (current !== null) {
                clickMenuBox[current].classList.add('none');
            }
            menuTitle.forEach((node, index) => {
                node.removeEventListener('click', menuTitleEventHandler[index]);
            })
            menuTitleEventHandler = [];
            document.removeEventListener('click', menuExceptEvent);
            menu.removeEventListener('click', menuEvent);

            mqDeskTopInit();
        }
    }

};



function menuListShow() {
    menuListBox.classList.remove('none');
}

function menuListHide() {
    menuListBox.classList.add('none');
}

function menuHoverAddEvent() {
    for (const node of menuTitle) {
        node.addEventListener('mouseover', menuListShow);
        node.addEventListener('mouseout', menuListHide);
    }
    menuListBox.addEventListener('mouseover', menuListShow);
    menuListBox.addEventListener('mouseout', menuListHide);
}

function menuHoverRemoveEvent() {
    for (const node of menuTitle) {
        node.removeEventListener('mouseover', menuListShow);
        node.removeEventListener('mouseout', menuListHide);
    }
    menuListBox.removeEventListener('mouseover', menuListShow);
    menuListBox.removeEventListener('mouseout', menuListHide);
}

function mqDeskTopInit() {
    menu.classList.add('none');
    menuHoverAddEvent();
}


function menuInfoToggle() {
    let flag = false;
    menuInfoText.addEventListener('click', (e) => {
        if (flag) {
            menuInfo.classList.remove('none');
        } else {
            menuInfo.classList.add('none');
        }
        flag = !flag;
        e.stopPropagation();
    });
    document.addEventListener('click', () => {
        if (!flag) {
            //target 다른 곳
            menuInfo.classList.add("none");
        }
        flag = false;
    })

    menuInfo.addEventListener("click", () => {
        flag = true;
    });
}