import { getAuthAPI } from "./amplify/api";
import Amplify from "@aws-amplify/core";
import awsconfig from "./amplify/aws-exports";

Amplify.configure(awsconfig);

const board = document.querySelector<HTMLElement>('.board-container');
getAuthAPI('/admin/users').then(data =>{
    if(data){
        data.forEach(item =>{
            const div = document.createElement('div');
            div.style.marginBottom = '0.5rem';
            div.innerHTML = JSON.stringify(item).replace(/,/g, '&nbsp;&nbsp;');
            board.appendChild(div);
        })
    }
})