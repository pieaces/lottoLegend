import configure from './amplify/configure'
import DataAPI from "./functional/DataAPI";
import Layout from './functional/Layout'

configure();
const loading = document.querySelector<HTMLElement>('.loading-box');

async function execute() {
    loading.classList.remove('none');
    await DataAPI.getInstance().init();
    const layout = new Layout();
    layout.init();
    loading.classList.add('none');
    loading.classList.add('filter-loading');
}
execute();

/*2번 레이아웃에서 번호빈도만 보여주는 함수 */

// const numFreq=document.querySelector('.func2-num-freq');
// const numFreqTerm=document.querySelector('.func2-num-freq-term');
// 번호빈도만 보여줄때
// numFreq.classList.add('none');
// numFreqTerm.classList.add('none');
//다 보여줄때
// numFreq.classList.remove('none');
// numFreqTerm.classList.remove('none');

/*전멸구간 텍스트 삽입 */

// const excludedLineCountText=document.querySelector('#excludedLineCount-text');

// excludedLineCountText.textContent="전멸구간텍스트";


// const filterValueBox=document.querySelectorAll<HTMLElement>('.func3-filter-value-box:nth-child(n+2)');
// const a=[[1,2,3,4,5,6,7,8,9,10],[1,2,3,4,5,6,7,8,9,10],[1,2,3,4,5,6,7,8,9,10]]; //이월수,포함수,제외수 배열

// for(let i=0;i<a.length;i++){
//     for(let j=0;j<a[i].length;j++){
//         filterValueBox[i].children[j].textContent=String(a[i][j]);
            // setColorLotto(a[i][j],filterValueBox[i].children[j])
//     }
// }

/*저값 개수부터 연속수 포함 값 삽입 */

// const b=[1,2,3,4,5,6,7,8,9,10]; //저값 개수부터 연속수 포함까지 배열
// const filterTable=document.querySelectorAll<HTMLElement>('.func3-filter-table tr:nth-child(2) td');

// for(let i=0;i<b.length;i++){
//     filterTable[i].textContent=String(b[i]);
// setColorLotto(b[i],filterTable[i])
// }


/*무료조합기 포함수 제외수 값 삽입 */

// const filterValueBox=document.querySelectorAll<HTMLElement>('.func3-filter-value-box');

// const a=[[1,2,3,4,5,6,7,8,9,10],[1,2,3,4,5,6,7,8,9,10]]; //포함수 제외수 배열

// for(let i=0;i<a.length;i++){
//     for(let j=0;j<a[i].length;j++){
//         filterValueBox[i].children[j].textContent=String(a[i][j]);
 // setColorLotto(a[i][j],filterValueBox[i].children[j])
//     }
// }