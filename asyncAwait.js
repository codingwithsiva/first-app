/**
 * Patters That are present in Asynchronous code
 * 1. callback
 * 2. promises
 * 3. async/await
 */


/** async/await  
 * What is async/await
 * Make asynchronous code into synchronous code
*/

console.log('Before');

/*
// Callback calling
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repos[0], (commits) => {
            console.log(commits);
        })
    })
});
*/

/*
// Using Promises
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log("Commits", commits))
    .catch(err => console.log("Error", err.message));
*/

// using aysnc/await

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log("commits", commits);
    }
    catch (err) {
        console.log("Error", err.message);
    }
}

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
        }, 2000);
    });
}


/*
const p = new Promise((resolve, reject) => {
    // do some async work

    setTimeout(() => {
        //resolve(1);
        reject(new Error("message"));
    }, 2000);
});

// Consume promisis
p
    .then(result => console.log("result", result))
    .catch(err => console.log("err", err.message));
*/