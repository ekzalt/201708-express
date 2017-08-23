const express = require('express');
const router = express.Router();

const url = require('url');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const log = require('../middleware/log');
const passport = require('../middleware/passport.strategy');

const resourse = {
  habrahabr: 'https://habrahabr.ru/',
  geektimes: 'https://geektimes.ru/',
  tmfeed: 'https://tmfeed.ru/popular/day/'
};

// GET news page

router.get('/', async (req, res, next) => {
  log.info({
    method: req.method,
    url: req.url,
    params: req.params,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    session: req.session,
    user: req.user,
    body: req.body
  });

  urlParsed = url.parse(req.url, true);
  // console.log('urlParsed:', urlParsed);

  if (urlParsed.search) {
    console.log('urlParsed.search:', urlParsed.search);
    console.log('urlParsed.query:', urlParsed.query);

    /*
    res.cookie('resourse', urlParsed.query.resourse, {
      maxAge: 900000,
      path: '/news',
      httpOnly: true
    });
    */
    
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
    res.render('news', {
      title: 'News',
      user: req.user // {} || undefined
    });
  }
});

module.exports = router;
