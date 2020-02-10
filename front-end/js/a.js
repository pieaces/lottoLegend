


// a.classList.add('slow');
// a.classList.remove('slow');

//////////////////// translate 함수

const checkboxContainer = document.querySelector('.func1-checkbox');
const filterList = document.querySelector('.filter-list');
const b = [1, 2];
const c = [1, 2, 3, 4, 5, 6, 7];
function getData() {

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

function DropDownSetColor() {
    let current = 3;
    const beforeColor = 'darkgray';
    const currentColor = 'blue';
    const afterColor = 'red';
    const fontColor = 'white';
    for (let i = 0; i < c.length; i++) {
        const li = document.createElement('li');
        li.textContent = i;
        if (i < current) {
            li.style.backgroundColor = beforeColor;
        } else if (i === current) {
            li.style.backgroundColor = currentColor;
        } else if (i > current) {
            li.style.backgroundColor = afterColor;
        }
        filterList.appendChild(li);
    }
}

DropDownSetColor();