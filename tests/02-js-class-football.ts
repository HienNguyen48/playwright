interface players {
    id: number;
    names: string;
    age: number;
    position: string; // vị trí: thủ môn, hậu vệ, tiền vệ, tiền đạo
    number: number //số áo 
}

class team {
    name: string;
    play: players[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addPlayers(listCauThu: players) {
        this.play.push(listCauThu);
    }

    listPlayers() {
        for (let i = 0; i < this.play.length; i++) {
            console.log(this.play[i]);
        }
    }
}

const teamCauThu = new team("Cầu Thủ số 1");

teamCauThu.addPlayers({ id: 1, names: "Đặng Văn Lâm", age: 33, position: "Thủ môn", number: 23 });
teamCauThu.addPlayers({ id: 2, names: "Quế Ngọc Hải", age: 34, position: "Hậu vệ", number: 22 });
teamCauThu.addPlayers({ id: 3, names: "Đặng Văn Lâm", age: 35, position: "Tiền vệ", number: 19 });
teamCauThu.addPlayers({ id: 4, names: "Đặng Văn Lâm", age: 36, position: "Tiền đạo", number: 42 });
teamCauThu.addPlayers({ id: 5, names: "Đặng Văn Lâm", age: 37, position: "Hậu vệ", number: 55 });
teamCauThu.addPlayers({ id: 6, names: "Đặng Văn Lâm", age: 38, position: "Thủ môn", number: 63 });

console.log(teamCauThu);

teamCauThu.listPlayers();

