import configure from "../amplify/configure";

configure();

const boardSection=document.querySelector('.board-section');

makeBoard([
    {time:"2020-04-07",service:"프리미엄",price:"9900",payment:"무통장 입금"},
    {time:"2020-04-08",service:"프리미엄",price:"9900",payment:"무통장 입금"},
    {time:"2020-04-09",service:"프리미엄",price:"9900",payment:"무통장 입금"}
]);

function makeBoard(data:any){
    data.forEach(item=>{
        const box=document.createElement('div');
        box.classList.add('board-box');

        const time=document.createElement('div');
        time.textContent=item.time;

        const service=document.createElement('div');
        service.textContent=item.service;

        const price=document.createElement('div');
        price.textContent=`${item.price}원`;

        const payment=document.createElement('div');
        payment.textContent=item.payment;

        box.appendChild(time);
        box.appendChild(service);
        box.appendChild(price);
        box.appendChild(payment);

        boardSection.appendChild(box);
    })
}