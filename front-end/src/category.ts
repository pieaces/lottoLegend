export default function getCategoryHtml(category: string, affix:string) {
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