import configure from "../amplify/configure";
import { getQueryStringObject, makeLoading, removeLoading } from "../functions";
import { getUnAuthAPI } from "../amplify/api";
import Swal from "sweetalert2";
makeLoading();
configure();

const phone = '+82' + getQueryStringObject().phone.slice(1);
const idListEl = document.querySelector<HTMLElement>('#find-id-result-container');

getUnAuthAPI('/account', { phone }).then(users => {
    if (users.length > 0) makeIdList(users);
    else {
        Swal.fire({
            title: '존재하지 않음',
            text: '인증완료 되지 않았거나, 존재하지 않는 휴대폰번호입니다',
            icon: 'info'
        });
        idListEl.textContent = '인증완료 되지 않았거나, 존재하지 않는 휴대폰번호입니다';
    }
    removeLoading();
});

function makeIdList(ids: string[]) {
    ids.forEach(id => {
        const idBox = document.createElement('li');
        idBox.classList.add('find-id-result-box');
        idBox.textContent = id;
        idListEl.appendChild(idBox);
    })
}