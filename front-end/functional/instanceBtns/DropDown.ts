const filterBox = document.querySelector('.filter-box');
const filterArrow = document.querySelector('.filter-arrow');
const filterListBox = document.querySelector<HTMLElement>('.filter-list');
const filterSelectText = document.querySelector('.filter-box > span');
const boardPresent = document.querySelector('.present span strong');
const boardPrevious = document.querySelector('.past span strong');
const boardNext = document.querySelector('.future span strong');

import DataAPI from '../DataAPI'


export default class DropDown {
    static readonly PREVIOUS_COLOR = 'white';
    static readonly CURRENT_COLOR = '#3da8e3';
    static readonly AFTER_COLOR = '#7e8c8c';
    static readonly PREVIOUS_FONT = 'black';
    static readonly CURRENT_FONT = 'white';
    static readonly AFTER_FONT = 'white';
    private flag: boolean = true;
    private nodeList: HTMLElement[] = [];
    changeBoard() {
        const index = DataAPI.getInstance().getCurrent();
        filterSelectText.textContent = DataAPI.getInstance().getCurrentName();
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

    addEvent() {
        if (this.nodeList.length === 0) this.init();
        filterBox.addEventListener('click', () => {
            if (this.flag) {
                filterArrow.classList.remove('fa-sort-down');
                filterArrow.classList.add('fa-sort-up');
                filterListBox.classList.remove('none');

            } else {
                filterArrow.classList.add('fa-sort-down');
                filterArrow.classList.remove('fa-sort-up');
                filterListBox.classList.add('none');
            }
            this.flag = !this.flag;
        });
        this.nodeList.forEach((node) => {
            node.addEventListener('click', () => {
                filterSelectText.textContent = node.textContent;
                this.changeBoard();
            });
        });

    }
    changeDropDownColor() {
        const current = DataAPI.getInstance().getCurrent();
        this.nodeList.forEach((node, index) => {
            if (index < current) {
                node.style.backgroundColor = DropDown.PREVIOUS_COLOR;
                node.style.color = DropDown.PREVIOUS_FONT;
                node.addEventListener('mouseover', () => {
                    node.style.backgroundColor = DropDown.CURRENT_COLOR;
                    node.style.color = DropDown.CURRENT_FONT;
                })
                node.addEventListener('mouseout', () => {
                    node.style.backgroundColor = DropDown.PREVIOUS_COLOR;
                    node.style.color = DropDown.PREVIOUS_FONT;
                })

            } else if (index === current) {
                node.style.backgroundColor = DropDown.CURRENT_COLOR;
                node.style.color = DropDown.CURRENT_FONT;
            } else if (index > current) {
                node.style.backgroundColor = DropDown.AFTER_COLOR;
                node.style.color = DropDown.AFTER_FONT;
            }
        });
    }
    init() {
        this.nodeList = [];
        this.changeBoard();
        const filters = DataAPI.getInstance().getFilterList();
        filters.forEach((label) => {
            const li = document.createElement('li');
            this.nodeList.push(li);
            li.textContent = label.toString();
            filterListBox.appendChild(li);
        });
        this.changeDropDownColor();
    }

}
