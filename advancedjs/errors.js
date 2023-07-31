const fs = require('fs')

function readFile() {
    let fileData;
    try {
        fileData = fs.readFileSync('data.json'); // read unavailable file
    }
    catch {
        console.log('error occurred!')
    }
    console.log(fileData);
    console.log('hi'); // sth unrelated to reading file
}

readFile();