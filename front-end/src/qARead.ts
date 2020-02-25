import configure from '../amplify/configure'
import { getUnAuthAPI } from '../amplify/api';
configure();

const title = document.getElementById('content-title');
const author = document.getElementById('author-name');
const created = document.getElementById('author-time');
const hits = document.getElementById('author-lookup');
const contents = document.getElementById('text-content');

const id = getQueryStringObject().id;
getUnAuthAPI('/posts/' + id)
    .then(result => {
        console.log(result);
        const post = result.data;
        title.textContent = post.title;
        author.textContent = post.writerName;
        created.textContent = post.created;
        hits.textContent = post.hits;
        contents.innerHTML = post.contents.text;
        console.log(post);
    });

function getQueryStringObject(): any {
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