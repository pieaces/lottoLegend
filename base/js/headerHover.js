const headerMenu = document.querySelectorAll('.mid-nav-menu >li:nth-child(1)~li');
const headerHoverMenuContainer = document.querySelector('.hover-menu-container');

// (function () {
//     let flag = false;
//     for (const node of headerMenu) {

//         node.addEventListener('click', () => {
//             if (!flag) {
//                 headerHoverMenuContainer.classList.remove('none');
//                 flag = true;

//             } else {
//                 headerHoverMenuContainer.classList.add('none');
//                 flag = false;

//             }
//         });

//     }

// })();




// let myExclusiveEl = Array.from(document.querySelectorAll(DropDown.body));
// let myEls = Array.from(document.querySelectorAll(DropDown.dropDownBox));

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
//         if (node.className === "filter-box") {
//         } else {
//             filterListBox.classList.add("none");
//             filterArrow.classList.add("fa-sort-down");
//             filterArrow.classList.remove("fa-sort-up");
//             this.flag = true;
//         }
//     });
// }

const mqMobile = window.matchMedia("(max-width: 767px)");

function mqHeaderFunc(mediaQuery) {
    if (mediaQuery.matches) {

    } else {
        for (const node of headerMenu) {
            node.addEventListener('mouseover', () => {
                headerHoverMenuContainer.classList.remove('none');
            })

            node.addEventListener('mouseout', () => {
                headerHoverMenuContainer.classList.add('none');
            })
        }

        headerHoverMenuContainer.addEventListener('mouseover', () => {
            headerHoverMenuContainer.classList.remove('none');
        })

        headerHoverMenuContainer.addEventListener('mouseout', () => {
            headerHoverMenuContainer.classList.add('none');
        })
    }
}

mqMobile.addListener(mqHeaderFunc);


