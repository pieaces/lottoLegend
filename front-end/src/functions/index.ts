import Swal from 'sweetalert2'
import makeDraggable from '../system/premium/Layout/makeDraggable';

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
        case 'incl':
            htmlFile = 'incNum'
            break;
        case 'excl':
            htmlFile = 'excNum'
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

export function isoStringToDate(isoString: string): string {
    const date = new Date(isoString);
    date.setHours(date.getHours()+9);
    const iso = date.toISOString();
    return iso.slice(0, 10) + ' ' + iso.slice(11, 16);
}

export function makeModal(title: string, width: number) {
    Swal.fire(title);
    const modalBox = document.querySelector<HTMLElement>('.swal2-modal');
    modalBox.style.width = width + 'rem';
    const text = document.querySelector<HTMLElement>('.swal2-title');
    text.style.display = 'block';
    text.style.fontSize = '1.5rem';
    text.style.fontWeight = '500';
    modalBox.style.boxShadow = '0 1px 1px rgba(0,0,0,0.12),0 2px 2px rgba(0,0,0,0.12),0 4px 4px rgba(0,0,0,0.12),0 8px 8px rgba(0,0,0,0.12),0 16px 16px rgba(0,0,0,0.12)';
    document.querySelector<HTMLElement>('.swal2-container').style.background = '#ffffff00';
    makeDraggable(document.querySelector<HTMLElement>('.swal2-container'));
}

export function rangeMake(stats:any, mul:number=1, add:number=0): string{
    let from = stats.mean - stats.stdev*mul;
    let to = stats.mean + stats.stdev*mul;

    from = from < stats.min ? stats.min : from;
    to = to > stats.max ? stats.max : to;
    return `${Math.floor(from) + add} ~ ${Math.ceil(to) + add}`
}
export function setColorLotto(num: number, Box: HTMLElement) {
    if (1 <= num && num <= 10) {
        Box.style.backgroundColor = '#FBC400';
    } else if (num <= 20) {
        Box.style.backgroundColor = '#69C8F2';
    } else if (num <= 30) {
        Box.style.backgroundColor = '#FF7272';
    } else if (num <= 40) {
        Box.style.backgroundColor = '#AAAAAA';
    } else if (num <= 45) {
        Box.style.backgroundColor = '#B0D840';
    }
}
export function setDefaultColor(node: HTMLElement) {
    node.style.background = "";
    node.textContent = "";
}