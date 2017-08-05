let formAdd = document.forms.add;

formAdd.addEventListener('submit', e => {
  e.preventDefault();
  // tasks.innerHTML = '';
  // loader.classList.remove('hide');
  console.log('post new task:', formAdd.task.value);

  let div = formAdd.querySelector('.form-group');
  let val = formAdd.task.value.trim();

  if (!val) {
    console.error('no value');
    div.classList.add('has-error');
    return;
  }

  div.classList.add('has-success');

  fetch('http://localhost:3000/todo', {
    method: 'post',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ task: val })
  })
    .then(() => {
      console.log('post end');
      location.pathname = '/todo';
    })
    .catch(err => {
      console.error(err);
    });
});

let tasks = document.getElementById('tasks');

tasks.addEventListener('click', e => {
  if (e.target.dataset.method === 'open') {
    console.log('click open');
    e.target.closest('form').querySelector('.form-group').classList.toggle('hide');

  } else if (e.target.dataset.method === 'delete') {
    e.preventDefault();
    // tasks.innerHTML = '';
    // loader.classList.remove('hide');
    console.log('click delete task id:', e.target.closest('li').dataset.id);

    fetch(`http://localhost:3000/todo/${e.target.closest('li').dataset.id}`, {
      method: 'delete',
      credentials: 'include',
      redirect: 'follow'
    })
      .then(() => {
        console.log('delete end');
        location.pathname = '/todo';
      })
      .catch(err => {
        console.error(err);
      });

  } else if (e.target.dataset.method === 'put') {
    e.preventDefault();
    // tasks.innerHTML = '';
    // loader.classList.remove('hide');
    console.log('click put', e.target.closest('form').taskEdit.value);

    let div = e.target.closest('form').querySelector('.form-group');
    let val = e.target.closest('form').taskEdit.value.trim();

    if (!val) {
      console.error('no value');
      div.classList.add('has-error');
      return;
    }

    div.classList.add('has-success');

    fetch(`http://localhost:3000/todo/${e.target.closest('li').dataset.id}`, {
      method: 'put',
      credentials: 'include',
      redirect: 'follow',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ task: e.target.closest('form').taskEdit.value })
    })
      .then(() => {
        console.log('put end');
        location.pathname = '/todo';
      })
      .catch(err => {
        console.error(err);
      });

  } else {
    return;
  }
});
