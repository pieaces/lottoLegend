import 'regenerator-runtime/runtime'
import 'core-js/stable/promise'
//import 'core-js/stable/object/assign'
import { getAuthAPI, postAuthAPI } from "./amplify/api";
import Amplify from "@aws-amplify/core";
import awsconfig from "./amplify/aws-exports";
import { isLogedIn } from './amplify/auth';

Amplify.configure(awsconfig);

const board = document.querySelector<HTMLElement>('.board-container');
isLogedIn().then(value => {
    if (value) {
        getAuthAPI('/admin/users').then(data => {
            if (data) {
                board.innerHTML = `<div>사용자 수 = ${data.count}</div><div>userName / 프리미엄:c, 프리미엄+:d / 개월수/ 요금 / bank | card</div>`;
                const div = document.createElement('div');

                const input1 = document.createElement('input');
                div.appendChild(input1);

                const btn = document.createElement('button');
                btn.textContent = 'makePayment';
                div.appendChild(btn);

                board.appendChild(div);

                btn.onclick = async () => {
                    await postAuthAPI(`/admin/users/${input1.value}`);
                    alert(`${input1.value}님의 결제 성공적 반영됨`);
                }
                data.users.forEach(item => {
                    const div = document.createElement('div');
                    div.style.marginBottom = '0.5rem';
                    div.innerHTML = JSON.stringify(item).replace(/,/g, '&nbsp;&nbsp;');
                    board.appendChild(div);
                });
            }
        });
    }
});