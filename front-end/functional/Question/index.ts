import QuestionBase from "./QuestionBase"

const bubbleQueBox = document.querySelector<HTMLElement>('.func1-chart-bubble-question >i');
const bubbleModal = document.querySelector<HTMLElement>('.func1-chart-bubble-question-modal');
const bubbleQueCancelIcon = document.querySelector<HTMLElement>('.func1-chart-bubble-question-cancel > i');

const numBoardQueBox = document.querySelector<HTMLElement>('.func2-numboard-question >i');
const numBoardModal = document.querySelector<HTMLElement>('.func2-numboard-question-modal');
const numBoardQueCancelIcon = document.querySelector<HTMLElement>('.func2-numboard-question-cancel > i');

export default class Question {

    init() {
        const bubbleQue = new QuestionBase(bubbleQueBox, bubbleModal, bubbleQueCancelIcon);
        const numBoardQue = new QuestionBase(numBoardQueBox, numBoardModal, numBoardQueCancelIcon);

        bubbleQue.on();
        numBoardQue.on();
    }
}