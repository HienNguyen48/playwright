// for(let i = 0; i<10; i++){
//     if(i===5){
//         break;
//     }
//     console.log(i);
//  }

//VD2:
const numbers = [1, 3, 8, 7, 9, 11];
let firstEven = null;
console.log(numbers.length);

for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    if(num % 2 === 0){
        firstEven = num;
        break;
    }
    console.log(`Số ${num} không phải là số chẵn`)
}
console.log(`Số chẵn đầu tiên: ${firstEven}`);

