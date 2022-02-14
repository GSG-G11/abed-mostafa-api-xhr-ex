/* let's go! */

const username = document.querySelector('#github-user-handle');

const userImg = document.querySelector('#github-user-avatar');
const repoNum = document.querySelector('#github-user-repos');

const repoLangs = document.querySelector('#github-repos-languages');

const totalStars = document.querySelector('#github-repos-stars');

const topRepoName = document.querySelector('#github-repo-name');

const repoCreated = document.querySelector('#github-repo-created');

const openIssuesNum = document.querySelector('#github-repo-open-issues');

const peopleWatching = document.querySelector('#github-repo-watchers');

const contributors = document.querySelector('#github-repo-contributors');

const user = 'abedshamia';
function getUserData() {
  const xhrRequest = new XMLHttpRequest();
  const userUrl = `https://api.github.com/users/${user}`;
  xhrRequest.onreadystatechange = function () {
    if (xhrRequest.readyState === 4 && xhrRequest.status === 200) {
      const result = JSON.parse(xhrRequest.responseText);
      console.log(result);
      username.textContent = result.name;
      userImg.src = result.avatar_url;
      repoNum.textContent = result.public_repos;
      totalStars.textContent = result.public_gists;
      // openIssuesNum
    }
  };

  xhrRequest.open('GET', userUrl);
  xhrRequest.send();
}

function getLanguages() {
  const xhrRequest = new XMLHttpRequest();
  const langUrl = `https://api.github.com/users/${user}/repos`;
  xhrRequest.onreadystatechange = function () {
    if (xhrRequest.readyState === 4 && xhrRequest.status === 200) {
      const result = JSON.parse(xhrRequest.responseText);
      console.log(result);
      const langArr = result.map(repo => repo.language);
      const uniqueLangs = [...new Set(langArr)];
      const uniqueLangsArr = uniqueLangs.filter(lang => lang !== null);
      repoLangs.innerHTML = `<ul>
      ${uniqueLangsArr.map(e => `<li>${e}</li>`)}
      </ul>`;
    }
  };

  xhrRequest.open('GET', langUrl);
  xhrRequest.send();
}

const repoName = 'Climostate';

function getTopRepoData() {
  const xhrRequest = new XMLHttpRequest();
  const repoUrl = `https://api.github.com/repos/${user}/${repoName}`;
  xhrRequest.onreadystatechange = function () {
    if (xhrRequest.readyState === 4 && xhrRequest.status === 200) {
      const result = JSON.parse(xhrRequest.responseText);
      console.log(result);
      topRepoName.textContent = result.name;
      repoCreated.textContent = result.created_at;
      openIssuesNum.textContent = result.open_issues_count;
      peopleWatching.textContent = result.watchers_count;

      // openIssuesNum
    }
  };
  xhrRequest.open('GET', repoUrl);
  xhrRequest.send();
}

function getContributors() {
  const xhrRequest = new XMLHttpRequest();
  const contributorsUrl = `https://api.github.com/repos/${user}/${repoName}/contributors`;

  xhrRequest.onreadystatechange = function () {
    if (xhrRequest.readyState === 4 && xhrRequest.status === 200) {
      const result = JSON.parse(xhrRequest.responseText);
      console.log(result);
      contributors.innerHTML = `<ul>
        ${result.map(e => `<li>${e.login}</li>`)}
        </ul>`;
    }
  };

  xhrRequest.open('GET', contributorsUrl);
  xhrRequest.send();
}

getLanguages();

getUserData();
getTopRepoData();
getContributors();
