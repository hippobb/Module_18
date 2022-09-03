const $addfriendBtn = document.querySelector('#add-friend');
const $userForm = document.querySelector('#user-form');
const $customfriendsList = document.querySelector('#custom-friends-list');

const getUserList = () => {
  console.log('start');
  fetch('/api/users')
    .then(response => response.json())
    .then(userListArr => {
      userListArr.forEach(printUser);
    })
    .catch(err => {
      console.log(err);
    });
};

const printUser = ({ _id, username, friends, thoughtCount, email }) => {
  const friendValue = username;

  if (!friendValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'friend';
  checkbox.value = friendValue;
  checkbox.id = _id;
  const label = document.createElement('label');
  label.textContent = friendValue;
  label.htmlFor = friendValue
  const divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customfriendsList.appendChild(divWrapper);
};


const handleUserSubmit = event => {
  event.preventDefault();

  const username = $userForm.querySelector('#user-name').value;
  const email = $userForm.querySelector('#created-by').value;
  const friends = [...$userForm.querySelectorAll('[name=friend]:checked')].map(friend => {
    return friend.id;
  });

  if (!username || !email ) {
    return;
  }

  const formData = { username, email,  friends };

  console.log(JSON.stringify(formData));

  fetch('/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(postResponse => {
      console.log(postResponse);
    })
    .catch(err => {
      console.log(err);
      saveRecord(formData);
      // DO INDEXED DB STUFF HERE
    });
};
getUserList();
$userForm.addEventListener('submit', handleUserSubmit);
$addfriendBtn.addEventListener('click', handleAddfriend);
