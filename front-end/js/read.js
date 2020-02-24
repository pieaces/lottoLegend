const commentContainerBox = document.querySelector('.comment-container-box');
const commentNum = document.querySelector('#comment-num');

function InputCommentData(objArr) {

    commentNum.textContent = objArr.length;

    for (let i = 0; i < objArr.length; i++) {
        const commentBox = document.createElement('div');
        commentBox.classList.add(commentBox);
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
        const currentLength = (target.value.replace(/\s/gi, '')).length;

        if (currentLength > maxlength) {
            alert(`${maxlength}자를 넘을 수 없습니다`);
            target.value = target.value.slice(0, target.value.length - 1);
            return false;
        } else {
            charCurrentCount.textContent = currentLength;
            return true;
        }
    }
};


