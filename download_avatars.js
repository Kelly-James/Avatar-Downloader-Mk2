const github_user = 'Kelly-James';
const github_token = 'a9bab058f320076c2dd8a5d7340b32d28b825985';
const fs = require('fs');
const owner = process.argv[2];
const repo = process.argv[3];

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
      console.error('Errors: ', err);
      return;
    }
    callback(null, response.body);
  })

}

// function which loops through the response body and prints the avatar urls to the console
function mapAvatarURLs(repoList) {
  const avatarMapper = repoObject => ({
    url: repoObject.url,
    name: repoObject.login
  })
  return repoList.map(avatarMapper);
}

// function which makes a request to Github API and downloads data from given url to disk
// counter variable added which counts up for each response and down for each end event. Once final end event fires, logs 'All downloads completed'
var counter = 0;

function downloadImageByURL(url, filePath) {
  counter += 1;
  request.get(url)
        .on('error', function(err) {
          return;
        })
        .on('response', function(response) {
          console.log(`Downloading image "${filePath}"`);
        })
        .pipe(fs.createWriteStream(filePath))
        .on('finish', () => {
          counter -= 1;
          if(counter === 0)
          {
            console.log('All downloads completed');
          }
        })
};

//
getRepoContributors(owner, repo, (err, result) => {
  if(err) {
    console.error('Errors: ', err);
    return;
  }
  if(!owner || !repo) {
    console.log('Please provide valid Repo Owner and/or Repo Name!');
    return;
  }
  var arrayOfAvatarUrls = mapAvatarURLs(result);
  arrayOfAvatarUrls.forEach(function(avatar, index) {
    const url = avatar.url;
    const filePath = `./avatars/${avatar.name}.jpg`;
    downloadImageByURL(avatar, filePath);
  });
});
