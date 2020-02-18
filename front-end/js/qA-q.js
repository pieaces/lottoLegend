

import suneditor from 'suneditor'

// How to import plugins

import plugins from 'suneditor/src/plugins'

// How to import language files (default: en)
import lang from 'suneditor/src/lang'


const editor = suneditor.create('sample', {
  plugins: plugins,
  buttonList: [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    '/', // Line break
    ['bold', 'underline', 'italic', 'strike'],
    ['fontColor', 'hiliteColor'],
    ['paragraphStyle'],

    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['table', 'image'],
    ['fullScreen'],
    ['print']

  ],
  width: '100%',
  minHeight: '360',
  maxHeight: '360',
  lang: lang.ko,
});

const queBtn = document.querySelector('#que-btn');

queBtn.addEventListener('click', () => {
  console.log(editor.getContents(true));
})

