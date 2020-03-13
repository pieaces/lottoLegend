const autoBtn = document.querySelector<HTMLElement>('.auto-choose');

export default class AutoBtn {
    addEvent(listener: () => void) {
        autoBtn.addEventListener('click', listener);
    }
}