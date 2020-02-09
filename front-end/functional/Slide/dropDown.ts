const filterBox = document.querySelector('.filter-box');
const filterArrow = document.querySelector('.filter-arrow');
const filterListBox = document.querySelector<HTMLElement>('.filter-list');
const filterList = document.querySelectorAll<HTMLElement>('.filter-list > li');
const filterSelectText = document.querySelector('.filter-box > a');
const boardPresent = document.querySelector('.present span strong');
const boardPrevious = document.querySelector('.past span strong');
const boardNext = document.querySelector('.future span strong');

import DataAPI from '../DataAPI'

export default class DropDown {
    flag: boolean = true;

    changeBoard() {
        const index = DataAPI.getInstance().getCurrent();
        if (index === 0) {
            boardPrevious.textContent = '';
            boardNext.textContent = DataAPI.getInstance().getNextName();
        } else if (index === DataAPI.getInstance().SIZE - 1) {
            boardPrevious.textContent = DataAPI.getInstance().getPreviousName();
            boardNext.textContent = '';
        } else {
            boardPrevious.textContent = DataAPI.getInstance().getPreviousName();
            boardNext.textContent = DataAPI.getInstance().getNextName();
        }
        boardPresent.textContent = DataAPI.getInstance().getCurrentName();
    }

    init() {
        this.changeBoard();
        filterBox.addEventListener('click', () => {
            if (this.flag) {
                filterArrow.classList.remove('fa-sort-down');
                filterArrow.classList.add('fa-sort-up');
                filterListBox.style.display = 'block';

            } else {
                filterArrow.classList.add('fa-sort-down');
                filterArrow.classList.remove('fa-sort-up');
                filterListBox.style.display = 'none';
            }
            this.flag = !this.flag;
        });
        filterList.forEach(node => {
            node.addEventListener('click', () => {
                filterSelectText.textContent = node.textContent;
                this.changeBoard();
            });
        });
    }
}
