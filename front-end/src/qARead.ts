import configure from '../amplify/configure'
import { getUnAuthAPI } from '../amplify/api';
configure();

const title = document.getElementById('content-title');
const author = document.getElementById('author-name');
const created = document.getElementById('author-time');
const hits = document.getElementById('author-lookup');
const contents = document.getElementById('text-content');

const commentContainerBox = document.querySelector('.comment-container-box');
const commentNum = document.querySelector('#comment-num');

const id = getQueryStringObject().id;
getUnAuthAPI('/posts/' + id)
    .then(result => {
        console.log(result);
        const post = result.data;
        title.textContent = post.title;
        author.textContent = post.writerName;
        created.textContent = post.created;
        hits.textContent = post.hits;
        contents.innerHTML = post.text;
        if(post.comments){
            makeComments(post.comments);
        }
    });

function getQueryStringObject(): any {
    const urlDecoded = window.location.search.substr(1).split('&');
    if (urlDecoded.length === 0) return {};
    const result = {};
    for (let i = 0; i < urlDecoded.length; i++) {
        var p = urlDecoded[i].split('=', 2);
        if (p.length == 1)
            result[p[0]] = "";
        else
            result[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return result;
}

function makeComments(objArr:any) {
    commentNum.textContent = objArr.length;
    for (let i = 0; i < objArr.length; i++) {
        const commentBox = document.createElement('div');
        commentBox.classList.add('commentBox');
        commentBox.setAttribute('data-id', objArr[i].id);

        const commentTitle = document.createElement('div');
        commentTitle.classList.add('comment-title');

        const commentAuthor = document.createElement('div');
        commentAuthor.classList.add('comment-author');
        commentAuthor.textContent = objArr[i].writerName;

        const commentTime = document.createElement('div');
        commentTime.classList.add('comment-time');
        commentTime.textContent = objArr[i].created;

        commentTitle.appendChild(commentAuthor);
        commentTitle.appendChild(commentTime);

        const commentContent = document.createElement('div');
        commentContent.classList.add('comment-content');
        commentContent.textContent = objArr[i].contents;

        commentBox.appendChild(commentTitle);
        commentBox.appendChild(commentContent);

        commentContainerBox.appendChild(commentBox);
    }
}
const txtArea = document.querySelector('#comment-write-text');
txtArea.addEventListener('input', limitTxtAreaCount(txtArea))
function limitTxtAreaCount(target) {
    const maxlength = 150;
    const charCurrentCount = document.querySelector('#char-current-count');

    return function () {
        const currentLength = (target.value).length;

        if (currentLength > maxlength) {
            charCurrentCount.classList.add('comment-limit-alert');
            target.value = target.value.slice(0, target.value.length - 1);
            return false;
        } else {
            charCurrentCount.classList.remove('comment-limit-alert');
            charCurrentCount.textContent = currentLength;
            return true;
        }
    }
}