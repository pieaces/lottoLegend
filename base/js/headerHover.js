const headerMenuTitle = document.querySelectorAll('.mid-nav-menu >li:nth-child(1)~li');
const headerMenuList = document.querySelector('.hover-menu-container');

const mqMobile = window.matchMedia("(max-width: 767px)");

mqMobile.addListener(mqHeaderFunc);

function mqHeaderFunc(mediaQuery) {
    if (mediaQuery.matches) {
        for (const node of headerMenuTitle) {
            node.removeEventListener('mouseover', headerMenuListShow);
            node.removeEventListener('mouseout', headerMenuListHide);
        }
        headerMenuList.removeEventListener('mouseover', headerMenuListShow);
        headerMenuList.removeEventListener('mouseout', headerMenuListHide);


        let flag = false;
        for (const node of headerMenuTitle) {

            node.addEventListener('click', () => {
                headerMenuList.classList.remove('none');
                flag = true;
            });

        }

        let bodyAll = Array.from(document.querySelectorAll('body *'));
        let headerMenu = Array.from(headerMenuTitle).concat(Array.from(headerMenuList));

        bodyAll = bodyAll.filter(parent => {
            let containedByExclusionNode = headerMenu.filter(child => {
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

        console.log(bodyAll);
        for (const node of bodyAll) {

            node.addEventListener("click", () => {
                if (!flag) {
                    headerMenuList.classList.remove('none');
                    flag = true;
                } else {
                    headerMenuList.classList.add('none');
                    flag = false;
                }
            });
        }

    } else {
        for (const node of headerMenuTitle) {
            node.addEventListener('mouseover', headerMenuListShow);
            node.addEventListener('mouseout', headerMenuListHide);
        }
        headerMenuList.addEventListener('mouseover', headerMenuListShow);
        headerMenuList.addEventListener('mouseout', headerMenuListHide);
    }
}

function headerMenuListShow() {
    headerMenuList.classList.remove('none');
}

function headerMenuListHide() {
    headerMenuList.classList.add('none');
}