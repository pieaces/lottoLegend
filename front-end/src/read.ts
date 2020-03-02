import configure from './amplify/configure'
import { getUnAuthAPI, postAuthAPI, deleteAuthAPI } from './amplify/api';
import { getUserName, getNickName } from './amplify/auth';
import { getQueryStringObject, afterAlert, getCategoryHtml, removeConfirm, isoStringToDate, Affix } from './functions';
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
const contentsUpdateBtn = document.querySelector<HTMLElement>('.text-update-container ');

let currentUser: string;
let commentCount = 0;
const id = getQueryStringObject().id;
init();

commentSubmit.onclick = async function () {
    if (Number(charCurrentCount.textContent) > 0 && currentUser) {
        try {
            const commentId = await postAuthAPI(`/posts/${id}/comments`, { contents: txtArea.value });
            makeComments([{ id: commentId, writerId: currentUser, writerName: await getNickName(), created: new Date().toISOString(), contents: txtArea.value }]);
            txtArea.value = "";
        } catch (err) {
            afterAlert();
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
        if (currentUser === post.writerId) {
            contentsUpdateBtn.classList.remove('hide');
            const category = document.querySelector<HTMLElement>('#wrapper').getAttribute('data-category');
            let board: string;
            board = category + 'BoardPost.html';
            document.querySelector<HTMLElement>('#content-update-btn').setAttribute('onclick', `location.href='${board}?id=${id}'`);
            document.querySelector<HTMLElement>('#delete-btn').addEventListener('click', async () => {
                if (removeConfirm()) {
                    try {
                        await deleteAuthAPI('/posts/' + id);
                        location.href = `./${getCategoryHtml(category, Affix.List)}`;
                    } catch (err) {
                        afterAlert();
                    }
                }
            })
        }
        created.textContent = isoStringToDate(post.created);
        hits.textContent = post.hits;
        contentsInput.innerHTML = post.contents;
        if (post.comments) {
            makeComments(post.comments);
        }
    }
}

function makeComments(objArr: any) {
    for (let i = 0; i < objArr.length; i++) {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment-container');

        const commentBox = document.createElement('div');
        commentBox.classList.add('comment-box');

        const commentTitle = document.createElement('div');
        commentTitle.classList.add('comment-title');

        const commentAuthor = document.createElement('div');
        commentAuthor.classList.add('comment-author');
        commentAuthor.textContent = objArr[i].writerName;

        const commentTime = document.createElement('div');
        commentTime.classList.add('comment-time');
        commentTime.textContent = isoStringToDate(objArr[i].created);

        commentTitle.appendChild(commentAuthor);
        commentTitle.appendChild(commentTime);

        const updateBtnBox = document.createElement('div');
        updateBtnBox.classList.add('text-update-btn-box');
        // const updateBtn = document.createElement('button');
        // updateBtn.setAttribute('type', 'button');
        // updateBtn.classList.add('btn', 'square-btn', 'comment-update-btn');
        // updateBtn.textContent = "수정";

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.classList.add('btn', 'square-btn', 'comment-update-btn');
        deleteBtn.textContent = "삭제";

        if (!(currentUser === objArr[i].writerId)) updateBtnBox.classList.add('hide');
        else {
            // updateBtn.addEventListener('click', () =>{
            // });
            deleteBtn.addEventListener('click', async () => {
                if (removeConfirm()) {
                    await deleteAuthAPI(`/posts/${id}/comments/${objArr[i].id}`);
                    commentContainer.remove();
                    commentCount--;
                    commentNum.textContent = commentCount.toString();
                }
            });
        }
        //updateBtnBox.appendChild(updateBtn);
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
    commentCount += objArr.length;
    commentNum.textContent = commentCount.toString();
}
txtArea.addEventListener('input', limitTxtAreaCount(txtArea))
function limitTxtAreaCount(target: HTMLInputElement) {
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