import configure from "../amplify/configure";
import { getAuthAPI } from "../amplify/api";
import { networkAlert, numberFormat, isoStringToDate, isoStringToTime } from "../functions";
import Swal from "sweetalert2";

configure();

const boardSection=document.querySelector('.board-section');

getAuthAPI('/users/payment').then(payments => {
    if(payments) makeBoard(payments);
    else Swal.fire({
        title:'결제내역이 없습니다',
        icon:'info'
    })
}).catch(() => networkAlert());


function makeBoard(data:any){
    data.forEach(item=>{
        const box=document.createElement('div');
        box.classList.add('board-box');

        const time=document.createElement('div');
        time.textContent=isoStringToDate(item.date) + ' ' + isoStringToTime(item.date);

        const service=document.createElement('div');
        service.textContent=`${item.plan} ${item.month}개월`;

        const price=document.createElement('div');
        price.textContent= numberFormat(item.price) + '원';

        const payment=document.createElement('div');
        payment.textContent=item.method;

        box.appendChild(time);
        box.appendChild(service);
        box.appendChild(price);
        box.appendChild(payment);

        boardSection.appendChild(box);
    })
}