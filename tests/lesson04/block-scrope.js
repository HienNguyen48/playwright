if(true){
    var varVarriable ="Var không bị giới hạn bởi dấu ngoặc";
    let letVariable = "let có bị giới hạn bởi dấu ngoặc";
    const constVariable = "const có bị giới hạn bởi dấu ngoặc";
}
console.log(varVarriable);//OK
console.log(letVariable); //Biến chưa được định nghĩa nên log ra sẽ bị lỗi, phạm vi biến chỉ có trong dấu ngoặc
console.log(constVariable);//Biến chưa được định nghĩa nên log ra sẽ bị lỗi, phạm vi biến chỉ có trong dấu ngoặc