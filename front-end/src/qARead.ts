import configure from '../amplify/configure'
import { getUnAuthAPI, postAuthAPI } from '../amplify/api';
import { getUserName, getNickName } from '../amplify/auth';
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

const id = getQueryStringObject().id;
let currentUser:string;
init();

commentSubmit.onclick = async function(){
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
        if(!currentUser){
            alert('로그인이 필요합니다.');
        }
        else alert('1글자 이상 입력해주세요.');
    }
}
async function init(){
    try{
    currentUser = await getUserName();
    }catch(err){}
    const post = (await getUnAuthAPI('/posts/' + id)).data;
    title.textContent = post.title;
    author.textContent = post.writerName;
    author.setAttribute('data-writer', post.writerId);
    created.textContent = post.created;
    hits.textContent = post.hits;
    contentsInput.innerHTML = post.text;
    if(post.comments){
        makeComments(post.comments);
    }
}

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
    for (let i = 0; i < objArr.length; i++) {
        const commentBox = document.createElement('div');
        commentBox.classList.add('commentBox');
        commentBox.setAttribute('data-id', objArr[i].id);

        const commentTitle = document.createElement('div');
        commentTitle.classList.add('comment-title');

        const commentAuthor = document.createElement('div');
        commentAuthor.classList.add('comment-author');
        commentAuthor.textContent = objArr[i].writerName;
        //
        commentAuthor.setAttribute('data-writer', objArr[i].writerId);

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
    commentNum.textContent = objArr.length;
}
txtArea.addEventListener('input', limitTxtAreaCount(txtArea))
function limitTxtAreaCount(target) {
    const maxlength = 150;

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