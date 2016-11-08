const request = require('request');

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {

  request('https://api.github.com/repos/', (err, response, body) => {
    if(err) throw err;
    console.log('Response Status Code: ', response.statusCode);
  })

}

// function printAvatarURLs(repoList) {
//   repoList.forEach((repoObject) => {
//     console.log(repoObject[avatar_url]);
//   });
// }

getRepoContributors('jquery', 'jquery', (err, result) => {
  console.log('Errors: ', err);
  console.log('Result: ', result);
});
