//đếm cặp từ 1=> 100 có bao nhiêu cặp chia hết cho 100

// function demCap(min, max) {
//     let count = 0;

//     for (let a = min; a <= max; a++) {
//         for (let b = a + 1; b <= max; b++) {
//             if ((a + b) % 17 === 0) {
//                 count++;
//             }
//         }
//     }
//     return count;
// }

console.log(demCap(1, 100));


function demCap(min, max) {
    let count = [];

    for (let a = min; a <= max; a++) {
        for (let b = a + 1; b <= max; b++) {
            if ((a + b) % 17 === 0) {
                count.push[a, b];;
                console.log(a, b);
            }
        }
    }
    return count;
}

demCap(1, 100);