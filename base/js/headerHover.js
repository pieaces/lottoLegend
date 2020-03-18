const headerMenu = document.querySelectorAll('.mid-nav-menu >li:nth-child(1)~li');
const headerHoverMenuContainer = document.querySelector('.hover-menu-container');

(function () {
    let flag = false;
    for (const node of headerMenu) {

        node.addEventListener('click', () => {
            if (!flag) {
                headerHoverMenuContainer.classList.remove('none');
                flag = true;

            } else {
                headerHoverMenuContainer.classList.add('none');
                flag = false;

            }
        });

    }

})();




