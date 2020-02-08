const filterBox = document.querySelector('.filter-box');
const filterArrow = document.querySelector('.filter-arrow');
const filterListBox = document.querySelector('.filter-list');
const filterList = document.querySelectorAll('.filter-list > li');
const filterSelectText = document.querySelector('.filter-box > a');
const present = document.querySelector('.present span strong');
const past = document.querySelector('.past span strong');
const future = document.querySelector('.future span strong');

export default function DropDown(_filter) {
  let flag = true;
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

        const index = [...filterList].indexOf(node);
        if (index === 0) {
          past.textContent = '';
          future.textContent = filterMap.get([...filterList].indexOf(node) + 1);
        } else if (index === [...filterList].length - 1) {
          past.textContent = filterMap.get([...filterList].indexOf(node) - 1);
          future.textContent = '';
        } else {
          future.textContent = filterMap.get([...filterList].indexOf(node) + 1);
          past.textContent = filterMap.get([...filterList].indexOf(node) - 1);
        }
        present.textContent = filterMap.get([...filterList].indexOf(node));
      });
    }
  }
}
