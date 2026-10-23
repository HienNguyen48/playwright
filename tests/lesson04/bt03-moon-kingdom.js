function createCharacters() {
    let arr1 = [
        { name: "Học sinh 1", level: 2, healthe: 1000 },
        { name: "Học sinh 2", level: 3, healthe: 500 },
        { name: "Học sinh 3", level: 4, healthe: 20 }
    ]

    let charactersPowerUp = arr1.map((num) => {
        return {
            name: num.name.toLocaleUpperCase(),
            level: num.level * 2,
            healthe: num.healthe * 3
        }
    }
    )

    let possibleWinners = charactersPowerUp.filter((value) => value.healthe > 1000);

    console.log(arr1);
    console.log(charactersPowerUp);
    console.log(possibleWinners);
};

createCharacters();
