import configure from '../amplify/configure'
import { getUnAuthAPI, postAuthAPI, deleteAuthAPI, getAuthAPI, patchAuthAPI } from '../amplify/api';
import { getUserName, getNickName, isLogedIn } from '../amplify/auth';
import { isoStringToDate, networkAlert, rankToClass, onlyUserAlert, isoStringToTime, getQueryStringObject, blankToHtml, blankToString, makeLoading, removeLoading } from '../functions';
import Swal from 'sweetalert2'
import { Category, getCategoryHtml, makeNumSet } from './functions';

configure();

const title = document.getElementById('content-title');
const author = document.getElementById('author-name');
const created = document.getElementById('author-time');
const hits = document.getElementById('author-lookup');
const recommendation = document.getElementById('recommendation');
const contentsInput = document.getElementById('text-content');
const postRank = document.getElementById('postRank');

const commentContainerBox = document.querySelector('.comment-container-box');
const commentNum = document.querySelector('#comment-num');
const txtArea = document.querySelector<HTMLTextAreaElement>('#comment-write-text');
const charCurrentCount = document.querySelector<HTMLElement>('#char-current-count');
const commentSubmit = document.getElementById('comment-submit');
const contentsUpdateBtn = document.querySelector<HTMLElement>('.text-update-container');
const recommendBtn = document.getElementById('reco-btn');

const category: Category = document.querySelector<HTMLElement>('#wrapper').getAttribute('data-category') as Category;
const postBtn = document.querySelector('.post-btn');

let commentCount = 0;
const id = getQueryStringObject().id;
if(category !== 'free' && category !== 'notice' && category !== 'win'){
    isLogedIn().then(value => {
        if(value) init();
        else onlyUserAlert();
    });
}else init();
if(category === 'notice' || category === 'pro'){
    postBtn.classList.add('none');
    getUserName().then(userName => {
        if(userName === 'lottoend') postBtn.classList.remove('none');
    }).catch(() => {});
}

commentSubmit.onclick = async function () {
    const logedIn = await isLogedIn();
    if (Number(charCurrentCount.textContent) > 0 && logedIn) {
        try {
            const { commentId, rank } = await postAuthAPI(`/posts/${id}/comments`, { contents: txtArea.value });
            makeComments([{ id: commentId, userName: await getUserName(), nickName: await getNickName(), rank, created: new Date().toISOString(), contents: txtArea.value }]);
            txtArea.value = "";
            charCurrentCount.textContent="0";
            Swal.fire({
                title: '완료',
                icon: 'success',
                timer: 750,
            });
        } catch (err) {
            networkAlert();
        }
    } else {
        if (!logedIn) {
            onlyUserAlert();
        }
        else Swal.fire({
            title: '내용은 비워둘 수 없습니다',
            icon: 'warning'
        });
    }
}

