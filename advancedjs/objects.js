class Job {
    constructor(jobTitle, place, salary) {
        this.title = jobTitle;
        this.location = place;
        this.salary = salary;
    }

    describe() {
        console.log(`I'm a ${this.title}, I work in ${this.location}, and I earn ${this.salary}.`)
    }
}

const developer = new Job('Developer', 'New York', 50000);
const cook = new Job('Cook', 'Munich', 35000);
console.log(developer);
cook.describe();





// arr destructuring
// const input = ['Jina', 'Kim'];
// const FN = input[0];
// const LN = input[1];
// const [first, last] = input;
// console.log(first, last);

// object destructuring
// const job = {title: 'developer', location:'new york'};
// // const {title, location} = job; // extract all
// const {title} = job; // extract some (has to have the same name as the property)
// const {title: jTitle} = job; // extract title as name jTitle
