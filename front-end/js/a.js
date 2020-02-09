const checkboxContainer = document.querySelectorAll('.checkbox-container > div');

for (const node of checkboxContainer) {
    node.addEventListener('click', () => {
        if (node.children[0].checked) {
            node.classList.add('num-check-current');
        } else {
            node.classList.remove('num-check-current');
        }
    })
}
