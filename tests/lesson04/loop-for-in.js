const person = {
    nam: "Hien",
    age: 32,
    city: "HN",
    oldAddress: {
        city: "HCM",
        age: 29
    }
};

for (let key in person.oldAddress) {
    console.log(key);
}