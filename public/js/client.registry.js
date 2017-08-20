// registry actions javascript here
const message = document.getElementById('message');
const regForm = document.forms.regForm;

regForm.addEventListener('submit', e => {
  e.preventDefault();
  message.innerHTML = '';
  
  let login = regForm.login.value.trim();
  let password = regForm.password.value.trim();
  let name = regForm.name.value.trim();
  let email = regForm.email.value.trim();

  if (!login || !password || !name || !email) {
    console.error('no value in input');
    message.innerHTML = `
      <div class="alert alert-warning" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <p>Warning! Please fill in the form correctly.</p>
      </div>`;
    return;
  }

  let user = { login, password, name, email };
  console.log('post request to create new user:\n', user);

  fetch('http://localhost:3000/registry', {
    method: 'post',
    credentials: 'include',
    redirect: 'follow',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(user)
  })
    .then(() => {
      console.log('post have send successfull :)');
      message.innerHTML = `
        <div class="alert alert-success" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <p>Your data has been successfully added.</p>
        </div>`;
      location.pathname = '/login';
    })
    .catch(err => {
      console.error('some error :( \n', err);
      message.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <p>An error occurred while adding your data. Please repeat the registration procedure.</p>
        </div>`;
    });
});
