let hour = 6;

if (hour <= 11 && hour >= 6) {
    console.log("true");
}

if (hour <= 11) {//nested: đưa vào trong 1 điều kiện 
    if (hour >= 6) {
        console.log("true");
    }
}


if (hour > 8) {
    console.log("false");
}