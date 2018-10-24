var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    })
};

asyncAdd(5, 7).then((res) => {
    console.log('result: ', res);
    return asyncAdd(res, 33);
}).then((res) => {
    console.log('result should be 45: ', res);
}).catch((errorMessage) => {
    console.log(errorMessage);
})

/*var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('iei, it worked');
        //reject('unable to fullfill promise');
    }, 2500);
});

//get only calles, when promise fullfilled, dh resolved
somePromise.then((message) => {
    console.log('Success', message);
}, (errorMessage) => {
    console.log('Error: ', errorMessage);
});*/
