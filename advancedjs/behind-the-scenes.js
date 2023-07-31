// primitive values : numbers, strings, booleans, etc.
// reference values : objects



const hobbies = ['Sports', 'Cooking']; // pointer to the arr is stored
const age = 32; // value is stored
hobbies.push('Reading'); // value is added, address doesn't change
// push to const is possible
// changing the pointer is not possible
// hobbies = ['Coding', 'Sleeping']; -> allocating new array -> error
console.log(hobbies);



const person = {age: 32};
function getAdultYears(p) {
//     p.age -= 18; // change p object == change person object
//     return p.age;
    return p.age - 18;
}

console.log(getAdultYears(person));
console.log(person); // person object is affected
// objects are reference values

console.log({age : person.age}); // create a new object

console.log(getAdultYears({...person})); // pulls out list of all the (key:value) pairs 
// create new object with the same values of person
console.log(person);