const reset = document.querySelector('#reset');

export default class ResetBtn {
    private addEvent(listner: (e:Event) => void) {
        reset.addEventListener('click', listner);
    }
    init(listner: (e:Event) => void) {
        if (reset.removeEventListener) {
            reset.removeEventListener('click', listner);
        }
        this.addEvent(listner);
    }
}