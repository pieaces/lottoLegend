document.write(`           <div class="text-title">
<h1 id="content-title"></h1>
<div class="author-time">
    <span id="author-time"></span>
</div>
</div>
<div class="text-info">
<div class="author-name">
    <span id="author-name"></span>
</div>
<div>

    <div class="author-lookup">
        조회 : <span id="author-lookup"></span>회
    </div>
</div>
</div>
<div class="text-update-container hide">
<div class="text-update-btn-box">
    <button type="button" class="btn square-btn read-btn" id="update-btn">수정</button>
    <button type="button" class="btn square-btn read-btn" id="delete-btn">삭제</button>
</div>
</div>

<div id="text-content" class="text-content sun-editor-editable"></div>
<div class="comment-write-text-box">
<textarea placeholder="소중한 댓글을 남겨주세요" class="comment-write-text"
    id="comment-write-text"></textarea>
<div class="char-count-box">
    <span id="char-current-count">0</span>/
    <span id="char-max-count">150</span>
</div>
<button type="button" class="btn square-btn read-btn comment-btn"
    id="comment-submit">등록</button>
</div>
<div class="comment-container-box">
<div class="comment-list-title"><span id="comment-num"></span>개의 댓글</div>


</div>
`);