async function init() {
    if (!id) {
        return Swal.fire({
            title: '잘못된 접근입니다',
            icon: 'warning'
        });
    }
    let post: any;
    try {
        if (await isLogedIn()) {
            post = await getAuthAPI('/posts/' + id);
        } else {
            post = await getUnAuthAPI('/posts/' + id);
        }
        if (post.error) {
            return Swal.fire({
                title: post.message,
                icon: 'warning'
            }).then(() => {
                location.href = "javascript:history.back();"
            });
        }
        if(category === 'pro' && post.user <= 3) postBtn.classList.remove('none');
    } catch (err) {
        networkAlert();
    }
    title.textContent = post.title;
    author.textContent = post.nickName;
    postRank.classList.add('rank');
    postRank.classList.add(rankToClass(post.rank));
    const rankText = document.createElement('div');
    rankText.classList.add('rank-text');
    rankText.textContent = post.rank;
    postRank.appendChild(rankText);


    if (category === 'include' || category === 'exclude') {
        document.getElementById('current-text').textContent = post.round;
        document.getElementById('before-text').textContent = (post.round - 1).toString();
        makeNumSet(post.numbers, category, post.answer);
    }

    if (await isLogedIn() && await getUserName() === post.userName) {
        contentsUpdateBtn.classList.remove('hide');

        document.querySelector<HTMLElement>('#content-update-btn').setAttribute('onclick', `location.href='/${getCategoryHtml(category, 'post')}?id=${id}'`);
        document.querySelector<HTMLElement>('#delete-btn').addEventListener('click', async () => {
            Swal.fire({
                title: '삭제하시겠습니까?',
                text: "한번 삭제하면 되돌릴 수 없습니다",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
            }).then(async (result) => {
                if (result.value) {
                    try {
                        await deleteAuthAPI('/posts/' + id);
                        Swal.fire({
                            title: '완료',
                            icon: 'success',
                            allowOutsideClick: false,
                            timer: 750,
                        }).then(() => {
                            location.href = `/${getCategoryHtml(category, 'list')}`;
                        });
                    } catch (err) {
                        networkAlert();
                    }
                }
            });
        })
    }
    created.textContent = isoStringToDate(post.created) + ' ' + isoStringToTime(post.created);
    hits.textContent = post.hits;
    recommendation.textContent = post.recommendation;

    let recommendStatus = post.recommend;
    if (recommendStatus) {
        recommendBtn.classList.add('recommend');
    }
    recommendBtn.addEventListener('click', async () => {
        makeLoading();
        const logedIn = await isLogedIn();
        if (logedIn) {
            try {
                await patchAuthAPI(`/posts/${id}/recommend`);
                recommendStatus = !recommendStatus;
                if (recommendStatus) {
                    recommendBtn.classList.add('recommend');
                    recommendation.textContent = (Number(recommendation.textContent) + 1).toString();
                }
                else {
                    recommendBtn.classList.remove('recommend');
                    recommendation.textContent = (Number(recommendation.textContent) - 1).toString();
                }
            } catch (err) {
                networkAlert();
            }
        } else {
            onlyUserAlert();
        }

        removeLoading();
    });
    contentsInput.innerHTML = post.contents;

    if (post.comments) {
        makeComments(post.comments);
    }
}

