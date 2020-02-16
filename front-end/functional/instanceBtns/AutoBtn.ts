const autoBtn = document.querySelector<HTMLElement>('.func1-auto-choose');

export default class AutoBtn {
    addEvent(listener: () => void) {
        autoBtn.addEventListener('click', listener);
    }
}