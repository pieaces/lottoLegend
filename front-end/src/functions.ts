export function removeConfirm(){
    return confirm('삭제하면 복구가 불가능합니다. 괜찮겠어요?');
}
export function alertMessage(){
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
    "List"="Read",
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
            htmlFile = 'includeNum'
            break;
        case 'excl':
            htmlFile = 'excludeNum'
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

export function rangeMake(stats:any, mul:number=1, add:number=0): string{
    let from = stats.mean - stats.stdev*mul;
    let to = stats.mean + stats.stdev*mul;

    from = from < stats.min ? stats.min : from;
    to = to > stats.max ? stats.max : to;
    return `${Math.floor(from) + add} ~ ${Math.ceil(to) + add}`
}