const reset = document.querySelector<HTMLElement>('#reset');

export default class ResetBtn {
    private eventHandler: (e: Event) => void;

    addEvent(listner: (e: Event) => void) {
        reset.addEventListener('click', listner);
        this.eventHandler = listner;
    }
    removeEvent() {
        if (this.eventHandler) {
            reset.removeEventListener('click', this.eventHandler);
            this.eventHandler = null;
        }
    }
}