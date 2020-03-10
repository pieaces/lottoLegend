export default class SelectBox {
    dropdownMenu: HTMLSelectElement;
    options: HTMLOptionsCollection;

    constructor(dropdown: HTMLSelectElement) {
        this.dropdownMenu = dropdown;
        this.options = dropdown.options;
    }

    onChange() {
        this.dropdownMenu.addEventListener('change', () => {
            console.log(this.options[this.options.selectedIndex].value);
        })

    }

}