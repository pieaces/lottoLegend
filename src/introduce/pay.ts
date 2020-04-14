import configure from "../amplify/configure";
import { numberFormat, networkAlert, onlyUserAlert } from "../functions";
import { isNull } from "util";
import Swal from "sweetalert2";
import { postAuthAPI, getAuthAPI } from "../amplify/api";
import { isLogedIn } from "../amplify/auth";
import Analytics from "@aws-amplify/analytics";

const priceContainer = document.querySelectorAll<HTMLElement>('.price-container');
const priceBox = document.querySelectorAll<HTMLElement>('.price-box');
const priceAnchorBox = document.querySelectorAll<HTMLElement>('.price-service-anchor-box');
const priceAnchorHoverBox = document.querySelectorAll<HTMLElement>('.price-service-anchor-hover-box');
const price = document.getElementById('price');
const productName = document.getElementById('product-name');
const bankbook = document.getElementById('bankbook');


configure();
checkboxToggle();
isLogedIn().then(result => {
    if (result) {
        getAuthAPI('/users/payment/bankbook').then(data => {
            if (data) {
                Swal.fire({
                    title: '이미 주문하신 상품이 있습니다',
                    text: '다른 상품가입을 원하시면 기존 주문을 취소해주세요',
                    icon: 'warning'
                }).then(() => location.href = '/myPage/currentPayment.html')
            }
        });
    }
})

type PayMethod = 'bankbook' | 'card';
let payMethod: PayMethod = null;
const bankPerson = document.querySelector('.payment-method-box');
bankbook.onclick = () => {
    if (payMethod !== 'bankbook') {
        bankbook.classList.add('payment-clicked');
    }
    payMethod = 'bankbook';
    bankPerson.classList.remove('none');
}
const monthList = [24, 12, 6, 1];
const priceList = [150000, 90000, 53000, 9900];
const productList = ['프리미엄 2년', '프리미엄 1년', '프리미엄 6개월', '프리미엄 1개월'];
let current: number = null;
const person = document.querySelector<HTMLInputElement>('#deposit-name');
const bank = document.querySelector<HTMLInputElement>('.payment-bank-content');

const select = document.querySelector<HTMLSelectElement>('#combi-num');
function premiumPlusText(){
    price.textContent = numberFormat(Math.floor(priceList[current] * 1.5/1000)*1000);
    productName.textContent = productList[current].slice(0, 4) + '+ ' + productList[current].slice(5);
}
function premiumText(){
    price.textContent = numberFormat(priceList[current]);
    productName.textContent = productList[current];
}
select.addEventListener('change', () => {
    if (current) {
        if (select.selectedIndex === 1) {
            premiumPlusText();
        }
        else {
            premiumText();
        }
    }
})

document.getElementById('order-btn').onclick = () => {
    isLogedIn().then(result => {
        if (result) {
            if (isNull(current)) {
                Swal.fire({
                    title: '상품카드를 선택해주세요',
                    icon: 'warning'
                });
            } else if (isNull(payMethod)) {
                Swal.fire({
                    title: '결제수단을 선택해주세요',
                    icon: 'warning'
                });
            } else if (person.value === '') {
                Swal.fire({
                    title: '입금자명은 비워둘 수 없습니다',
                    icon: 'warning'
                })
            } else if (payMethod === 'bankbook') {

                postAuthAPI('/users/payment/bankbook', { bank: bank.textContent, plan: select.value, person: person.value, month: monthList[current], price: priceList[current] }).then(() => {
                    Analytics.record({
                        name: 'payment',
                        attributes: { method: 'bankbook' },
                        metrics: { money: priceList[current] }
                    }); Swal.fire({
                        title: '정상적으로 기록되었습니다',
                        icon: 'info',
                        timer: 2000
                    }).then(() => location.href = '/myPage/currentPayment.html');
                }).catch(() => networkAlert());
            }
        } else {
            onlyUserAlert();
        }
    })
}
function checkboxToggle() {
    const overEventHandler: (() => void)[] = [];
    const outEventHandler: (() => void)[] = [];

    for (let i = 0; i < priceContainer.length; i++) {
        priceContainer[i].addEventListener('click', function () {
            if (current !== i) {
                if (current !== null) { // 다른 곳이 이미 선택된 상태에서 또 다른 곳을 선택할 때 
                    priceBox[current].style.transform = "perspective(1000px) rotateY(0deg)";
                    priceAnchorBox[current].style.transform = "perspective(1200px) rotateY(180deg)";
                    priceAnchorHoverBox[current].style.transform = "perspective(1000px) rotateY(0deg)";
                    priceAnchorHoverBox[current].addEventListener('mouseover', overEventHandler[current]);
                    priceAnchorHoverBox[current].addEventListener('mouseout', outEventHandler[current]);
                } //처음 선택할때 + 다른 곳이 이미 선택된 상태에서 또 다른 곳을 선택할 때  
                priceBox[i].style.transform = "perspective(1200px) rotateY(-179.9deg)";
                priceAnchorBox[i].style.transform = "perspective(1200px) rotateY(0)";
                priceAnchorHoverBox[i].removeEventListener('mouseover', overEventHandler[i]);
                priceAnchorHoverBox[i].removeEventListener('mouseout', outEventHandler[i]);
                priceAnchorHoverBox[i].style.transform = "perspective(1200px) rotateY(-179.9deg)";
                priceAnchorHoverBox[i].style.opacity = "0";
            }
            current = i;
            if (select.selectedIndex === 1) {
                premiumPlusText();
            }
            else {
                premiumText();
            }
        });

        const overEvent = () => {
            priceAnchorHoverBox[i].style.opacity = "1";
        }
        priceAnchorHoverBox[i].addEventListener('mouseover', overEvent);
        overEventHandler.push(overEvent);

        const outEvent = () => {
            priceAnchorHoverBox[i].style.opacity = "0";
        };
        priceAnchorHoverBox[i].addEventListener('mouseout', outEvent);
        outEventHandler.push(outEvent);
    }
}

