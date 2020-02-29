const headerMenu = document.querySelectorAll('.mid-nav-menu >li:nth-child(1)~li');
const headerHoverMenuContainer = document.querySelector('.hover-menu-container');

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