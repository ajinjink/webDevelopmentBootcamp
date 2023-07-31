const fs = require('fs')

function readFile() {
    let fileData;
    
    fs.readFile('data.txt', function(error, fileData) { // values passed to callback func from readFile
        console.log('file parsing done!') 
        console.log(fileData.toString());
    });

    // console.log(fileData.toString()); // error. fileData only available in the func
    console.log('hi'); 
}

readFile();

// if the sync task takes long time, the lines below have delay 
// use async functions if the task to be manages by syncing takes long
// reading files/db, talking to http req -> takes long