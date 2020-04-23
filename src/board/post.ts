import configure from '../amplify/configure'
import 'core-js/stable/dom-collections/for-each'
import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'
import { ko } from 'suneditor/src/lang'
import { postUnAuthAPI, postAuthAPI, getUnAuthAPI, patchAuthAPI, getAuthAPI } from '../amplify/api';
import { isLogedIn, getUserName } from '../amplify/auth'
import { networkAlert, onlyUserAlert, stringTrimer, getQueryStringObject, makeLoading, removeLoading } from '../functions'
import Swal from 'sweetalert2'
import { Category, getCategoryHtml, makeNum } from './functions';

configure();
isLogedIn().then(bool => {
    if (!bool) onlyUserAlert();
})

function attachTimestamp(name) {
    const index = name.indexOf('.');
    const now = new Date();
    return `${name.slice(0, index)}_${now.getFullYear()}-${now.getMonth()}-${now.getDate()}:${now.getHours()}:${now.getMinutes()}${name.slice(index)}`;
}
let editor:any;
const mqMobile = window.matchMedia("(max-width: 767px)");
if (mqMobile.matches) {
    mqMobileInit();
} else {
    mqDeskTopInit();
}
function mqMobileInit() {
    editor = suneditor.create('sample', {
        plugins,
        buttonList: [
            ['bold', 'underline', 'italic', 'strike'],
            ['fontColor', 'hiliteColor'],
            ['image'],
        ],
        width: '100%',
        height: 'auto',
        minHeight: '360',
        imageWidth: 500,
        imageUploadSizeLimit: 4 * 1024 * 1024,
        lang: ko
    });
}

function mqDeskTopInit() {
    editor = suneditor.create('sample', {
        plugins,
        buttonList: [
            ['undo', 'redo'],
            ['fontSize', 'formatBlock'],
            ['bold', 'underline', 'italic', 'strike'],
            ['fontColor', 'hiliteColor'],
            ['paragraphStyle'],
            ['image'],
            ['table', 'align', 'list', 'horizontalRule'],
        ],
        width: '100%',
        height: 'auto',
        minHeight: '480',
        imageWidth: 500,
        imageUploadSizeLimit: 4 * 1024 * 1024,
        lang: ko
    });
}

const post = getQueryStringObject().id;
const category: Category = document.getElementById('wrapper').getAttribute('data-category') as Category;
const submitBtn = document.getElementById('submit-btn');
const titleInput = document.querySelector<HTMLInputElement>('#title-text');
const imageTotalSize = document.getElementById('image-total-size');
const imageRemove = document.getElementById('image-remove');
const imageTable = document.getElementById('image-list');

if (post) {
    getUnAuthAPI(`/posts/${post}`, { flag: 1 }).then(post => {
        titleInput.value = post.title;
        editor.setContents(post.contents);
    });
}
if (category === 'include' || category === 'exclude') {
    isLogedIn().then(value => {
        if (value) {
            getAuthAPI('/numbers/piece', { choice: category })
                .then(numbers => {
                    if (numbers.length === 0) {
                        Swal.fire({
                            title: '알림',
                            text: '번호리스트가 없습니다.',
                            icon: 'info',
                            footer: `<a href="/system/${category}.html">번호 선택하러 가기</a>`
                        }).then(() => location.href = `/system/${category}.html`);
                    }
                    makeNum(document.querySelector<HTMLElement>('.inc-exc-num-container'), numbers);
                })
        } else onlyUserAlert();
    });
}
imageRemove.addEventListener('click', () => {
    deleteCheckedImages();
})
interface ImageInfo {
    element: HTMLElement;
    name: string;
    src: string;
    size: number;
    index: number;
}
let imageList: ImageInfo[] = [];
let selectedImages = [];
let totalSize = 0;

