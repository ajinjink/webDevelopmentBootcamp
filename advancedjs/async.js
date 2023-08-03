const fs = require('fs/promises')

async function readFile() {
    let fileData;
    
    // fs.readFile('data.txt', function(error, fileData) { // values passed to callback func from readFile
    //     if (error) {};
    // console.log('file parsing done!') 
    //     console.log(fileData.toString());
    // });

//    fs.readFile('data.txt')
    // .then(function(fileData) { // use promises
    //     console.log('file parsing done! 1') 
    //     console.log(fileData.toString());
    //     // return anotherAsyncOperation;
    // })
    // .then(function() {}) // chain in possible
    // .catch(function(error) {
    //     console.log(error);
    // }); // promises : then(success), catch(failed in prev pormise) methods
    // try-catch will not work in asynchoronous operations
    // try only checks whether readFile succeeded. not the function inside.
    // callback func receives errors. promises does not

    // try-catch is available (unlike callback/promises)
    try {
        fileData = await fs.readFile('data.txt'); // await can be added to any method that returns promise
        // the data to be passed to the functions of then method is stored in the var fileData
        // code executuion will stop until line 26 is done before advancing to the next line
    } catch (error) {
        console.log(error);
    }
    console.log('file parsing done!'); // same as lines below put into then block
    console.log(fileData.toString());
    console.log('hi'); 
}

readFile();

// if the sync task takes long time, the lines below have delay 
// use async functions if the task to be managed by synching takes long
// reading files/db, talking to http req -> takes long