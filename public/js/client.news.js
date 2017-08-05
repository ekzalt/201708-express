// format json-data POST request

/*
const showNews = (parent, arr, max) => {
  max = Math.min(arr.length, max);
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < max; i++) {
    let a = document.createElement('a');

    a.classList.add('list-group-item');
    a.target = '_blank';
    a.href = arr[i].href;
    a.textContent = arr[i].title;

    fragment.append(a);
  }

  // parent.innerHTML = '';
  parent.append(fragment);
};

let loader = document.getElementById('loader');
let news = document.getElementById('news');
let form = document.forms.newsLoad;

let range = form.range;
let rangeValue = document.getElementById('rangeValue');

form.addEventListener('input', e => {
  if (e.target !== range) return;

  rangeValue.textContent = range.value;
});

form.addEventListener('submit', e => {
  e.preventDefault();
  news.innerHTML = '';
  loader.classList.remove('hide');
  console.log(form.resourse.value);

  //form.submit(JSON.stringify(form.resourse.value));
  fetch('http://localhost:3000/news', {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ resourse: form.resourse.value })
  })
    .then(data => data.json())
    .then(data => {
      console.log(data);
      loader.classList.add('hide');

      if (!data.content.length) {
        news.textContent = 'Простите, при обработке вашего запроса произошла ошибка :(';
      } else {
        showNews(news, data.content, range.value);
      }
    })
    .catch(err => {
      console.error(err);
      loader.classList.add('hide');
      news.textContent = 'Простите, при обработке вашего запроса произошла ошибка :(';
    });
});
*/

///////////////////////////////////////////////

// format json-data GET request

const showNews = (parent, arr, max) => {
  max = Math.min(arr.length, max);
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < max; i++) {
    let a = document.createElement('a');

    a.classList.add('list-group-item');
    a.target = '_blank';
    a.href = arr[i].href;
    a.textContent = arr[i].title;

    fragment.append(a);
  }

  // parent.innerHTML = '';
  parent.append(fragment);
};

let loader = document.getElementById('loader');
let news = document.getElementById('news');
let form = document.forms.newsLoad;

let range = form.range;
let rangeValue = document.getElementById('rangeValue');

form.addEventListener('input', e => {
  if (e.target !== range) return;

  rangeValue.textContent = range.value;
});

form.addEventListener('submit', e => {
  e.preventDefault();
  news.innerHTML = '';
  loader.classList.remove('hide');
  console.log(form.resourse.value);

  //form.submit(JSON.stringify(form.resourse.value));
  fetch(`http://localhost:3000/news/?resourse=${form.resourse.value}`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      loader.classList.add('hide');

      if (!data.content.length) {
        news.textContent = 'Простите, данные с запрашиваемого вами ресурса не получены :(';
      } else {
        showNews(news, data.content, range.value);
      }
    })
    .catch(err => {
      console.error(err);
      loader.classList.add('hide');
      news.textContent = 'Простите, при обработке вашего запроса произошла ошибка :(';
    });
});
