const numToggleBtn = document.querySelector('.mypage-table-num-toggle');
const pastWinBox = document.querySelector('.func3-past-win-table');
const filterNumInfo = document.querySelector('.func3-list-filter-table');

numToggleBtn.addEventListener('click', numToggle());

function numToggle() {
    let flag = false;
    return function () {
        if (!flag) {

            pastWinBox.classList.remove('none');
            filterNumInfo.classList.remove('none');
            flag = true;
        }
        else {

            pastWinBox.classList.add('none');
            filterNumInfo.classList.add('none');
            flag = false;
        }
    }
}


