const checkboxContainer = document.querySelectorAll('.func1-checkbox-container > div');

for (const node of checkboxContainer) {
    node.addEventListener('click', () => {
        if (node.children[0].checked) {
            node.classList.add('func1-num-check-current');
        } else {
            node.classList.remove('func1-num-check-current');
        }
    })
}
