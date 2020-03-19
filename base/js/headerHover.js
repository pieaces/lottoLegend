const headerMenuTitle = document.querySelectorAll('.mid-nav-menu >li:nth-child(1)~li > a');
const headerMenuList = document.querySelector('.hover-menu-container');

const mqMobile = window.matchMedia("(max-width: 767px)");

headerMenuHover();
mqMobile.addListener(mqHeaderFunc);

function mqHeaderFunc(mediaQuery) {
    if (mediaQuery.matches) {
        for (const node of headerMenuTitle) {
            node.removeEventListener('mouseover', headerMenuListShow);
            node.removeEventListener('mouseout', headerMenuListHide);
        }
        headerMenuList.removeEventListener('mouseover', headerMenuListShow);
        headerMenuList.removeEventListener('mouseout', headerMenuListHide);

        for (const node of headerMenuTitle) {
            node.addEventListener('click', (e) => {
                headerMenuList.classList.remove('none');
                e.stopPropagation();
            });
        }

        let myExclusiveEl = Array.from(
            document.querySelectorAll('body *')
        );
        let myEls = Array.from(
            document.querySelectorAll('.mid-nav-container *')
        );
        myEls.push(document.querySelector('.mid-nave-container'));

        myExclusiveEl = myExclusiveEl.filter(parent => {
            let containedByExclusionNode = myEls.filter(child => {
                if (parent === child) {
                    return true;
                } else {
                    return false;
                }
            });
            if (containedByExclusionNode.length === 0) {
                return true;
            } else {
                return false;
            }
        });
        for (const node of myExclusiveEl) {
            node.addEventListener("click", () => {
                headerMenuList.classList.add('none');
            });
        }
    } else {
        headerMenuHover();
    }
}

function headerMenuListShow() {
    headerMenuList.classList.remove('none');
}

function headerMenuListHide() {
    headerMenuList.classList.add('none');
}

function headerMenuHover() {
    for (const node of headerMenuTitle) {
        node.addEventListener('mouseover', headerMenuListShow);
        node.addEventListener('mouseout', headerMenuListHide);
    }
    headerMenuList.addEventListener('mouseover', headerMenuListShow);
    headerMenuList.addEventListener('mouseout', headerMenuListHide);
}

