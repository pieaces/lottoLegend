function makeClickable(obj) {
    obj.leftBtnClickable = (obj) => {
        obj.leftBtn.addEventListener('click', () => {
            obj.plate[obj.current].classList.remove('chart-slide-current');
            if (current === 0) {
                obj.plate[obj.size - 1].classList.add('chart-slide-current');
                obj.current = obj.size - 1;
            } else {
                obj.current--;
                obj.plate[obj.current].classList.add('chart-slide-current');
            }
            obj.setData();
            obj.setText();
        });
    }

    obj.rightBtnClickable = (obj) => {
        obj.rightBtn.addEventListener('click', () => {
            if (obj.current === obj.size - 1) {
                obj.plate[obj.size - 1].classList.remove('chart-slide-current');
                obj.current = 0;
            } else {
                obj.plate[obj.current].classList.remove('chart-slide-current');
                obj.current++;
            }
            obj.plate[obj.current].classList.add('chart-slide-current');

            obj.setData();
            obj.setText();
        });
    }

    obj.numBtnClickable = (obj) => {
        for (let i = 0; i < obj.size; i++) {
            obj.plate[i].addEventListener('click', () => {
                obj.plate[obj.current].classList.remove('chart-slide-current');
                obj.current = i;
                obj.plate[obj.current].classList.add('chart-slide-current');

                obj.setBarData();
                obj.setBarText();
            });
        }
    }

    obj.init = (obj) => {
        obj.leftBtnClickable();
        obj.rightBtnClickable();
        obj.numBtnClickable();
    }
}