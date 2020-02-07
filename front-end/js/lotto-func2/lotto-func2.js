const lottoNum = document.querySelectorAll('.lotto-num-box> div > div');
const selectNumBox = document.querySelector('.select-num-box');
const numExcludeBtn = document.querySelector('.num-exclude-btn');
const resetNumBtn = document.querySelector('.reset-num-btn');
const winNum = document.querySelectorAll('.win-num-box > div');
const numTerm = document.querySelector('.num-term');
const numFreq = document.querySelector('.num-freq');

function numExclude() {
  const lottoNumDefaultColor = 'rgba(231, 76, 60, 0.2)';
  const lottoNumSelectColor = '#e6e600';
  const lottoNumExcludeColor = 'darkgray';
  const nums = new Array();
  const numExcludeCount = 10;
  let num = null;

  // 번호판 색깔 설정과 번호판 번호 삭제와 선택번호배열,선택번호 삭제

  for (const node of lottoNum) {
    node.addEventListener('click', e => {
      const nodeValue = parseInt(node.textContent);
      if (nums.indexOf(nodeValue) === -1) {
        if (num !== null) {
          if (nums.indexOf(num) === -1) {
            lottoNum[num - 1].style.backgroundColor = lottoNumDefaultColor;
          }
        }
        num = nodeValue;
        node.style.backgroundColor = lottoNumSelectColor;
      } else {
        if (confirm(`번호 ${nodeValue} 선택취소하시겠습니까?`)) {
          if (num !== null) {
            lottoNum[num - 1].style.backgroundColor = lottoNumDefaultColor;
          }
          num = nodeValue;
          node.style.backgroundColor = lottoNumSelectColor;
          selectNumBox.children[nums.length - 1].classList.remove(
            `select-num-box${nums.length}`
          );
          for (let i = 0; i < selectNumBox.children.length; i++) {
            if (nums.indexOf(nodeValue) !== -1) {
              selectNumBox.children[nums.indexOf(nodeValue)].textContent = '';
              nums.splice(nums.indexOf(nodeValue), 1);
              break;
            }
          }

          for (let i = 0; i < selectNumBox.children.length; i++) {
            selectNumBox.children[i].textContent = nums[i];
            selectNumBox.children[i].style.backgroundColor = '';
          }

          for (let i = 0; i < nums.length; i++) {
            setColorLotto(
              parseInt(selectNumBox.children[i].textContent),
              selectNumBox.children[i]
            );
          }
        } else {
          lottoNum[num - 1].style.backgroundColor = lottoNumDefaultColor;
          num = null;
        }
      }
      e.stopPropagation();
    });
  }

  //초기화함수: 선택번호배열,선택번호, 번호판 초기화

  resetNumBtn.addEventListener('click', e => {
    if (nums.length === 0) {
      alert('초기화 할 번호가 없습니다');
    } else {
      if (confirm(`선택번호를 모두 초기화하시겠습니까?`)) {
        for (const node of [...selectNumBox.children]) {
          node.textContent = '';
          node.style.backgroundColor = '';
        }

        for (let i = 0; i < nums.length; i++) {
          lottoNum[nums[i] - 1].style.backgroundColor = lottoNumDefaultColor;
          selectNumBox.children[i].classList.remove(`select-num-box${i + 1}`);
        }

        nums.splice(0, nums.length);
        if (num !== null) {
          lottoNum[num - 1].style.backgroundColor = lottoNumDefaultColor;
          num = null;
        }
      }
    }
    e.stopPropagation();
  });

  //번호제외함수: 선택번호 배열 추가(중복x), 번호판 색깔 설정, 선택번호 추가

  numExcludeBtn.addEventListener('click', e => {
    if (nums.length < numExcludeCount) {
      if (nums.indexOf(num) === -1) {
        if (num !== null) {
          lottoNum[num - 1].style.backgroundColor = lottoNumExcludeColor;
          nums.push(num);
          const numOrder = nums.indexOf(num);
          selectNumBox.children[numOrder].classList.add(
            `select-num-box${numOrder + 1}`
          );
          selectNumBox.children[numOrder].textContent = num;
          setColorLotto(num, selectNumBox.children[numOrder]);
          num = null;
          chartGaussDataBox.datasets[0].data = [
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100)
          ];
          chartRadarDataBox.datasets[0].data = [
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100)
          ];
          chartBarDataBox.datasets[0].data = [
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100)
          ];

          chartGaussInstance.update();
          chartRadarInstance.update();
          chartBarInstance.update();
        }
      }
    } else {
      alert(`더 이상 번호를 제외할 수 없습니다(최대 개수:${numExcludeCount})`);
    }

    e.stopPropagation();
  });

  // 번호판 다른 곳 누르면 선택색깔 초기화, numExclude 함수 안의 다른 함수들 이벤트 전파 막아야 함

  let myExclusiveEl = document.querySelectorAll('body *');
  let myEls = document.querySelectorAll('.main-1-3 *');

  myExclusiveEl = [...myExclusiveEl].filter(parent => {
    let containedByExclusionNode = [...myEls].filter(child => {
      if (parent === child) {
        return true;
      } else {
        return false;
      }
    });
    if (containedByExclusionNode.length === 0) {
      return true;
    } else {
      return false;
    }
  });

  for (const node of myExclusiveEl) {
    node.addEventListener('click', e => {
      if (num !== null) {
        lottoNum[num - 1].style.backgroundColor = lottoNumDefaultColor;
        num = null;
      }
    });
  }
}

// 번호색깔지정함수

function setColorLotto(num, Box) {
  if (1 <= num && num <= 10) {
    Box.style.backgroundColor = '#FBC400';
  } else if (num <= 20) {
    Box.style.backgroundColor = '#69C8F2';
  } else if (num <= 30) {
    Box.style.backgroundColor = '#FF7272';
  } else if (num <= 40) {
    Box.style.backgroundColor = '#AAAAAA';
  } else if (num <= 45) {
    Box.style.backgroundColor = '#B0D840';
  }
}

// 당첨번호색깔설정함수

function setColorWinNum() {
  for (const node of winNum) {
    const nodeValue = parseInt(node.textContent);
    setColorLotto(nodeValue, node);
  }
}

function numFreqOrTermToggle() {
  numTerm.addEventListener('click', () => {
    numTerm.classList.add('lotto-check-current');
    numFreq.classList.remove('lotto-check-current');
  });

  numFreq.addEventListener('click', () => {
    numFreq.classList.add('lotto-check-current');
    numTerm.classList.remove('lotto-check-current');
  });
}

// 함수 실행
function lottoFunc2() {
  numFreqOrTermToggle();
  setColorWinNum();
  numExclude();
}

lottoFunc2();
