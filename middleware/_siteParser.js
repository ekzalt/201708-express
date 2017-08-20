const fetch = require('node-fetch');
const cheerio = require('cheerio');

const urls = { habrahabr: 'https://habrahabr.ru/' };

const fetchParse = (adress) => {
  fetch(urls.habrahabr)
    .then(res => {
      return res.text();
    })
    .then(body => {
      // console.log(body);
      const $ = cheerio.load(body);
      const content = [];

      $('.post__title_link').each((i, elem) => {
        const article = {
          title: elem.children[0].data,
          href: elem.attribs.href
        };

        content.push(article);
      });

      return content;
    })
    .then(content => {
      console.log(content);
    })
    .catch(err => {
      console.error(err);
    });
};
