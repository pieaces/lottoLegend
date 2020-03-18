const headerMenuTitle = document.querySelectorAll('.mid-nav-menu >li:nth-child(1)~li > a');
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


        for (const node of headerMenuTitle) {
            node.addEventListener('click', () => {
                headerMenuList.classList.remove('none');
            });

        }

        let headerMenu = Array.from(headerMenuTitle).concat(Array.from(headerMenuList));

        const bodyAll = document.querySelectorAll('body *');

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
                if (node.className === "filter-box") {
                } else {
                    filterListBox.classList.add("none");
                    filterArrow.classList.add("fa-sort-down");
                    filterArrow.classList.remove("fa-sort-up");
                    this.flag = true;
                }
            });
        }

        // for (const node of bodyAll) {
        //     console.log(node);
        //     node.addEventListener("click", () => {
        //         if (node.className === "mid-nav-container") {

        //         } else {
        //             if (!flag) {
        //                 headerMenuList.classList.remove('none');
        //                 flag = true;
        //             } else {
        //                 headerMenuList.classList.add('none');
        //                 flag = false;
        //             }
        //         }
        //     });
        // }

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