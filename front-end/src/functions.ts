import Swal from 'sweetalert2'

export function networkAlert(){
Swal.fire({
    icon: 'error',
    title: '실패',
    text: '서버 또는 네트워크 문제가 발생하였습니다.',
    footer: '<a href="../inqBoard/qAList.html">여기로 문의주시면 신속히 답변드리겠습니다.</a>'
  });
}
export function onlyUserAlert(){
    Swal.fire({
        icon: 'info',
        title: '알림',
        text: '회원전용 서비스입니다.',
        allowOutsideClick: false,
      }).then(result => {
        location.href = `../signIn/signIn.html`;
      });
}
export function infoAlert(title:string, text:string){
    return Swal.fire({
        title,
        text,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '예',
        cancelButtonText: '아니요',
    })
}
export function removeConfirm(){
    return confirm('삭제하면 복구가 불가능합니다. 괜찮겠어요?');
}

export function beforeAlert(){
    alert('네트워크 상태가 좋지 못합니다.');
}
export function afterAlert(){
    alert('네트워크 오류가 발생하였습니다. 작업이 정상적으로 완료되지 않았습니다.');
}

export function getQueryStringObject(): any {
    const urlDecoded = window.location.search.substr(1).split('&');
    if (urlDecoded.length === 0) return {};
    const result = {};
    for (let i = 0; i < urlDecoded.length; i++) {
        var p = urlDecoded[i].split('=', 2);
        if (p.length == 1)
            result[p[0]] = "";
        else
            result[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return result;
}

export enum Affix{
    "List"="List",
    "Post"="Post",
    "Read"="Read"
}
export function getCategoryHtml(category: string, affix:Affix) {
    let htmlFile:string;
    switch (category) {
        case 'free':
            htmlFile = 'freeBoard'
            break;
        case 'inex':
            htmlFile = 'incExcNum'
            break;
        case 'info':
            htmlFile = 'info'
            break;
        case 'anal':
            htmlFile = 'anal'
            break;
        case 'win':
            htmlFile = 'win'
            break;
        case 'qna':
            htmlFile = 'qA'
            break;
    }
    return htmlFile + affix + '.html';
}

export function getStaticsName(method: string) {
    let name: string;
    switch (method) {
        case 'excludedLineCount': name = '전멸구간 개수'
            break;
        case "carryCount": name = '이월 개수'
            break;
        case "lowCount": name = '저값(1~22) 개수'
            break;
        case "sum": name = '번호 합계'
            break;
        case "oddCount": name = '홀수 개수'
            break;
        case "primeCount": name = '소수 개수'
            break;
        case "$3Count": name = '3배수 개수'
            break;
        case "sum$10": name = '첫수(십의자리) 합'
            break;
        case "diffMaxMin": name = '고저차'
            break;
        case "AC": name = 'AC'
            break;
    }
    return name;
}
export function isoStringToDate(isoString: string): string {
    const date = new Date(isoString);
    date.setHours(date.getHours()+9);
    const iso = date.toISOString();
    return iso.slice(0, 10) + ' ' + iso.slice(11, 16);
}

export function rangeMake(stats:any, mul:number=1, add:number=0): string{
    let from = stats.mean - stats.stdev*mul;
    let to = stats.mean + stats.stdev*mul;

    from = from < stats.min ? stats.min : from;
    to = to > stats.max ? stats.max : to;
    return `${Math.floor(from) + add} ~ ${Math.ceil(to) + add}`
}