const express = require('express');
const router = express.Router();

const url = require('url');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const resourse = {
  habrahabr: 'https://habrahabr.ru/',
  geektimes: 'https://geektimes.ru/',
  tmfeed: 'https://tmfeed.ru/popular/day/'
};

/* GET news listing. */

router.get('/', (req, res, next) => {
  console.log('\n --- GET /news ---');
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);

  urlParsed = url.parse(req.url, true);
  // console.log('urlParsed:', urlParsed);

  if (urlParsed.search) {
    console.log('urlParsed.search:', urlParsed.search);
    console.log('urlParsed.query:', urlParsed.query);

    res.cookie('resourse', urlParsed.query.resourse, {
      maxAge: 900000,
      path: '/news',
      httpOnly: true
    });

    fetch(resourse[urlParsed.query.resourse])
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
        // console.log(content);
        res.json({
          statusCode: 200,
          statusText: 'OK',
          content: content
        });
      })
      .catch(err => {
        console.error(err);
        res.json({
          statusCode: 400,
          statusText: 'An error occurred while working with remote resource',
          content: []
        });
      });

  } else {
    res.render('news', { title: 'News' });
  }
});

/* POST news listing. */

/*
router.post('/', (req, res, next) => {
  console.log('\n --- POST /news ---');
  console.log('req.cookies:', req.cookies);
  console.log('req.signedCookies:', req.signedCookies);
  console.log('req.body:', req.body);

  res.cookie('resourse', req.body.resourse, {
    maxAge: 900000,
    path: '/news',
    httpOnly: true
  });

  fetch(resourse[req.body.resourse])
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
      // console.log(content);
      res.json({
        statusCode: 200,
        statusText: 'OK',
        content: content
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        statusCode: 400,
        statusText: 'An error occurred while working with remote resource',
        content: []
      });
    });
});
*/

module.exports = router;
