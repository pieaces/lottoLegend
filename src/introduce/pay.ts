const priceCheckbox = document.querySelectorAll<HTMLInputElement>('.price-checkbox');

checkboxToggle();

function checkboxToggle() {
    let current = null;
    for (let i = 0; i < priceCheckbox.length; i++) {
        priceCheckbox[i].addEventListener('click', () => {
            if (current !== null) {
                if (current !== i) {
                    priceCheckbox[current].checked = false;
                }
            }
            current = i;
        })
    }
}
