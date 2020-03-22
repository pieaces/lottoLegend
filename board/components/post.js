document.write(`
<div class="comment-title">
<div class="title-label box-color">제목</div>
<input type="text" class="title" id="title-text">
</div>
<div class="textarea-box">
<textarea id="sample"></textarea>
</div>
<div id="image-wrapper" class="image-wrapper">
<div class="file-list">

    <div class="img-btn-box">
        <div class="img-upload-box">

            <span class="img-upload-text">
                사진 업로드
            </span>
            <input type="file" class="files-upload" id="files-upload" accept="image/*"
                multiple="multiple" />
        </div>
        <button class="btn image-remove" id="image-remove" disabled>사진 삭제</button>
        <div class="image-size-box">
            <span id="image-total-size">0.00MB</span>
            <span id="post-alert">/ 4MB</span>
        </div>
    </div>



    <div class="image-list-container">
        <div class="image-list-box">
            <ul id="image-list" class="none">

            </ul>
        </div>
        <div class="button-wrapper">
            <button type="submit" class="btn post-btn" id="submit-btn">
                완료
            </button>
        </div>

    </div>
</div>

</div>
`);