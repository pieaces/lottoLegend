const commentContainerBox = document.querySelector('.comment-container-box');
const a = [{}, {}, {}]
function makeCommentBox(a) {
    const commentBox = document.createElement('div');
    commentBox.classList.add(commentBox);

    const commentTitle = document.createElement('div');
    commentTitle.classList.add('comment-title');

    const commentAuthor = document.createElement('div');
    commentAuthor.classList.add('comment-author');
    commentAuthor.textContent = "";

    const commentTime = document.createElement('div');
    commentTime.classList.add('comment-time');
    commentTime.textContent = "";

    commentTitle.appendChild(commentAuthor);
    commentTitle.appendChild(commentTime);

    const commentContent = document.createElement('div');
    commentContent.classList.add('comment-content');
    commentContent.textContent = "";

    commentBox.appendChild(commentTitle);
    commentBox.appendChild(commentContent);

}