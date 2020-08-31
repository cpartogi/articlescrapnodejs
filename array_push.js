var itemList = [];

for (i=0; i < 2; i++) {

    var relatedArticle = [];
    for (y=0; y<2; y++) {
        relatedArticle.push({'url': 'url'+y , 'title' : 'title'+y});
    }

    let article = {
        url : 'url_'+i,
        title : 'title_'+i,
        author : 'author_'+i,
        date : 'date_'+i,
        relatedArticles : relatedArticle
    }
   // console.log(article);
    itemList.push(article);
}

let listarticle = {
    articles : itemList
}

let data = JSON.stringify(listarticle,null,2);

console.log(data);

