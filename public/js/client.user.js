// user actions javascript here
let message = document.getElementById('message');
let editForm = document.forms.editForm;
let userPath = editForm.getAttribute('action');

editForm.addEventListener('click', e => {
  switch (e.target.dataset.method) {
    case 'open':
      console.log('click edit - toggle open');
      e.target.closest('form').querySelector('#editSectionForm').classList.toggle('hide');
      break;

    case 'delete':
      e.preventDefault();
      message.innerHTML = '';
      console.log('click delete user:', userPath);

      fetch(`http://localhost:3000${userPath}`, {
        method: 'delete',
        credentials: 'include',
        redirect: 'follow'
      })
        .then(() => {
          console.log('delete ok');
          location.pathname = '/logout';
        })
        .catch(err => {
          console.error(err);
        });
      break;

    case 'put':
      e.preventDefault();
      message.innerHTML = '';
      console.log('click update user:', userPath);

      let password = editForm.password.value.trim();
      let name = editForm.name.value.trim();
      let email = editForm.email.value.trim();
          
      if (!password && !name && !email) {
        console.error('no values in inputs');
        message.innerHTML = `
          <div class="alert alert-warning" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <p>Warning! Please fill in at least one field.</p>
          </div>`;
        return;
      }

      let updates = {};
      if (password) updates.password = password;
      if (name) updates.name = name;
      if (email) updates.email = email;
      console.log('updates:', updates);

      fetch(`http://localhost:3000${userPath}`, {
        method: 'put',
        credentials: 'include',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(updates)
      })
        .then(() => {
          console.log('user have updated successfull :)');
          location.reload();
        })
        .catch(err => {
          console.error(err);
          location.reload();
        });
  }
});
