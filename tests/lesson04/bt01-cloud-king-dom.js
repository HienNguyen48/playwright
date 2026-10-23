let playerName = "Mario";
let currentLives = 3;
const coins = [25,30,45];

//Tính tổng
let total = coins.reduce((num,x) => num + x,0 );
console.log(total);

//Tính trung bình
let tb = coins.reduce((num,x) => num + x,0 )/coins.length;
console.log(tb);