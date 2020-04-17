import { getAuthAPI, postAuthAPI } from "./amplify/api";
import Amplify from "@aws-amplify/core";
import awsconfig from "./amplify/aws-exports";

Amplify.configure(awsconfig);

const board = document.querySelector<HTMLElement>('.board-container');
getAuthAPI('/admin/users').then(data =>{
    if(data){
        board.innerHTML = `<div>사용자 수 = ${data.count}</div><div>userName / 프리미엄:c, 프리미엄+:d / 개월수/ 요금 / bank | card</div>`;

        const div =document.createElement('div');

        const input1 = document.createElement('input');
        div.appendChild(input1);

        const input2 = document.createElement('input');
        div.appendChild(input2);

        const input3 = document.createElement('input');
        div.appendChild(input3);

        const input4 = document.createElement('input');
        div.appendChild(input4);

        const input5 = document.createElement('input');
        div.appendChild(input5);

        const btn = document.createElement('button');
        btn.textContent = 'makePayment';
        div.appendChild(btn);

        board.appendChild(div);

        btn.onclick = async () => {
            await postAuthAPI(`/admin/users/${input1.value}`, {plan:input2.value, month:Number(input3.value), price:Number(input4.value), method: input5.value});
            alert(`${input1.value}님의 결제 성공적 반영됨`);
        }
        data.users.forEach(item =>{
            const div = document.createElement('div');
            div.style.marginBottom = '0.5rem';
            div.innerHTML = JSON.stringify(item).replace(/,/g, '&nbsp;&nbsp;');
            board.appendChild(div);
        });
    }
})