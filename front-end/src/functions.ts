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

export function getCategoryHtml(category: string, affix:string) {
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