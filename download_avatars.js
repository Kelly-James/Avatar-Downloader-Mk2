const github_user = 'Kelly-James';
const github_token = 'a9bab058f320076c2dd8a5d7340b32d28b825985';

// '.defaults' is a convienience method of 'require' to add options to the request header
const request = require('request').defaults({
  headers: {
    'User-Agent': 'MyImageDownloader/1.0'
  },
  json: true,
  auth: {
    user: github_user,
    pass: github_token
  }
});

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var requestURL = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  console.log(requestURL);

  request.get(requestURL, (err, response, body) => {
    if(err) {
      return callback(err);
    }
    callback(null, response.body);
  })

}

// function which loops through the response body and prints the avatar urls to the console
function printAvatarURLs(repoList) {
  repoList.forEach((repoObject) => {
    console.log(repoObject.avatar_url);
  });
}

getRepoContributors('jquery', 'jquery', (err, result) => {
  if(err)
  {
    console.error('Errors: ', err);
    return;
  }
  printAvatarURLs(result);
});
