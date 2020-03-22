const headerMenuTitle = document.querySelectorAll('.mid-nav-menu >li:nth-child(1)~li > a');
const headerMenuListBox = document.querySelector('.hover-menu-container');
const mqMobile = window.matchMedia("(max-width: 767px)");

mqMobile.addListener(mqHeaderFunc);

if (mqMobile.matches) {
    //모바일 레이아웃

    headerMenuTitle.forEach((node, index) => {
        node.addEventListener('click', () => {
            switch (index) {
                case 0:
                    document.querySelector('.click-menu-system').classList.remove('none');
                    break;
                case 1:
                    document.querySelector('.click-menu-statistics').classList.remove('none');
                    break;
                case 2:
                    document.querySelector('.click-menu-community').classList.remove('none');
                    break;
                case 3:
                    document.querySelector('.click-menu-statistics').classList.remove('none');
                    break;
                case 4:
                    document.querySelector('.click-menu-statistics').classList.remove('none');
                    break;
                default:

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

