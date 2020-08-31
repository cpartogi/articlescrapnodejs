const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

var domain = "https://www.cermati.com";

request(domain + '/artikel', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        var itemList = [];
        const articleList = $('.list-of-articles'); 
        $('.article-list-item a').each(function(i, elm) {
            const link = $(this).attr('href');
            request(domain + link, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    const articleTitle = $('.post-title').text();
                    const authorName = $('.author-name').text().replace(/\s\s+/g, '');
                    const postingDate = $('.post-date').text().replace(/\s\s+/g, '');

                    const terkait = $('.panel-header:contains("Artikel Terkait")').next().html();
                    const $2 = cheerio.load(terkait);

                    var relatedArticle = [];
                    $2('li').each(function(i, elm) {
                        const relatedTitle =  $2(this).find('.item-title').text();
                        const relatedUrl = $2(this).find('a').attr('href');
                        relatedArticle.push({'url':domain + relatedUrl, 'title': relatedTitle});
                    });       
                    
                    let article = {
                        url : domain + link,
                        title : articleTitle,
                        author : authorName,
                        date : postingDate,
                        relatedArticles : relatedArticle
                    }
                   itemList.push(article);
                }
                console.log(itemList);
                let listarticle = {
                    articles : itemList,
                }
        
                let datalist = JSON.stringify(listarticle,null,2);
                fs.writeFileSync('article_list.json', datalist);
            })
        })  
    }
});