const filterBox = document.querySelector('.filter-box');
const filterArrow = document.querySelector('.filter-arrow');
const filterListBox = document.querySelector<HTMLElement>('.filter-list');
const filterList = document.querySelectorAll<HTMLElement>('.filter-list > li');
const filterSelectText = document.querySelector('.filter-box > a');
const boardPresent = document.querySelector('.present span strong');
const boardPrevious = document.querySelector('.past span strong');
const boardNext = document.querySelector('.future span strong');

import DataAPI from '../DataAPI'

export default function DropDown() {
    let flag = true;
    filterBox.addEventListener('click', () => {
        if (flag) {
            filterArrow.classList.remove('fa-sort-down');
            filterArrow.classList.add('fa-sort-up');
            filterListBox.style.display = 'block';

        } else {
            filterArrow.classList.add('fa-sort-down');
            filterArrow.classList.remove('fa-sort-up');
            filterListBox.style.display = 'none';
        }
        flag = !flag;
    });

    if (flag) {
        filterList.forEach(node => {
            node.addEventListener('click', () => {
                filterSelectText.textContent = node.textContent;

                const index = DataAPI.getInstance().getCurrent();
                if (index === 0) {
                    boardPrevious.textContent = '';
                    boardNext.textContent = DataAPI.getInstance().getNextName();
                } else if (index === DataAPI.getInstance().SIZE - 1) {
                    boardPrevious.textContent = DataAPI.getInstance().getPreviousName();
                    boardNext.textContent = '';
                } else {
                    boardNext.textContent = DataAPI.getInstance().getNextName();
                    boardPrevious.textContent = DataAPI.getInstance().getPreviousName();
                }
                boardPresent.textContent = DataAPI.getInstance().getCurrentName();
            });
        });
    }
}