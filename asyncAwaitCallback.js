/**
 * Patters That are present in Asynchronous code
 * 1. callback
 * 2. promises
 * 3. async/await
 */


/** 1.Callback  */
console.log('Before');

// callback invoke means calling callback function
// calling nested callback methods
// calling nested methods of callback are called callback hell or christmas tree problam
// getUser(1, (user) => {
//     getRepositories(user.gitHubUsername, (repositories) => {
//         console.log("repos", repositories);
//     });
// });


// Replace callback methods to an anonymous function
getUser(1, displayUser);
console.log('After');

function displayUser(user) {
    console.log('user', user);
    getRepositories(user.gitHubUsername, displayRepos);
}

function displayRepos(repos) {
    console.log("repos", repos);
}

//callback method
function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading User From Database...');
        callback({ id: id, gitHubUsername: 'sivareddy kota' });
    }, 2000);
}

function getRepositories(userName, callback) {
    setTimeout(() => {
        console.log("calling GitHub API..");
        callback(['repo1', 'repo2', 'repo3']);
    }, 1000);
}
