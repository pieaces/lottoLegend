import configure from './amplify/configure'
import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'
import { ko } from 'suneditor/src/lang'
import { postUnAuthAPI, postAuthAPI, getUnAuthAPI, patchAuthAPI } from './amplify/api';
import { getUserName } from './amplify/auth'
import { networkAlert, getQueryStringObject, getCategoryHtml, onlyUserAlert } from './functions'
import Swal from 'sweetalert2'

function attachTimestamp(name) {
  const index = name.indexOf('.');
  const now = new Date();
  return `${name.slice(0, index)}_${now.getFullYear()}-${now.getMonth()}-${now.getDate()}:${now.getHours()}:${now.getMinutes()}${name.slice(index)}`;
}
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
let userName;
getUserName()
  .then(username => userName = username)
  .catch(err => onlyUserAlert());

const post = getQueryStringObject().id;
const submitBtn = document.getElementById('submit-btn');
const titleInput = document.getElementById('title-text');

const category = document.getElementById('wrapper').getAttribute('data-category');
const loading = document.querySelector('.loading-box');

//const imageWrapper = document.getElementById('image-wrapper');
const imageTotalSize = document.getElementById('image-total-size');
const imageRemove = document.getElementById('image-remove');
const imageTable = document.getElementById('image-list');

imageRemove.addEventListener('click', () => {
  deleteCheckedImages();
})

let imageList = [];
let selectedImages = [];
let totalSize = 0;

submitBtn.onclick = async () => {
  const title = titleInput.value;
  loading.classList.remove('none');
  try {
    const images = [];
    const imageElements = [];
    imageList.forEach(image => {
      if (image.element.getAttribute('src').indexOf('https://canvas-lotto.s3.ap-northeast-2.amazonaws.com/images') === -1) {
        const dataURL = image.src;
        const fileName = attachTimestamp(image.name);
        imageElements.push([image.element, `https://canvas-lotto.s3.ap-northeast-2.amazonaws.com/images/${userName}/${fileName}`]);
        images.push({ userName, fileName, dataURL });
      }
    });
    await postUnAuthAPI('/images', images);
    imageElements.forEach(image => {
      image[0].setAttribute('src', image[1]);
    });
    const contents = editor.getContents();
    let leapId;
    if (!post) {
      leapId = await postAuthAPI('/posts', {
        category, title, contents
      });
    } else {
      leapId = post;
      await patchAuthAPI(`/posts/${post}`, {
        title, contents
      });
    }
    loading.classList.add('none');

    Swal.fire({
      title: '완료!',
      text: '공유해주셔서 감사합니다',
      icon: 'success',
      allowOutsideClick: false,
      timer: 1500,
    }).then(() => {
      location.href = `./${getCategoryHtml(category, 'Read')}?id=${leapId}`;
    });
  } catch (err) {
    networkAlert();
  }
}
if (post) {
  getUnAuthAPI(`/posts/${post}`, { flag: 1 }).then(post => {
    titleInput.value = post.title;
    editor.setContents(post.contents);
  });
} else {

}

editor.onImageUpload = function (targetImgElement, index, state, imageInfo, remainingFilesCount) {
  if (state === 'delete') {
    const deleteIndex = findIndex(imageList, index);
    totalSize -= imageList[deleteIndex].size;
    const size = (totalSize / 1024 / 1024).toFixed(2);
    imageTotalSize.innerText = size + 'MB';

    const imageLi = imageTable.querySelectorAll('li');

    const targetId = [...imageLi][deleteIndex].id;

    const li = imageTable.querySelector('#' + targetId);
    li.remove();
    imageList.splice(deleteIndex, 1);

  } else {
    if (state === 'create') {
      const image = editor.getImagesInfo()[findIndex(editor.getImagesInfo(), index)]
      totalSize += Number(image.size);
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
          <div class="image-box"><img src="${image.src}" ></div>
      </div>
      <a href="javascript:void(0)" data-image-index="${image.index}" class="image-size">${fixSize}MB</a>
      
  </li>`

    size += fixSize;
  }

  imageTotalSize.innerText = size.toFixed(2) + 'MB';
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
