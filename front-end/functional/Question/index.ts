import QuestionBase from "./QuestionBase"

const bubbleQueBox = document.querySelector<HTMLElement>('.func1-chart-bubble-question >i');
const bubbleModal = document.querySelector<HTMLElement>('.func1-chart-bubble-question-modal');
const bubbleQueCancelIcon = document.querySelector<HTMLElement>('.func1-chart-bubble-question-cancel > i');

export default class Question {

    init() {
        const bubbleQue = new QuestionBase(bubbleQueBox, bubbleModal, bubbleQueCancelIcon);

        bubbleQue.on();
    }
}