const $backBtn = document.querySelector('#back-btn');
const $username = document.querySelector('#user-name');
const $email = document.querySelector('#created-by');
const $friendsList = document.querySelector('#friends-list');
const $thoughtsection = document.querySelector('#thought-section');
const $newthoughtForm = document.querySelector('#new-thought-form');

let userId;

function getUser() {
  // get id of user
  const searchParams = new URLSearchParams(document.location.search.substring(1));
  const userId = searchParams.get('id');
  let url=`/api/users/${userId}`;
  console.log(url);
  // get userInfo
  fetch(url)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        console.log('hi');
        throw new Error({ message: 'Something went wrong!' });
      }

      return response.json();
    })
    .then(printUser)
    .catch(err => {
      console.log(err);
      alert('Cannot find a user with this id! Taking you back.');
      window.history.back();
    });
}

function printUser(userData) {
  console.log(userData);

  userId = userData._id;

  const { username, email,  friends, thoughts } = userData;

  $username.textContent = username;
  $email.textContent = email;
  $friendsList.innerHTML = friends
    .map(friend => `<span class="col-auto m-2 text-center btn">${friend}</span>`)
    .join('');

  if (thoughts && thoughts.length) {
    thoughts.forEach(printthought);
  } else {
    $thoughtsection.innerHTML = '<h4 class="bg-dark p-3 rounded">No thoughts yet!</h4>';
  }
}

function printthought(thought) {
  // make div to hold thought and subthoughts
  const thoughtDiv = document.createElement('div');
  thoughtDiv.classList.add('my-2', 'card', 'p-2', 'w-100', 'text-dark', 'rounded');

  const thoughtContent = `
      <h5 class="text-dark">${thought.username}commented on ${thought.createdAt}:</h5>
      <p>${thought.thoughtText}</p>
      <div class="bg-dark ml-3 p-2 rounded" >
        ${
          thought.reactions && thought.reactions.length
            ? `<h5>${thought.reactions.length} ${
                thought.reactions.length === 1 ? 'Reaction' : 'reactions'
              }</h5>
        ${thought.reactions.map(printReaction).join('')}`
            : '<h5 class="p-1">No reactions yet!</h5>'
        }
      </div>
      <form class="reaction-form mt-3" data-thoughtid='${thought._id}'>
        <div class="mb-3">
          <label for="reaction-name">Leave Your Name</label>
          <input class="form-input" name="reaction-name" required />
        </div>
        <div class="mb-3">
          <label for="reaction">Leave a Reaction</label>
          <textarea class="form-textarea form-input"  name="reaction" required></textarea>
        </div>

        <button class="mt-2 btn display-block w-100">Add Reaction</button>
      </form>
  `;

  thoughtDiv.innerHTML = thoughtContent;
  $thoughtsection.prepend(thoughtDiv);
}

function printReaction(reaction) {
  return `
  <div class="card p-2 rounded bg-secondary">
  <p>${reaction.username} reactiond on ${reaction.createdAt}:</p>
    <p>${reaction.reactionBody}</p>
  </div>
`;
}

function handleNewthoughtsubmit(event) {
  event.preventDefault();

  const thoughtText = $newthoughtForm.querySelector('#thought').value;
  const username = $newthoughtForm.querySelector('#written-by').value;

  if (!thoughtText || !username) {
    return false;
  }

  const formData = { thoughtText, username };

  fetch(`/api/thoughts/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      response.json();
    })
    .then(thoughtResponse => {
      console.log(thoughtResponse);
      // location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

function handleNewReactionSubmit(event) {
  event.preventDefault();

  if (!event.target.matches('.reaction-form')) {
    return false;
  }

  const thoughtId = event.target.getAttribute('data-thoughtid');

  const username = event.target.querySelector('[name=reaction-name]').value;
  const reactionBody = event.target.querySelector('[name=reaction]').value;

  if (!reactionBody || !username) {
    return false;
  }

  const formData = { username, reactionBody };

  fetch(`/api/thoughts/${userId}/${thoughtId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      response.json();
    })
    .then(thoughtResponse => {
      console.log(thoughtResponse);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

$backBtn.addEventListener('click', function() {
  window.history.back();
});

$newthoughtForm.addEventListener('submit', handleNewthoughtsubmit);
$thoughtsection.addEventListener('submit', handleNewReactionSubmit);

getUser();
