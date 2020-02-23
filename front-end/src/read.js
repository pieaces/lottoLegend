const commentContainerBox = document.querySelector('.comment-container-box');
const commentNum = document.querySelector('#comment-num');

function InputCommentData(objArr) {

    commenNum.textContent = objArr.length;

    for (let i = 0; i < objArr.length; i++) {
        const commentBox = document.createElement('div');
        commentBox.classList.add(commentBox);

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

const commentWriteText = document.querySelector('#comment-write-text');
const charCurrentCount = document.querySelector('#char-current-count');
const charMaxCount = document.querySelector('#char-max-count');

charMaxCount.textContent = commentWriteText.getAttribute('maxlength');

commentWriteText.addEventListener("input", event => {
    const target = event.currentTarget;
    const maxLength = target.getAttribute("maxlength");
    const currentLength = (target.value.replace(/(\s*)/g, "")).length;

    if (currentLength > maxLength) {
        alert("150글자를 넘을 수 없습니다");
    }
    charCurrentCount.textContent = currentLength;

});


