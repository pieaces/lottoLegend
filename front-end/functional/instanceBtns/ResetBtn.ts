const reset = document.querySelector('#reset');

export default class ResetBtn {
    addEvent(listner: () => void) {
        reset.addEventListener('click', listner);
    }
    init(listner: () => void) {
        if (reset.removeEventListener) {
            reset.removeEventListener('click', listner);
        }
    }
}