async function makeComments(objArr: any) {
    for (let i = 0; i < objArr.length; i++) {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment-container');

        const commentBox = document.createElement('div');
        commentBox.classList.add('comment-box');

        const commentTitle = document.createElement('div');
        commentTitle.classList.add('comment-title');

        const rankElement = document.createElement('span');
        rankElement.classList.add('rank');
        rankElement.classList.add(rankToClass(objArr[i].rank));
        const rankText = document.createElement('div');
        rankText.classList.add('rank-text');
        rankText.textContent = objArr[i].rank;
        rankElement.appendChild(rankText);

        const commentAuthor = document.createElement('div');
        commentAuthor.classList.add('comment-author');
        commentAuthor.textContent = objArr[i].nickName;

        const commentTime = document.createElement('div');
        commentTime.classList.add('comment-time');
        commentTime.textContent = isoStringToDate(objArr[i].created) + ' ' + isoStringToTime(objArr[i].created);

        commentTitle.appendChild(rankElement);
        commentTitle.appendChild(commentAuthor);
        commentTitle.appendChild(commentTime);

        const updateBtnBox = document.createElement('div');
        updateBtnBox.classList.add('text-update-btn-box');
        const updateBtn = document.createElement('button');
        updateBtn.setAttribute('type', 'button');
        updateBtn.classList.add('btn');
        updateBtn.classList.add('comment-update-btn');
        updateBtn.classList.add('comment-modify');
        updateBtn.textContent = "수정";

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('comment-update-btn');
        deleteBtn.textContent = "삭제";

        if (!(await isLogedIn()) || (await getUserName() !== objArr[i].userName)) updateBtnBox.classList.add('hide');
        else {
            let updateCheck = false;
            let parentEl: HTMLElement;
            let textAreaBox: HTMLElement;
            updateBtn.addEventListener('click', async () => {
                if (!updateCheck) {
                    updateBtn.textContent = "완료";
                    parentEl = updateBtn.parentElement.parentElement;
                    textAreaBox=document.createElement('div');
                    textAreaBox.classList.add('comment-write-text-box');
                    const textArea = document.createElement('textarea');
                    textArea.classList.add('comment-write-text');
                    textArea.setAttribute('placeholder',"소중한 댓글을 남겨주세요");
                    const charCountWrapper=document.createElement('div');
                    charCountWrapper.classList.add('char-count-container');
                    const charCountBox=document.createElement('div');
                    charCountBox.classList.add('char-count-box');
                    const current=document.createElement('span');
                    current.classList.add('char-current-count');
                    current.textContent=parentEl.nextElementSibling.textContent.length.toString();                    
                    const slash=document.createTextNode('/');
                    const max=document.createElement('span');
                    max.classList.add('char-max-count');                    
                    max.textContent="150";
                    charCountBox.appendChild(current);
                    charCountBox.appendChild(slash);
                    charCountBox.appendChild(max);
                    charCountWrapper.appendChild(charCountBox);                    
                    textArea.value = blankToString(parentEl.nextElementSibling.innerHTML);
                    textArea.addEventListener('input', limitTxtAreaCount(textArea,current));
                    textArea.addEventListener('paste', limitTxtAreaCount(textArea,current));
                    textAreaBox.appendChild(textArea);
                    textAreaBox.appendChild(charCountWrapper);                                                                        
                    parentEl.parentNode.children[1].remove();
                    parentEl.parentNode.appendChild(textAreaBox);
                    updateCheck = true;
                } else {
                    if((textAreaBox.firstElementChild as HTMLInputElement).value.length===0){
                        Swal.fire({
                            title: '내용은 비워둘 수 없습니다',
                            icon: 'warning'
                        });
                    }else{
                    updateBtn.textContent = "수정";
                    try {
                        await patchAuthAPI(`/posts/${id}/comments/${objArr[i].id}`, { contents: (textAreaBox.firstElementChild as HTMLInputElement).value })
                        const commentContent = document.createElement('div');
                        commentContent.classList.add('comment-content');
                        commentContent.innerHTML = blankToHtml((textAreaBox.firstElementChild as HTMLInputElement).value);
                        textAreaBox.remove();
                        parentEl.parentNode.appendChild(commentContent);
                        updateCheck = false;
                        Swal.fire({
                            title: '완료',
                            icon: 'success',
                            timer: 750,
                        });
                    } catch (err) {
                        networkAlert();
                    }
                }
                }
            });
            deleteBtn.addEventListener('click', async () => {
                Swal.fire({
                    title: '삭제하시겠습니까?',
                    text: "한번 삭제하면 되돌릴 수 없습니다",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '삭제',
                    cancelButtonText: '취소',
                }).then(async (result) => {
                    if (result.value) {
                        try {
                            await deleteAuthAPI(`/posts/${id}/comments/${objArr[i].id}`);
                            commentContainer.remove();
                            commentCount--;
                            commentNum.textContent = commentCount.toString();
                            Swal.fire({
                                title: '완료', icon: 'success',
                                timer: 750,
                            });
                        } catch (err) {
                            networkAlert();
                        }
                    }
                });
            });
        }
        updateBtnBox.appendChild(updateBtn);
        updateBtnBox.appendChild(deleteBtn);

        commentBox.appendChild(commentTitle);
        commentBox.appendChild(updateBtnBox);

        const commentContent = document.createElement('div');
        commentContent.classList.add('comment-content');
        commentContent.innerHTML = blankToHtml(objArr[i].contents);

        commentContainer.appendChild(commentBox);
        commentContainer.appendChild(commentContent);

        commentContainerBox.appendChild(commentContainer);
    }
    commentCount += objArr.length;
    commentNum.textContent = commentCount.toString();
}
txtArea.addEventListener('input', limitTxtAreaCount(txtArea,charCurrentCount));
txtArea.addEventListener('paste', limitTxtAreaCount(txtArea,charCurrentCount));
function limitTxtAreaCount(target:HTMLTextAreaElement,currentEl:HTMLElement) {
    const maxlength = 150;

    return function () {
        const currentLength = (target.value).length;
        if (currentLength > maxlength) {
            currentEl.classList.add('comment-limit-alert');
            currentEl.textContent = (maxlength).toString();
            target.value = target.value.slice(0, maxlength);
        } else {
            currentEl.classList.remove('comment-limit-alert');
            currentEl.textContent = currentLength.toString();
        }
    }
}