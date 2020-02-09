const checkBox = document.querySelectorAll('.func1-checkbox > div');
const reset = document.querySelector('#reset');
for (const node of checkBox) {
    node.addEventListener('click', () => {
        if (node.children[0].checked) {
            node.classList.add('func1-num-check-current');
        } else {
            node.classList.remove('func1-num-check-current');
        }
    })
}
reset.addEventListener('click', () => {
    for (const node of checkBox) {
        node.classList.remove('func1-num-check-current');
    }
})
