const gitProfile = document.querySelector('input[type="text"]');
const profileCard = document.getElementById("main");

gitProfile.addEventListener("change", (event) => doAction);
gitProfile.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        doAction(event);
    }
});

const doAction = (event) => {
    event.preventDefault();
    const apiKey = `https://api.github.com/users/${event.target.value}`;
    getUserDetails(apiKey);
};

// API call to get data
const getUserDetails = async (api) => {
    try {
        const response = await fetch(api);
        const json = await response.json();
        if (json.login) createUserCard(json);
        else {
            profileCard.textContent = "Username doesn't exist!";
            profileCard.setAttribute("style", "color:red");
        }
    } catch (error) {
        console.error(error);
    }
};

// Based on the data it will create a Profile card
const createUserCard = (data) => {

    profileCard.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4 d-flex align-items-center">
          <img
            src="${data.avatar_url}"
            class="img-fluid"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body text-light">
            <h5 class="card-title">${gitData(data.name)}</h5>
            <p class="card-text">${gitData(data.bio)}</p>
            <div class="card-text d-flex justify-content-between">
              <p>Followers: ${data.followers}</p>
              <p>Following: ${data.following}</p>
              <p>Repos: ${data.public_repos}</p>
            </div>
            <div class="card-text d-flex justify-content-between">
              <p>Twitter: ${gitData(data.twitter_username)}</p>
              <p>Location: ${gitData(data.location)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
};

const gitData = (data) => {
    if (data) return data;
    else return "Please Update!";
};
