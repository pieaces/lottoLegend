import configure from "../amplify/configure";
import { getUnAuthAPI } from "../amplify/api";
import { networkAlert } from "../functions";

configure();

const lottoNums = document.querySelectorAll<HTMLElement>('#frequency .lotto-num');
const lottoNums12 = document.querySelectorAll<HTMLElement>('#frequency12 .lotto-num');
const unappearance = document.getElementById('unappearance');
const loading = document.querySelector<HTMLElement>('.loading-box');
loading.classList.remove('none');
getUnAuthAPI('/stats/piece', { method: 'frequency' }).then(({ total, frequency, frequency12 }) => {
    const max = Math.max(...frequency);
    const max12 = Math.max(...frequency12);

    unappearance.textContent = (<number[]>frequency12).reduce((acc, cur, index) => {
        if (cur === 0) return acc + ', ' + (index + 1);
        else return acc;
    }, '').slice(2);
    
    (<number[]>frequency).forEach((num, index) => {
        lottoNums[index].style.backgroundColor = `rgba(0,0,0,${Math.pow((num / max),2)}`;
    });
    (<number[]>frequency12).forEach((num, index) => {
        const opacity = num /max12;
        if(opacity === 0){
            lottoNums12[index].style.backgroundColor = 'white';
            lottoNums12[index].style.color = 'black';
        }else{
            lottoNums12[index].style.backgroundColor = `rgba(0,0,0,${num / max12}`;
        }
        
    });
    loading.classList.add('none');
}).catch(() => networkAlert());