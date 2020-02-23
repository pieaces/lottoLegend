import suneditor from 'suneditor'
// How to import plugins
import plugins from 'suneditor/src/plugins'
// How to import language files (default: en)
import {ko} from 'suneditor/src/lang'
import { postAPI, getAPI } from '../amplify/api';

const editor = suneditor.create('sample', {
  plugins: plugins,
  buttonList: [
    ['undo', 'redo'],
    ['fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike'],
    ['fontColor', 'hiliteColor'],
    ['paragraphStyle'],
    ['align', 'list', 'horizontalRule'],
    ['table'],

  ],
  width: '100%',
  height: 'auto',
  minHeight: '200',
  maxHeight: '360',
  imageWidth: '300',
  imageHeight: '300',
  lang: ko
})

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
    let size = (totalSize / 1000).toFixed(1) * 1;
    size = size.toFixed(1) + 'KB';
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
    fixSize = (image.size / 1000).toFixed(1) * 1

    list += `<li id="img_${image.index}">
      <div class="image-container" data-image-index="${image.index}">
          <div class="image-wrapper"><img src="${image.src}" ></div>
      </div>
      <a href="javascript:void(0)" data-image-index="${image.index}" class="image-size">${fixSize}KB</a>
      
  </li>`

    size += fixSize;
  }

  imageSize.innerText = size.toFixed(1) + 'KB';
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
const titleInput = document.getElementById('title');

submitBtn.onclick = async () => {
  const title = titleInput.value;
  const contents = editor.getContents();
  const result = await postAPI('/posts',{
    title, contents
  });
  console.log(result);
}