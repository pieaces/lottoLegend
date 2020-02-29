import QuestionBase from "./QuestionBase"

const bubbleQueBox = document.querySelector<HTMLElement>('.func1-bubble-que >i');
const bubbleModal = document.querySelector<HTMLElement>('.func1-bubble-que-modal');
const bubbleQueCancelIcon = document.querySelector<HTMLElement>('.func1-bubble-que-cancel > i');

const numBoardQueBox = document.querySelector<HTMLElement>('.func2-numboard-que >i');
const numBoardModal = document.querySelector<HTMLElement>('.func2-numboard-que-modal');
const numBoardQueCancelIcon = document.querySelector<HTMLElement>('.func2-numboard-que-cancel > i');

export default class Question {
    bubbleQue = new QuestionBase(bubbleQueBox, bubbleModal, bubbleQueCancelIcon);
    numBoardQue = new QuestionBase(numBoardQueBox, numBoardModal, numBoardQueCancelIcon);
}