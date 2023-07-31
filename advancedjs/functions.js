function greetUser(greetingPrefix, userName = 'user') {
    // console.log(greetingPrefix + ' ' + userName + '!');
    console.log(`${greetingPrefix} ${userName}!`);
}

greetUser('hi', 'jinjin');
greetUser('hello');



function sumUp(...numbers) { // merge param into array
    let res = 0;
    for (const num of numbers) {
        res += num;
    }
    return res;
}

const arr = [1, 5, 10, 11, 20, 31];
console.log(sumUp(...arr)); // spread. divide into separate values

console.log(sumUp);