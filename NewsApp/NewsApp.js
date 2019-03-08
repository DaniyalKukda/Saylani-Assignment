var key = `d08ae551d2b24f9ebf0ebb648555c7c3`
var tagselect = document.querySelector('#select1')
var main = document.querySelector('#div')
var Selectdefault = "bbc-news";

window.addEventListener('load', async e =>{
    getNews();
    await updateSelect();
    tagselect.value = Selectdefault;

    tagselect.addEventListener('change',e => {
        getNews(e.target.value);
    })
})

async function updateSelect() {
    const src = await fetch(`https://newsapi.org/v1/sources`);
    const convert = await src.json();
    tagselect.innerHTML = convert.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n')
}

async function getNews(source = Selectdefault){
    const src = await fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=${key}`);
    console.log(src);
    const convertData = await src.json();
    console.log(convertData);
    main.innerHTML = convertData.articles.map(showArticle).join('\n')
}
function showArticle(article){
    return `
    <div class="col-md-8 col-md-offset-2 card">
    
        <h2 class='h2'>${article.title}</h2>
        <img class="img-rounded" width='100%' src="${article.urlToImage}"/>
        <p class='h4'>${article.description}</p>
        <button class="btn btn-info"><a href = "${article.url}">More>></a></button>
        <h3 class="h3">Author : <em>${article.author}</em></h3>
        <h3 class="h3">Published At : <b>${article.publishedAt}</b></h3>
    </div>`
}