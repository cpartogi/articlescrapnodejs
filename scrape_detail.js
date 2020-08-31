const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const urlnya = 'https://www.cermati.com/artikel/7-tips-belajar-efektif-walau-hanya-di-rumah-saja/';

request(urlnya, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const articleTitle = $('.post-title').text();
        const authorName = $('.author-name').text().replace(/\s\s+/g, '');
        const postingDate = $('.post-date').text().replace(/\s\s+/g, '');
        const terkait = $('.panel-header:contains("Artikel Terkait")').next().html();
        const $2 = cheerio.load(terkait);

        var relatedArticle = [];

        $2('li').each(function(i, elm) {
            const judul =  $2(this).find('.item-title').text();
            const linknya = $2(this).find('a').attr('href');
            relatedArticle.push({'url':linknya, 'title': judul});
        });     
        
        console.log(relatedArticle);

        let article = {
            url : urlnya,
            title : articleTitle,
            author : authorName,
            date : postingDate,
            relatedArticles : relatedArticle
        }

        let data = JSON.stringify(article,null,2);
        fs.writeFileSync('article_detail.json', data);

    } else {
        console.log(error);
    }
})


