const github_user = 'Kelly-James';
const github_token = 'a9bab058f320076c2dd8a5d7340b32d28b825985';
const fs = require('fs');
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

function downloadImageByURL(url, filePath) {
  request.get(url)
        .on('error', function(err) {
          throw err;
        })
        .on('response', function(response) {
          console.log('Response Status Message: ', response.statusMessage);
          console.log('Response Content-Type: ', response.headers['content-type']);
          console.log('Downloading image ... ');
        })
        .pipe(fs.createWriteStream(filePath))
        .on('finish', () => {
          console.log('Download Complete.');
        })
};

getRepoContributors('jquery', 'jquery', (err, result) => {
  if(err)
  {
    console.error('Errors: ', err);
    return;
  }
  printAvatarURLs(result);
});

downloadImageByURL('https://avatars.githubusercontent.com/u/1615?v=3', 'avatars/avatar.jpg');
