import configure from '../amplify/configure'
import { getUnAuthAPI } from '../amplify/api'
import { getQueryStringObject, isoStringToDate, getCategoryHtml, rankToClass } from '../functions';
import { headerSign } from '../amplify/auth';
const boardSection = document.querySelector('.board-section');
const pageNumContainer = document.querySelector('.page-num-container');
configure();
headerSign();

const category = document.getElementById('wrapper').getAttribute('data-category');
const index = Number(getQueryStringObject().index) || 1;
const { word, type } = getQueryStringObject();

const selectBox = document.querySelector<HTMLSelectElement>('#search');
const wordInput = document.querySelector<HTMLInputElement>('#word');

document.querySelector<HTMLElement>('.search-btn').onclick = () => {
    location.href = `?index=1&word=${wordInput.value}&type=${selectBox.value}`;
}
function listAPI() {
    if (word || type) {
        console.log('search!')
        return getUnAuthAPI('/posts/search', { category, index, word, type });
    } else return getUnAuthAPI('/posts', { category, index });
}
function listHref(index: number) {
    let href = `?index=${index}`;
    if (word) href += `&word=${word}`;
    if (type) href += `&type=${type}`;
    return href;
}
listAPI().then(({ posts, count }) => {
    makeBoard(posts);
    const LIST_PACK = 15;
    const INDEX_PACK = 5;
    const total = Math.ceil(count / LIST_PACK);
    const start = index - (index - 1) % INDEX_PACK;
    const end = (start + INDEX_PACK - 1) >= total ? total : (start + INDEX_PACK - 1);
    if (index > INDEX_PACK) {
        const div = document.createElement('div');
        div.innerHTML = `<a class="page-anchor" href="${listHref(start - 1)}">이전</a>`;
        pageNumContainer.appendChild(div);
    }
    for (let i = start; i <= end; i++) {
        const div = document.createElement('div');
        if (i === index) {
            div.textContent = (i).toString();
            div.classList.add('page-current');
        } else {
            div.innerHTML = `<a class="page-anchor" href="${listHref(i)}">${i}</a>`;
        }
        pageNumContainer.appendChild(div);
    }
    if (start + INDEX_PACK - 1 < total) {
        const div = document.createElement('div');
        div.innerHTML = `<a class="page-anchor" href="${listHref(end + 1)}">다음</a>`;
        pageNumContainer.appendChild(div);
    }
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

        boardAuthor.innerHTML = `<span class="rank ${rankToClass(objArr[i].rank)}"><div class="rank-text">${objArr[i].rank}</div></span>${objArr[i].nickName}`;

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