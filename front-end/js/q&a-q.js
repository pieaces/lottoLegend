/**
 * ID : 'suneditor_sample'
 * ClassName : 'sun-eidtor'
 */

import SUNEDITOR from 'suneditor'

import image from 'suneditor/src/plugins/dialog/link'
// ID or DOM object
const editor = SUNEDITOR.create(document.getElementById("sample") || "sample", {
  // All of the plugins are loaded in the "window.SUNEDITOR" object in dist/suneditor.min.js file
  // Insert options
  plugins: [image],
  buttonList: [
    ['image']
  ],
  width: "100%",
  height: "300",
  maxHeight: "300",
  minHeight: "300",
  // Language global object (default: en)
  lang: SUNEDITOR_LANG["ko"]
});
