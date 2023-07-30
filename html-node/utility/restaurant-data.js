const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..','data', 'restaurants.json'); // go to higher directory

function getStoredRestaurants() {
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants;
}

function storeRestaurants(stoarbleRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(stoarbleRestaurants));
}

module.exports = { // expose(export) func/var
    getStoredRestaurants: getStoredRestaurants, 
    storeRestaurants: storeRestaurants
};
// (name of func that will be used in other files):(name of func to expose)