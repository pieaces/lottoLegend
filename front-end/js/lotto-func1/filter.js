const filterBox = document.querySelector('.filter-box');
const filterArrow = document.querySelector('.filter-arrow');
const filterListBox = document.querySelector('.filter-list');
const filterList = document.querySelectorAll('.filter-list > li');
const filterSelectText = document.querySelector('.filter-box > a');
const body = document.querySelector('body');
const present = document.querySelector('.present span strong');
const past = document.querySelector('.past span strong');
const future = document.querySelector('.future span strong');
const section = document.querySelector('section');
const header = document.querySelector('header');

function filterBoxCheck() {
  let flag = true;
  const filterMap = new Map([
    [0, '1-1'],
    [1, '1-2'],
    [2, '2'],
    [3, '3-1'],
    [4, '3-2'],
    [5, '4'],
    [6, '5'],
    [7, '6'],
    [8, '7'],
    [9, '8'],
    [10, '9'],
    [11, '10'],
    [12, '11'],
    [13, '12']
  ]);
  filterBox.addEventListener('click', () => {
    if (flag) {
      filterArrow.classList.remove('fa-sort-down');
      filterArrow.classList.add('fa-sort-up');
      filterListBox.style.display = 'block';
    } else {
      filterArrow.classList.add('fa-sort-down');
      filterArrow.classList.remove('fa-sort-up');
      filterListBox.style.display = 'none';
    }
    flag = !flag;
  });

  if (flag) {
    for (const node of filterList) {
      node.addEventListener('click', () => {
        filterSelectText.textContent = node.textContent;
        options.currentFilter = node.textContent;

        if ([...filterList].indexOf(node) === 0) {
          past.textContent = '';
          future.textContent = filterMap.get([...filterList].indexOf(node) + 1);
        } else if (
          [...filterList].indexOf(node) ===
          [...filterList].length - 1
        ) {
          past.textContent = filterMap.get([...filterList].indexOf(node) - 1);
          future.textContent = '';
        } else {
          future.textContent = filterMap.get([...filterList].indexOf(node) + 1);
          past.textContent = filterMap.get([...filterList].indexOf(node) - 1);
        }
        present.textContent = filterMap.get([...filterList].indexOf(node));
        if (
          options.currentFilter === '3-1' ||
          options.currentFilter === '3-2'
        ) {
          removejscssfile('js/lotto-func1', 'js');
          removejscssfile('css/lotto-func1', 'css');
          loadjscssfile('css/lotto-func2.css', 'css');
          loadjscssfile('js/lotto-func2/chart/bar.js', 'js');
          loadjscssfile('js/lotto-func2/chart/gauss.js', 'js');
          loadjscssfile('js/lotto-func2/chart/radar.js', 'js');
          loadjscssfile('js/lotto-func2/lotto-func2.js', 'js');
          section.remove();
          const section = document.createElement('section');
          section.setAttribute('include-html');
          header.appendChild(section);
        }
      });
    }
  }
}
