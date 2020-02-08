function makeClickable(obj) {
    obj.leftBtn.addEventListener('click', () => {
        obj.numBtn[obj.current].classList.remove('chart-slide-current');
        if (obj.current === 0) {
            obj.numBtn[obj.size - 1].classList.add('chart-slide-current');
            obj.current = obj.size - 1;
        } else {
            obj.current--;
            obj.numBtn[obj.current].classList.add('chart-slide-current');
        }
        obj.setData();
        obj.setText();
    });

    obj.rightBtn.addEventListener('click', () => {
        if (obj.current === obj.size - 1) {
            obj.numBtn[obj.size - 1].classList.remove('chart-slide-current');
            obj.current = 0;
        } else {
            obj.numBtn[obj.current].classList.remove('chart-slide-current');
            obj.current++;
        }
        obj.numBtn[obj.current].classList.add('chart-slide-current');

        obj.setData();
        obj.setText();
    });

    for (let i = 0; i < obj.numBtn.length; i++) {
        obj.numBtn[i].addEventListener('click', () => {
            obj.numBtn[obj.current].classList.remove('chart-slide-current');
            obj.current = i;
            obj.numBtn[obj.current].classList.add('chart-slide-current');

            obj.setData();
            obj.setText();
        });
    }
}