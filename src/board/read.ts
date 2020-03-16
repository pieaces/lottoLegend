import configure from '../amplify/configure'
import { getUnAuthAPI, postAuthAPI, deleteAuthAPI, getAuthAPI, patchAuthAPI } from '../amplify/api';
import { getUserName, getNickName, headerSign } from '../amplify/auth';
import { getQueryStringObject, getCategoryHtml, isoStringToDate, networkAlert, setColorLotto } from '../functions';
import Swal from 'sweetalert2'

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


let currentUser: string;
let commentCount = 0;
const id = getQueryStringObject().id;
init();
commentSubmit.onclick = async function () {
    if (Number(charCurrentCount.textContent) > 0 && currentUser) {
        try {
            const { commentId, rank } = await postAuthAPI(`/posts/${id}/comments`, { contents: txtArea.value });
            makeComments([{ id: commentId, userName: currentUser, nickName: await getNickName(), rank, created: new Date().toISOString(), contents: txtArea.value }]);
            txtArea.value = "";
            Swal.fire({
                title: '완료',
                icon: 'success'
            });
        } catch (err) {
            networkAlert();
        }
    } else {
        if (!currentUser) {
            alert('로그인이 필요합니다.');
        }
        else alert('1글자 이상 입력해주세요.');
    }
}
function rankToClass(rank: number | string, object: HTMLElement) {
    switch (rank) {
        case 1: object.classList.add('rank-first');
            break;
        case 2: object.classList.add('rank-second');
            break;
        case 3: object.classList.add('rank-third');
            break;
        case 4: object.classList.add('rank-fourth');
            break;
        case 5: object.classList.add('rank-fifth');
            break;
        default: object.id = 'heart';
    }
}
async function init() {
    loading.classList.remove('none');
    try {
        currentUser = await getUserName();
    } catch (err) { }
    if (id) {
        let post: any;
        try {
            post = currentUser ? await getAuthAPI('/posts/' + id) : await getUnAuthAPI('/posts/' + id);
        } catch (err) {
            networkAlert();
        }
        console.log(post);
        title.textContent = post.title;
        author.textContent = post.nickName;
        postRank.textContent = post.rank;
        rankToClass(post.rank, postRank);
        if (currentUser === post.userName) {
            contentsUpdateBtn.classList.remove('hide');
            const category = document.querySelector<HTMLElement>('#wrapper').getAttribute('data-category');
            if (category === 'incl' || category === 'excl') {
                makeNum([1, 3, 5, 7, 9, 10, 13, 15, 19, 24, 29, 35, 41, 42, 44, 45]);
            }
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
                                title: '완료!',
                                icon: 'success',
                                allowOutsideClick: false,
                                timer: 1500,
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
        created.textContent = isoStringToDate(post.created);
        hits.textContent = post.hits;
        recommendation.textContent = post.recommendation;

        let recommendStatus = post.recommend;
        if (recommendStatus) {
            recommendBtn.classList.add('recommend');
        }
        recommendBtn.addEventListener('click', async () => {
            loading.classList.remove('none')
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
            loading.classList.add('none')
        })
        contentsInput.innerHTML = post.contents;

        if (post.comments) {
            makeComments(post.comments);
        }
        loading.classList.add('none');
    }
}

function makeComments(objArr: any) {
    for (let i = 0; i < objArr.length; i++) {
        console.log(objArr[i]);
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment-container');

        const commentBox = document.createElement('div');
        commentBox.classList.add('comment-box');

        const commentTitle = document.createElement('div');
        commentTitle.classList.add('comment-title');

        const rankElement = document.createElement('span');
        rankElement.textContent = objArr[i].rank;
        rankElement.classList.add('rank');
        rankToClass(objArr[i].rank, rankElement);
        const commentAuthor = document.createElement('div');
        commentAuthor.classList.add('comment-author');
        commentAuthor.textContent = objArr[i].nickName;

        const commentTime = document.createElement('div');
        commentTime.classList.add('comment-time');
        commentTime.textContent = isoStringToDate(objArr[i].created);

        commentTitle.appendChild(rankElement);
        commentTitle.appendChild(commentAuthor);
        commentTitle.appendChild(commentTime);

        const updateBtnBox = document.createElement('div');
        updateBtnBox.classList.add('text-update-btn-box');
        // const updateBtn = document.createElement('button');
        // updateBtn.setAttribute('type', 'button');
        // updateBtn.classList.add('btn','comment-update-btn');
        // updateBtn.textContent = "수정";

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.classList.add('btn', 'comment-update-btn');
        deleteBtn.textContent = "삭제";

        if (!(currentUser === objArr[i].userName)) updateBtnBox.classList.add('hide');
        else {
            // updateBtn.addEventListener('click', () =>{
            // });
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
                                title: '완료!', icon: 'success'
                            });
                        } catch (err) {
                            networkAlert();
                        }
                    }
                });
            });
        }
        //updateBtnBox.appendChild(updateBtn);
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


function makeNum(number: number[]) {
    const numContainer = document.querySelector('.inc-exc-num-container');
    for (let i = 0; i < number.length; i++) {
        const numBox = document.createElement('div');
        numBox.classList.add('inc-exc-num-box');

        const num = document.createElement('div');
        num.classList.add('inc-exc-select-num');
        num.textContent = number[i].toString();
        setColorLotto(number[i], num);

        numBox.appendChild(num);
        numContainer.appendChild(numBox);
    }
}

