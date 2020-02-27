import configure from './amplify/configure'
import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'
import { ko } from 'suneditor/src/lang'
import { postUnAuthAPI, postAuthAPI } from './amplify/api';
import { getUserName } from './amplify/auth'
import getQueryStringObject from './getQueryStringObject'

const editor = suneditor.create('sample', {
  plugins: plugins,
  buttonList: [
    ['undo', 'redo'],
    ['fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike'],
    ['fontColor', 'hiliteColor'],
    ['paragraphStyle'],
    ['table', 'align', 'list', 'horizontalRule'],
  ],
  width: '100%',
  height: 'auto',
  minHeight: '480',
  imageWidth: '360',
  imageHeight: '360',
  imageUploadSizeLimit: 4 * 1024 * 1024,
  lang: ko
})

configure();
const post = getQueryStringObject().id;
if(post){
  console.log(post);
}
const imageWrapper = document.getElementById('image-wrapper');
const imageSize = document.getElementById('image-size');
const imageRemove = document.getElementById('image-remove');
const imageTable = document.getElementById('image-list');


imageRemove.addEventListener('click', () => {
  deleteCheckedImages();
})

let imageList = [];
let selectedImages = [];
let totalSize = 0;

editor.onImageUpload = function (targetImgElement, index, state, imageInfo, remainingFilesCount) {
  if (state === 'delete') {
    const deleteIndex = findIndex(imageList, index);
    totalSize -= imageList[deleteIndex].size;
    let size = (totalSize / 1024 / 1024).toFixed(2) * 1;
    size = size.toFixed(2) + 'MB';
    imageSize.innerText = size;

    const imageLi = imageTable.querySelectorAll('li');

    const targetId = [...imageLi][deleteIndex].id;

    const li = imageTable.querySelector('#' + targetId);
    li.remove();
    imageList.splice(deleteIndex, 1);

  } else {
    if (state === 'create') {
      const image = editor.getImagesInfo()[findIndex(editor.getImagesInfo(), index)]
      totalSize += image.size;
      imageList.push(image)
    } else { // update }
    }

    if (remainingFilesCount === 0) {
      setImageList(imageList)
    }
  }
}
// Upload from outside the editor
document.getElementById('files-upload').addEventListener('change', function (e) {
  if (e.target.files) {
    editor.insertImage(e.target.files)
    e.target.value = ''
  }
})
// Edit image list
function setImageList() {

  let list = '';
  let size = 0;

  for (let i = 0, image, fixSize; i < imageList.length; i++) {
    image = imageList[i];
    fixSize = (image.size / 1024 / 1024).toFixed(2) * 1

    list += `<li id="img_${image.index}">
      <div class="image-container" data-image-index="${image.index}">
          <div class="image-wrapper"><img src="${image.src}" ></div>
      </div>
      <a href="javascript:void(0)" data-image-index="${image.index}" class="image-size">${fixSize}MB</a>
      
  </li>`

    size += fixSize;
  }

  imageSize.innerText = size.toFixed(2) + 'MB';
  imageTable.innerHTML = list;

  const imageContainer = document.querySelectorAll('.image-container');
  const imageListSize = document.querySelectorAll('.image-size');

  for (const node of imageContainer) {

    node.addEventListener('click', () => {
      checkImage(parseInt(node.dataset.imageIndex));
    })
  }


  for (const node of imageListSize) {
    node.addEventListener('click', () => {
      selectImage('select', parseInt(node.dataset.imageIndex));
    })
  }

  const imageTableList = imageTable.querySelectorAll('li');

  for (const node of imageTableList) {
    node.addEventListener('click', () => {

      if (node.classList.contains('checked')) {
        node.style.backgroundColor = "rgb(91, 81, 253)";
        node.children[1].style.color = "white";
      } else {
        node.style.backgroundColor = "";
        node.children[1].style.color = "black";

      }
    })
  }
}

// Image check
function checkImage(index) {
  const li = imageTable.querySelector('#img_' + index);
  const currentImageIdx = findIndex(selectedImages, index);

  if (currentImageIdx > -1) {
    selectedImages.splice(currentImageIdx, 1)
    li.className = '';
    li.children[0].classList.remove('image-select-current');
  } else {
    selectedImages.push(index);
    li.className = 'checked';
  }

  if (selectedImages.length > 0) {
    imageRemove.removeAttribute('disabled');
  } else {
    imageRemove.setAttribute('disabled', true);
  }
}

// Array.prototype.findIndex
function findIndex(arr, index) {
  let idx = -1;

  arr.some(function (a, i) {
    if ((typeof a === 'number' ? a : a.index) === index) {
      idx = i;
      return true;
    }
    return false;
  })

  return idx;
}

// Click the file size
function selectImage(type, index) {
  imageList[findIndex(imageList, index)][type]();
}

function deleteCheckedImages() {
  const imagesInfo = editor.getImagesInfo();

  for (let i = 0; i < imagesInfo.length; i++) {
    if (selectedImages.indexOf(imagesInfo[i].index) > -1) {

      imagesInfo[i].delete();
      i--;
    }
  }
  selectedImages = [];
}
//
const submitBtn = document.getElementById('submit-btn');
const titleInput = document.getElementById('title-text');

function attachTimestamp(name) {
  const index = name.indexOf('.');
  const now = new Date();
  return `${name.slice(0, index)}_${now.getFullYear()}-${now.getMonth()}-${now.getDate()}${name.slice(index)}`;
}
const category = document.getElementById('wrapper').getAttribute('data-category');
const loading = document.querySelector('.loading');
submitBtn.onclick = async () => {
  const title = titleInput.value;
  const userName = await getUserName();
  loading.classList.remove('none');
  try {
    const images = imageList.map(image => {
      const dataURL = image.src;
      const fileName = attachTimestamp(image.name);
      image.element.setAttribute('src', `https://canvas-lotto.s3.ap-northeast-2.amazonaws.com/images/${userName}/${fileName}`);
      return {
        userName,
        fileName,
        dataURL
      };
    });
    const contents = editor.getContents();
    await postUnAuthAPI('/images', images);
    const insertId = await postAuthAPI('/posts', {
      category, title, contents
    });
    let htmlFileName;
    switch (category) {
      case 'free': htmlFileName = 'freeBoard';
        break;
      case 'excl': htmlFileName = 'excludeNum';
        break;
      case 'incl': htmlFileName = 'includeNum';
        break;
      case 'qna': htmlFileName = 'qA';
        break;
    }
    location.href = `./${htmlFileName}Read.html?id=${insertId}`;
  } catch (err) {
    alert('네트워크 오류가 발생하였습니다. 작업이 정상적으로 완료되지 않았습니다.');
  }
}