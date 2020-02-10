const nextBtn = document.getElementById('nextBtn');

export default class NextBtn {
    private addEvent(listener: () => any) {
        nextBtn.addEventListener('click', listener);
    }
    init(listener: () => any) {
        this.addEvent(listener);
    }
}