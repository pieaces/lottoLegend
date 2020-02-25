document.write(`
<div class="comment-title">
<div class="title-label">제목</div>
<input type="text" class="title" id="title-text">
</div>
<div class="textarea-box">
<textarea id="sample"></textarea>
</div>
<div>
<div id="image-wrapper" class="image-list">
    <div class="file-list-info">
        <div class="button-wrapper">
            <div class="img-btn-box">
                <span class="label">
                    파일 업로드
                </span>
                <input type="file" id="files-upload" accept="image/*" multiple="multiple" />
                <button class="btn" id="image-remove" disabled>파일 삭제</button>
                <span id="image-size">0KB</span>
            </div>
            <button type="submit" class="btn square-btn post-btn" id="submit-btn">
                작성완료
            </button>
        </div>
    </div>
    <div class=" file-list">
        <ul id="image-list">
        </ul>
    </div>
</div>
</div>`);