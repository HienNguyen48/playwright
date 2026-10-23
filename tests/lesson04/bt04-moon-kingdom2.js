function printLeaderboard() {
    let players = [
        { name: "Mario0", score: 1000 },
        { name: "Mario1", score: 2000 },
        { name: "Mario2", score: 3000 },
        { name: "Mario3", score: 4000 }
    ]

    let playersNew = players.sort((a, b) => b.score - a.score);
    console.log(playersNew);

}

printLeaderboard();