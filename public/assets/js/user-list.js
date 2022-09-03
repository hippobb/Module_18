const $userList = document.querySelector('#user-list');

const getUserList = () => {
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
  const userCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${username}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">By ${email}</h4>
          <p>${thoughtCount} thoughts</p>
          <h5 class="text-dark">friends</h5>
          <ul>
            ${friends
              .map(friend => {
                return `<li>${friend}</li>`;
              })
              .join('')}
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/user?id=${_id}">See the discussion.</a>
        </div>
      </div>
    </div>
  `;

  $userList.innerHTML += userCard;
};

getUserList();
