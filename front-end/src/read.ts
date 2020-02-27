import configure from '../amplify/configure'
import { getUnAuthAPI, postAuthAPI } from '../amplify/api';
import { getUserName, getNickName } from '../amplify/auth';
import getQueryStringObject from './getQueryStringObject';
configure();

const title = document.getElementById('content-title');
const author = document.getElementById('author-name');
const created = document.getElementById('author-time');
const hits = document.getElementById('author-lookup');
const contentsInput = document.getElementById('text-content');

const commentContainerBox = document.querySelector('.comment-container-box');
const commentNum = document.querySelector('#comment-num');
const txtArea = document.querySelector<HTMLInputElement>('#comment-write-text');
const charCurrentCount = document.querySelector('#char-current-count');
const commentSubmit = document.getElementById('comment-submit');

let currentUser: string;
const id = getQueryStringObject().id;
init();

commentSubmit.onclick = async function () {
    if (Number(charCurrentCount.textContent) > 0 && currentUser) {
        try {
            const commentId = await postAuthAPI(`/posts/${id}/comments`, { contents: txtArea.value });
            makeComments([{ id: commentId.data, writerName: await getNickName(), created: new Date().toISOString(), contents: txtArea.value }]);
            commentNum.textContent = (Number(commentNum.textContent) + 1).toString();
        } catch (err) {
            alert('System-error');
        }
        console.log(txtArea.value);
    } else {
        if (!currentUser) {
            alert('로그인이 필요합니다.');
        }
        else alert('1글자 이상 입력해주세요.');
    }
}
async function init() {
    try {
        currentUser = await getUserName();
    } catch (err) { }
    if (id) {
        const post = await getUnAuthAPI('/posts/' + id);
        console.log(post);
        title.textContent = post.title;
        author.textContent = post.writerName;
        author.setAttribute('data-writer', post.writerId);
        created.textContent = isoStringToDate(post.created);
        hits.textContent = post.hits;
        contentsInput.innerHTML = post.text;
        if (post.comments) {
            makeComments(post.comments);
        }
    }
}

function makeComments(objArr: any) {
    for (let i = 0; i < objArr.length; i++) {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment-container');
        commentContainer.setAttribute('data-id', objArr[i].id);

        const commentBox = document.createElement('div');
        commentBox.classList.add('comment-box');

        const commentTitle = document.createElement('div');
        commentTitle.classList.add('comment-title');

        const commentAuthor = document.createElement('div');
        commentAuthor.classList.add('comment-author');
        commentAuthor.textContent = objArr[i].writerName;
        //
        commentAuthor.setAttribute('data-writer', objArr[i].writerId);

        const commentTime = document.createElement('div');
        commentTime.classList.add('comment-time');
        commentTime.textContent = isoStringToDate(objArr[i].created);

        commentTitle.appendChild(commentAuthor);
        commentTitle.appendChild(commentTime);

        const updateBtnBox = document.createElement('div');
        updateBtnBox.classList.add('text-update-btn-box');
        // updateBtnBox.classList.add('hide');

        const updateBtn = document.createElement('button');
        updateBtn.setAttribute('type', 'button');
        updateBtn.classList.add('btn', 'square-btn', 'comment-update-btn');
        updateBtn.id = "update-btn";
        updateBtn.textContent = "수정";

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.classList.add('btn', 'square-btn', 'comment-update-btn');
        deleteBtn.id = "delete-btn";
        deleteBtn.textContent = "삭제";

        updateBtnBox.appendChild(updateBtn);
        updateBtnBox.appendChild(deleteBtn);

        commentBox.appendChild(commentTitle);
        commentBox.appendChild(updateBtnBox);

        const commentContent = document.createElement('div');
        commentContent.classList.add('comment-content');
        commentContent.textContent = objArr[i].contents;

        commentContainer.appendChild(commentBox);
        commentContainer.appendChild(commentContent);

        commentContainerBox.appendChild(commentContainer);
    }
    commentNum.textContent = objArr.length;
}
txtArea.addEventListener('input', limitTxtAreaCount(txtArea))
function limitTxtAreaCount(target:HTMLInputElement) {
    const maxlength = 150;

    return function () {
        const currentLength = (target.value).length;

        if (currentLength > maxlength) {
            charCurrentCount.classList.add('comment-limit-alert');
            target.value = target.value.slice(0, target.value.length - 1);
            return false;
        } else {
            charCurrentCount.classList.remove('comment-limit-alert');
            charCurrentCount.textContent = currentLength.toString();
            return true;
        }
    }
}

function isoStringToDate(isoString:string): string{
    return isoString.slice(0,10) + ' ' + isoString.slice(11,16);
}