import configure from '../amplify/configure'
import {getUnAuthAPI} from '../amplify/api'
const boardSection = document.querySelector('.board-section');

configure();
getUnAuthAPI('/posts')
.then(results => {
    console.log(results.data);
    makeBoard(results.data);
})

function makeBoard(objArr:any[]) {
    for (let i = 0; i < objArr.length; i++) {
        const boardBox = document.createElement('div');
        boardBox.classList.add('board-box');

        const boardNum = document.createElement('div');
        boardNum.classList.add('board-num');
        boardNum.textContent = objArr[i].id;

        boardBox.appendChild(boardNum);

        const boardTitle = document.createElement('div');
        boardTitle.classList.add('board-title');
        boardTitle.innerHTML = `<a href="./qARead.html?id=${objArr[i].id}">${objArr[i].title}</a>`;

        boardBox.appendChild(boardTitle);

        const boardAuthor = document.createElement('div');
        boardAuthor.classList.add('board-author');
        boardAuthor.textContent = objArr[i].writerName;

        boardBox.appendChild(boardAuthor);

        const boardDate = document.createElement('div');
        boardDate.classList.add('board-date');
        boardDate.textContent = objArr[i].created.slice(0,10);

        boardBox.appendChild(boardDate);

        const boardViews = document.createElement('div');
        boardViews.classList.add('board-views');
        boardViews.textContent = objArr[i].hits;

        boardBox.appendChild(boardViews);
        boardSection.appendChild(boardBox);
    }
}