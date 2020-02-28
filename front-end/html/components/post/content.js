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
                    사진 업로드
                </span>
                <input type="file" class="files-upload" id="files-upload" accept="image/*" multiple="multiple" />
                <button class="btn image-remove" id="image-remove" disabled>사진 삭제</button>
                <span class="image-total-size" id="image-total-size">0MB</span> <span class="post-alert" id="post-alert">최대 4MB까지 업로드 가능합니다.</span>
            </div>
            <button type="submit" class="btn square-btn post-btn" id="submit-btn">
                완료
            </button>
        </div>
    </div>
    <div class=" file-list">
        <ul id="image-list">
        </ul>
    </div>
</div>
</div>`);