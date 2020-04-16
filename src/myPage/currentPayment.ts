import configure from "../amplify/configure";
import { getAuthAPI, deleteAuthAPI } from "../amplify/api";
import { isoStringToDate, numberFormat, networkAlert, onlyUserAlert } from "../functions";
import Swal from "sweetalert2";
import { isLogedIn } from "../amplify/auth";

configure();

const bankbookBoard = document.querySelector('.board-section');
isLogedIn().then(result => {
    if (result) {
        getAuthAPI('/users/payment/bankbook').then(data => {
            if (data) {
                bankbookBoard.classList.remove('none');
                document.getElementById('orderDate').textContent = isoStringToDate(data.date);
                document.getElementById('orderProduct').textContent = data.plan;
                document.getElementById('person').textContent = data.person;
                document.getElementById('orderPrice').textContent = numberFormat(data.price) + '원';
                const dueDate = new Date(data.date);
                dueDate.setDate(dueDate.getDate() + 3);
                document.getElementById('dueDate').textContent = isoStringToDate(dueDate.toISOString());
            } else {
                Swal.fire({
                    title: '현재 무통장입금 주문현황이 없습니다',
                    icon: 'info'
                })
            }
        }).catch(() => networkAlert());
    } else onlyUserAlert();
})

document.getElementById('cancel').onclick = () => {
    deleteAuthAPI('/users/payment/bankbook').then(() => {
        Swal.fire({
            title: '정상적으로 취소되었습니다',
            icon: 'success'
        }).then(() => bankbookBoard.classList.add('none'));
    }).catch(() => networkAlert());
}