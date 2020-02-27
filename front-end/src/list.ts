import configure from '../js/amplify/configure'
import { getUnAuthAPI } from '../js/amplify/api'
import getQueryStringObject from './getQueryStringObject';
const boardSection = document.querySelector('.board-section');
const pageNumContainer = document.querySelector('.page-num-container');
configure();

const category = document.getElementById('wrapper').getAttribute('data-category');
const index = Number(getQueryStringObject().index) || 1;
getUnAuthAPI('/posts', { category, index })
    .then(({ posts, count }) => {
        makeBoard(posts);
        for (let i = 0; i < Math.ceil(count / 10); i++) {
            const div = document.createElement('div');
            if (i + 1 === index) {
                div.textContent = (i + 1).toString();
                div.classList.add('page-current');
            } else {
                div.innerHTML = `<a  class="page-anchor" href="?index=${(i + 1)}">${(i + 1)}</a>`;
                div.classList.add('leap-n');
            }
            pageNumContainer.appendChild(div);
        }
        //<div id="leap-last" class="hide">맨끝</div>
    })

function makeBoard(objArr: any[]) {
    for (let i = 0; i < objArr.length; i++) {
        const boardBox = document.createElement('div');
        boardBox.classList.add('board-box');

        const boardNum = document.createElement('div');
        boardNum.classList.add('board-num');
        boardNum.textContent = objArr[i].id;

        boardBox.appendChild(boardNum);

        const boardTitle = document.createElement('div');
        boardTitle.classList.add('board-title');
        let htmlFileName: string;
        switch (category) {
            case 'free': htmlFileName = 'freeBoard';
                break;
            case 'excl': htmlFileName = 'excludeNum';
                break;
            case 'incl': htmlFileName = 'includeNum';
                break;
            case 'qna': htmlFileName = 'qA';
                break;
        }
        boardTitle.innerHTML = `<a href="./${htmlFileName}Read.html?id=${objArr[i].id}">${objArr[i].title}</a>`;

        boardBox.appendChild(boardTitle);

        const boardAuthor = document.createElement('div');
        boardAuthor.classList.add('board-author');
        boardAuthor.textContent = objArr[i].writerName;

        boardBox.appendChild(boardAuthor);

        const boardDate = document.createElement('div');
        boardDate.classList.add('board-date');
        boardDate.textContent = objArr[i].created.slice(0, 10);

        boardBox.appendChild(boardDate);

        const boardViews = document.createElement('div');
        boardViews.classList.add('board-views');
        boardViews.textContent = objArr[i].hits;

        boardBox.appendChild(boardViews);
        boardSection.appendChild(boardBox);
    }
}