const fs = require('fs/promises')

function readFile() {
    let fileData;
    
    // fs.readFile('data.txt', function(error, fileData) { // values passed to callback func from readFile
    //     if (error) {};
    // console.log('file parsing done!') 
    //     console.log(fileData.toString());
    // });

    fs.readFile('data.txt')
    .then(function(fileData) { // use promises
        console.log('file parsing done! 1') 
        console.log(fileData.toString());
        // return anotherAsyncOperation;
    })
    .then(function() {}) // chain in possible
    .catch(function(error) {
        console.log(error);
    }); // promises : then(success), catch(failed in prev pormise) methods
    // try-catch will not work in asynchoronous operations
    // try only checks whether readFile succeeded. not the function inside.
    // callback func receives errors. promises does not

    console.log('hi'); 
}

readFile();

// if the sync task takes long time, the lines below have delay 
// use async functions if the task to be manages by synching takes long
// reading files/db, talking to http req -> takes long