import configure from '../amplify/configure'
import { getUnAuthAPI } from '../amplify/api'
import { getQueryStringObject, isoStringToDate, getCategoryHtml, Affix } from '../functions';
import { headerSign } from '../amplify/auth';
const boardSection = document.querySelector('.board-section');
const pageNumContainer = document.querySelector('.page-num-container');
configure();
headerSign();

const category = document.getElementById('wrapper').getAttribute('data-category');
const index = Number(getQueryStringObject().index) || 1;
const loading = document.querySelector('.loading-box');

loading.classList.remove('none');
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
        loading.classList.add('none');
    });

function makeBoard(objArr: any[]) {
    for (let i = 0; i < objArr.length; i++) {
        const boardBox = document.createElement('div');
        boardBox.classList.add('board-box');

        const boardTitle = document.createElement('div');
        boardTitle.classList.add('board-title');

        boardTitle.innerHTML = `<a href="/${getCategoryHtml(category, 'read')}?id=${objArr[i].id}">${objArr[i].title}</a>`;

        boardBox.appendChild(boardTitle);

        const boardAuthor = document.createElement('div');
        boardAuthor.classList.add('board-author');
        let rankString: string;
        switch (objArr[i].rank) {
            case 1: rankString = 'first';
            break;
            case 2: rankString = 'second';
            break;
            case 3: rankString = 'third';
            break;
            case 4: rankString = 'fourth';
            break;
            case 5: rankString = 'fifth';
            break;
        }
        boardAuthor.innerHTML = `<span class="rank rank-${rankString}">${objArr[i].rank}</span>${objArr[i].nickName}`;

        boardBox.appendChild(boardAuthor);

        const boardDate = document.createElement('div');
        boardDate.classList.add('board-date');
        boardDate.textContent = isoStringToDate(objArr[i].created).slice(0, 10);

        boardBox.appendChild(boardDate);

        const boardViews = document.createElement('div');
        boardViews.classList.add('board-views');
        boardViews.textContent = objArr[i].hits;

        boardBox.appendChild(boardViews);

        const boardReco = document.createElement('div');
        boardReco.classList.add('board-reco');
        boardReco.textContent = objArr[i].recommendation;

        boardBox.appendChild(boardReco);

        boardSection.appendChild(boardBox);
    }
}