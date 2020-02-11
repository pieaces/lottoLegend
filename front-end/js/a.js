


// a.classList.add('slow');
// a.classList.remove('slow');

//레이더 차트
// 보여지는 그림이 움직일 때는 클래스 추가 x
// 안 보여지는 그림이 움직일 때 클래스 추가
//대신 움직일 때마다 각 그림의 클래스가 초기화 되어있어야함
//////////////////// translate 함수

const checkboxContainer = document.querySelector('.func1-checkbox');
const filterList = document.querySelector('.filter-list');
const b = [1, 2];
const c = [1, 2, 3, 4, 5, 6, 7];
function getData() {
    // ex 체크박스 배열이 b이고 [1,2] 일 때
    for (let i = 0; i < b.length; i++) {
        const div = document.createElement('div');
        const checkbox = document.createElement('input');
        const num = document.createTextNode(i);
        div.appendChild(num);
        checkbox.classList.add('checkbox');
        div.appendChild(checkbox);
        checkboxContainer.appendChild(div);
    }

}
getData();

////////////////////////////////////// checkbox dom 추가 함수

function DropDownSetColor() {
    //ex 드롭다운 배열이 c 배열이고 [1,2,3,4,5,6,7]일 때
    let current = 3;
    const beforeColor = '#7e8c8c';
    const currentColor = 'white';
    const afterColor = '#3da8e3';
    const restFontColor = 'black';
    for (let i = 0; i < c.length; i++) {
        const li = document.createElement('li');
        li.textContent = i;
        if (i < current) {
            li.style.backgroundColor = beforeColor;
            li.style.color = currentColor;
        } else if (i === current) {
            li.style.backgroundColor = currentColor;
            li.style.color = restFontColor;
        } else if (i > current) {
            li.style.backgroundColor = afterColor;
            li.style.color = currentColor;
        }
        filterList.appendChild(li);
    }
}

DropDownSetColor();

//////////////////////////// 드롭다운 dom 추가 & 색깔 설정 함수

const filterListArray = document.querySelectorAll('.filter-list > li');

for (const node of filterListArray) {
    node.addEventListener('click', () => {
        //드롭다운 박스 숫자에 따라 레이아웃 바꾼다
        //ex current 드롭다운 현재 필터 숫자
        const current = "1-1";
        if (current === '1-1') {
            //레이아웃 1
        } else if (current === '3-1') {
            //레이아웃 2
        }
    })
}


/////////////////////// 드롭다운 숫자에 따라 레이아웃 바꿈

const clearLayout = document.querySelector('.filter-func-clear-layout');
const funcLayout = document.querySelector('.filter-func-layout');
// 만약 레이아웃 3이면
// clearLayout.classList.remove('none');
// funcLayout.classList.add('none');