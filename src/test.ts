import LottoStat from './class/LottoStat'
import fetchLotto from './fetchLotto'

function cout(obj: any, str=''): void {
    console.log(str + ":", obj);
}
enum Mode { $1 = 1, $2 = 2, $4 = 4, $12 = 12, $24 = 24, $48 = 48, $96 = 96, $384 = 384 };

let lottoStat:LottoStat// = new LottoStat(require('./lotto.json'));

fetchLotto()
.then(data =>{
    lottoStat = new LottoStat(data);
});

const button = document.getElementById('button');
button.onclick = function(){
    
    cout(lottoStat.harmony());
    cout(lottoStat.mode);
}