submitBtn.onclick = async () => {
    const title = stringTrimer(titleInput.value);
    if (title === "") return Swal.fire({
        title: '제목은 비워둘 수 없습니다',
        icon: 'warning'
    });
    else if(title.length > 40 ) return Swal.fire({
        title: '제목은 40글자를 넘길 수 없습니다',
        icon: 'warning'
    });
    if (editor.getContents() === "<p><br></p>") return Swal.fire({
        title: '내용은 비워둘 수 없습니다',
        icon: 'warning'
    });
    makeLoading();
    try {
        const images = [];
        const imageElements = [];
        for (let i = 0; i < imageList.length; i++) {
            if (!(/^https:\/\//.test(imageList[i].element.getAttribute('src')))) {
                const dataURL = imageList[i].src;
                const fileName = attachTimestamp(imageList[i].name);
                const userName = await getUserName();
                imageElements.push([imageList[i].element, `https://canvas-lotto.s3.ap-northeast-2.amazonaws.com/images/${userName}/${fileName}`]);
                images.push({ userName, fileName, dataURL });
            }
        }
        await postUnAuthAPI('/images', images);
        imageElements.forEach(image => {
            image[0].setAttribute('src', image[1]);
        });
        let leapId: number;
        const contents = editor.getContents();
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

        Swal.fire({
            title: '완료',
            text: '공유해주셔서 감사합니다',
            icon: 'success',
            allowOutsideClick: false,
            timer: 1500,
        }).then(() => {
            location.href = `/${getCategoryHtml(category, 'read')}?id=${leapId}`;
        });
    } catch (err) {
        networkAlert();
    }finally{
        removeLoading();
    }
}
//새로고침, 이전페이지 이동 막기
window.onbeforeunload = function (e) {
    if (titleInput.value !== "") {
        const dialogText = '';
        e.returnValue = dialogText;
        return dialogText;
    }
};

editor.onImageUpload = function (targetImgElement, index, state, imageInfo, remainingFilesCount) {
    if (state === 'delete') {
        const deleteIndex = findIndex(imageList, index);
        totalSize -= imageList[deleteIndex].size;
        const size = (totalSize / 1024 / 1024).toFixed(2);
        imageTotalSize.innerText = size + 'MB';
        const imageLi = imageTable.querySelectorAll('li');
        const targetId = imageLi[deleteIndex].id;
        const li = imageTable.querySelector('#' + targetId);
        li.remove();
        imageList.splice(deleteIndex, 1);
        if (imageList.length === 0) {
            imageTable.classList.add('none');
        }

    } else {
        if (state === 'create') {
            const image = editor.getImagesInfo()[findIndex(editor.getImagesInfo(), index)]
            totalSize += Number(image.size);
            imageList.push(image);
            if (imageTable.classList.contains('none')) {
                imageTable.classList.remove('none');
            }
        } else { // update }
        }

        if (remainingFilesCount === 0) {
            setImageList(imageList);
        }
    }
}
// Upload from outside the editor
document.getElementById('files-upload').addEventListener('change', function (e: Event) {
    if ((<HTMLInputElement>e.target).files) {
        editor.insertImage((<HTMLInputElement>e.target).files);
        (<HTMLInputElement>e.target).value = ''
    }
})
// Edit image list
function setImageList(imageList: { size: number, index: number, src: string }[]) {
    let list = '';
    let size = 0;

    for (let i = 0; i < imageList.length; i++) {
        const image = imageList[i];
        const fixSize = Number((image.size / 1024 / 1024).toFixed(2))
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

    const imageContainer = document.querySelectorAll<HTMLElement>('.image-container');
    const imageListSize = document.querySelectorAll<HTMLElement>('.image-size');

    imageContainer.forEach(node => {
        node.addEventListener('click', () => {
            checkImage(parseInt(node.dataset.imageIndex));
        });
    })
    imageListSize.forEach(node => {
        node.addEventListener('click', () => {
            selectImage('select', parseInt(node.dataset.imageIndex));
        });
    })

    const imageTableList = imageTable.querySelectorAll<HTMLElement>('li');

    imageTableList.forEach(node => {
        node.addEventListener('click', () => {
            const img = node.firstElementChild.firstElementChild.firstElementChild as HTMLElement;
            if (node.classList.contains('checked')) {
                img.style.border = "4px solid rgb(149, 90, 89)";
            } else {
                img.style.border = "4px solid white";
            }
        });
    })
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
        imageRemove.setAttribute('disabled', 'true');
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