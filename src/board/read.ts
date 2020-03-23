import configure from '../amplify/configure'
import { getUnAuthAPI, postAuthAPI, deleteAuthAPI, getAuthAPI, patchAuthAPI } from '../amplify/api';
import { getUserName, getNickName, headerSign, isLogedIn } from '../amplify/auth';
import { isoStringToDate, networkAlert, rankToClass, onlyUserAlert, isoStringToTime, getQueryStringObject } from '../functions';
import Swal from 'sweetalert2'
import { Category, getCategoryHtml, makeNumSet } from './functions';

configure();
headerSign();

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
const charCurrentCount = document.querySelector('#char-current-count');
const commentSubmit = document.getElementById('comment-submit');
const contentsUpdateBtn = document.querySelector<HTMLElement>('.text-update-container');
const recommendBtn = document.getElementById('reco-btn');
const loading = document.querySelector('.loading-box');


let commentCount = 0;
const id = getQueryStringObject().id;
init();
commentSubmit.onclick = async function () {
    const logedIn = await isLogedIn();
    if (Number(charCurrentCount.textContent) > 0 && logedIn) {
        try {
            const { commentId, rank } = await postAuthAPI(`/posts/${id}/comments`, { contents: txtArea.value });
            makeComments([{ id: commentId, userName: await getUserName(), nickName: await getNickName(), rank, created: new Date().toISOString(), contents: txtArea.value }]);
            txtArea.value = "";
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
        console.log(post);
        if (post.error) {
            return Swal.fire({
                title: post.message,
                icon: 'warning'
            }).then(() => {
                location.href = "javascript:history.back();"
            });
        }
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


    const category:Category = document.querySelector<HTMLElement>('#wrapper').getAttribute('data-category') as Category;
    if (category === 'include' || category === 'exclude') {
        document.getElementById('current-text').textContent = post.round;
        document.getElementById('before-text').textContent = (post.round - 1).toString();
        makeNumSet(post.numbers, post.answer);
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
        loading.classList.remove('none');
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

        loading.classList.add('none');
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
        updateBtn.classList.add('btn', 'comment-update-btn', 'comment-modify');
        updateBtn.textContent = "수정";

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.classList.add('btn', 'comment-update-btn');
        deleteBtn.textContent = "삭제";

        if (!(await isLogedIn()) || (await getUserName() !== objArr[i].userName)) updateBtnBox.classList.add('hide');
        else {
            let updateCheck = false;
            let parentEl: HTMLElement;
            let textArea: HTMLTextAreaElement;
            updateBtn.addEventListener('click', async () => {
                if (!updateCheck) {
                    updateBtn.textContent = "완료";
                    textArea = document.createElement('textarea');
                    textArea.classList.add('comment-update-write-text');
                    parentEl = updateBtn.parentElement.parentElement;
                    textArea.value = parentEl.nextElementSibling.textContent;
                    parentEl.nextElementSibling.remove();
                    parentEl.parentNode.appendChild(textArea);
                    updateCheck = true;
                } else {
                    updateBtn.textContent = "수정";
                    try {
                        await patchAuthAPI(`/posts/${id}/comments/${objArr[i].id}`, { contents: textArea.value })
                        const commentContent = document.createElement('div');
                        commentContent.classList.add('comment-content');
                        commentContent.textContent = textArea.value;
                        textArea.remove();
                        parentEl.parentNode.appendChild(commentContent);
                        updateCheck = false;
                        Swal.fire({
                            title: '완료!',
                            icon: 'success',
                            timer: 750,
                        });
                    } catch (err) {
                        networkAlert();
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
                                title: '완료!', icon: 'success',
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
        commentContent.innerHTML = objArr[i].contents.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');

        commentContainer.appendChild(commentBox);
        commentContainer.appendChild(commentContent);

        commentContainerBox.appendChild(commentContainer);
    }
    commentCount += objArr.length;
    commentNum.textContent = commentCount.toString();
}
txtArea.addEventListener('input', limitTxtAreaCount())
txtArea.addEventListener('paste', limitTxtAreaCount())
function limitTxtAreaCount() {
    const maxlength = 150;

    return function () {
        const currentLength = (txtArea.value).length;
        if (currentLength > maxlength) {
            charCurrentCount.classList.add('comment-limit-alert');
            charCurrentCount.textContent = (maxlength).toString();
            txtArea.value = txtArea.value.slice(0, maxlength);
        } else {
            charCurrentCount.classList.remove('comment-limit-alert');
            charCurrentCount.textContent = currentLength.toString();
        }
    }
}