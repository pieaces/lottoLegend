const headerMenuTitle = document.querySelectorAll('.mid-nav-menu >li:nth-child(1)~li > a');
const headerMenuListBox = document.querySelector('.hover-menu-container');
const mqMobile = window.matchMedia("(max-width: 767px)");
const clickMenuBox = document.querySelectorAll('.click-menu-box');

mqMobile.addListener(mqHeaderFunc);

if (mqMobile.matches) {
    //모바일 레이아웃

    let current = null;
    headerMenuTitle.forEach((node, index) => {
        node.addEventListener('click', () => {
            switch (index) {
                case 0:
                    break;
                case 1:
                    if (current !== null) {
                        clickMenuBox[current].classList.add('none');
                    }
                    document.querySelector('.click-menu-system').classList.remove('none');
                    current = 1;
                    break;
                case 2:
                    if (current !== null) {
                        clickMenuBox[current].classList.add('none');
                    }
                    document.querySelector('.click-menu-statistics').classList.remove('none');
                    current = 2;
                    break;
                case 3:
                    if (current !== null) {
                        clickMenuBox[current].classList.add('none');
                    }
                    document.querySelector('.click-menu-community').classList.remove('none');
                    current = 3;
                    break;
                case 4:
                    if (current !== null) {
                        clickMenuBox[current].classList.add('none');
                    }
                    document.querySelector('.click-menu-qna').classList.remove('none');
                    current = 4;
                    break;
            }
        })
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

        // for (const node of headerMenuTitle) {
        //     node.addEventListener('click', (e) => {
        //         headerMenuListBox.classList.remove('none');
        //         e.stopPropagation();
        //     });
        // }

        // let myExclusiveEl = Array.from(
        //     document.querySelectorAll('body *')
        // );
        // let myEls = Array.from(
        //     document.querySelectorAll('.mid-nav-container *')
        // );
        // myEls.push(document.querySelector('.mid-nave-container'));

        // myExclusiveEl = myExclusiveEl.filter(parent => {
        //     let containedByExclusionNode = myEls.filter(child => {
        //         if (parent === child) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     });
        //     if (containedByExclusionNode.length === 0) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // });
        // for (const node of myExclusiveEl) {
        //     node.addEventListener("click", () => {
        //         headerMenuListBox.classList.add('none');
        //     });
        // }
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

