const layout1 = document.querySelectorAll<HTMLElement>(".func1-layout");
const layout2 = document.querySelectorAll<HTMLElement>(".func2-layout");
const layout3_1 = document.querySelectorAll<HTMLElement>('.func3-layout-1');
const layout3_2 = document.querySelectorAll<HTMLElement>('.func3-layout-2');

export default class LayoutToggle {
    static readonly layout1Class = 'func1-layout'
    static readonly layout2Class = 'func2-layout'
    static readonly layout3_1Class = 'func3-layout-1'
    static readonly layout3_2Class = 'func3-layout-2'

    layout1On() {
        layout2.forEach(node => {
            node.classList.add('none');
        });
        layout3_1.forEach(node => {
            node.classList.add('none');
        });
        layout3_2.forEach(node => {
            node.classList.add('none');
        });

        layout1.forEach(node => {
            if (node.classList.contains(LayoutToggle.layout1Class)) {
                node.classList.remove('none');
            } else {
                node.classList.add('none');
            }
        });

    }
    layout2On() {

        layout1.forEach(node => {
            node.classList.add('none');
        });
        layout3_1.forEach(node => {
            node.classList.add('none');
        });
        layout3_2.forEach(node => {
            node.classList.add('none');
        });
        layout2.forEach(node => {
            if (node.classList.contains(LayoutToggle.layout2Class)) {
                node.classList.remove('none');
            } else {
                node.classList.add('none');
            }
        });
    }

    layout3_1On() {

        layout1.forEach(node => {
            node.classList.add('none');
        });
        layout2.forEach(node => {
            node.classList.add('none');
        });
        layout3_2.forEach(node => {
            node.classList.add('none');
        });
        layout3_1.forEach(node => {
            if (node.classList.contains(LayoutToggle.layout3_1Class)) {
                node.classList.remove('none');
            } else {
                node.classList.add('none');
            }
        });

    }

    layout3_2On() {

        layout1.forEach(node => {
            node.classList.add('none');
        });
        layout2.forEach(node => {
            node.classList.add('none');
        });
        layout3_1.forEach(node => {
            node.classList.add('none');
        });
        layout3_2.forEach(node => {
            if (node.classList.contains(LayoutToggle.layout3_2Class)) {
                node.classList.remove('none');
            } else {
                node.classList.add('none');
            }
        });

    }

}