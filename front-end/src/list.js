const boardSection = document.querySelector('.board-section');

function makeBoard(objArr) {
    for (let i = 0; i < objArr.length; i++) {
        const boardBox = document.createElement('div');
        boardBox.classList.add('board-box');

        const boardNum = document.createElement('div');
        boardNum.classList.add('board-num');
        boardNum.textContent = objArr[i].id;

        boardBox.appendChild(boardNum);

        const boardTitle = document.createElement('div');
        boardTitle.classList.add('board-title');
        boardTitle.textContent = objArr[i].title;

        boardBox.appendChild(boardTitle);

        const boardAuthor = document.createElement('div');
        boardAuthor.classList.add('board-author');
        boardAuthor.textContent = objArr[i].writerName;

        boardBox.appendChild(boardAuthor);

        const boardDate = document.createElement('div');
        boardDate.classList.add('board-date');
        boardDate.textContent = objArr[i].created;

        boardBox.appendChild(boardDate);

        const boardViews = document.createElement('div');
        boardViews.classList.add('board-views');
        boardViews.textContent = objArr[i].hits;

        boardBox.appendChild(boardViews);
        boardSection.appendChild(boardBox);
    }
}