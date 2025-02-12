document.getElementById('searchButton').addEventListener('click', () => {
    const username = document.getElementById('usernameInput').value.trim();

    if (!username) {
        alert('Please enter a GitHub username.');
        return;
    }

    fetchGitHubUser(username);
});

function fetchGitHubUser(username) {
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            displayUserData(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayUserData(data) {
    const userCard = document.getElementById('userCard');

    userCard.innerHTML = `
      <div class="user-info">
        <img src="${data.avatar_url}" alt="${data.login}'s avatar" />
        <h2>${data.name ? data.name : data.login}</h2>
        <p>${data.bio ? data.bio : 'No bio available.'}</p>
      </div>
      <div class="stats">
        <div>
          <span>Repos</span>
          <p>${data.public_repos}</p>
        </div>
        <div>
          <span>Followers</span>
          <p>${data.followers}</p>
        </div>
        <div>
          <span>Following</span>
          <p>${data.following}</p>
        </div>
      </div>
    `;
}

function displayError(message) {
    const userCard = document.getElementById('userCard');
    userCard.innerHTML = `<p class="error">${message}</p>`;
}
