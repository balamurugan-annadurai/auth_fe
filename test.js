const user = {
    name: "Ravi",
    age: 25,
    mentors: [
        1,
        2,
        3
    ]
};

console.log(user?.name); 
console.log(user?.mentors);
console.log(user?.mentors?.[0]);
console.log(user?.mentors?.[2]);
console.log(user?.address?.city); 