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

async function getData(method, params) {
  const headers = {
    'x-api-key': 'LZn9Pykicg982PNmTmdiB8pkso4xbGiQ4n4P1z1k' //API KEY
  };
  let url = `https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev/stats/${method}`;
  if (params) {
    if (typeof params.from === 'number' && typeof params.to === 'number') {
      url += `?from=${params.from}&to=${params.to}`;
    }
    else if (params.list) {
      url += `?list=${encodeURI(JSON.stringify(params.list))}`;
    }
  }
  const fetchResult = await fetch(url, { method: 'GET', headers });
  const data = JSON.parse(await fetchResult.text());
  this[method] = data.data;
  if (data.total) this.total = data.total;
  if (data.winNums) this.winNums = data.winNums
}

queBtn.addEventListener('click', () => {
  console.log(editor.getContents());
})

