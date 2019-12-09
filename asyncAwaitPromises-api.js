/**
 * Patters That are present in Asynchronous code
 * 1. callback
 * 2. promises
 * 3. async/await
 */


/** calling parallel Promises
*/

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async operation 1...");
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async operation 2...");
        resolve(2);
    }, 2000);
});

//if you want to call two promises same time use Promises.all method
// if both success then result goes to then bolck as array
// if any one of error then goes to catch block
Promise.all([p1, p2])
    .then(result => console.log("result", result))
    .catch(err => console.log("Error", err.message));

// we can use Promises.race insted of Promises.all
// but it return result only one object of array i.e. also first executed result
Promise.race([p1, p2])
    .then(result => console.log("result", result))
    .catch(err => console.log("Error", err.message));
