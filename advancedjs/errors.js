const fs = require('fs')

function readFile() {
    try {
        const fileData = fs.readFileSync('data.json'); // read unavailable file
    }
    catch {
        console.log('error occurred!')
    }
    console.log('hi'); // sth unrelated to reading file
}

readFile();