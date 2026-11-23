// const ngocAnh = {
//     name: "Ngoc Anh",
//     role: "student"
// };

// const nameAnh = {
//     name: "Nam Anh",
//     role: "student2"
// };

class Student {
    //thuộc tính / property
    name;
    role;

    //constructor / ham khởi tạo 
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }

    //phuong thuc / method
    sayMyName(){
        console.log(`My name is ${this.name}`);
    }

    saySomeThing(message){
        //message: tham số 
        console.log(`Say something: ${message}`)
        return `Say something: ${message}`
    }
};

const ngocAnh = new Student("Ngoc Anh", "Student");
console.log(ngocAnh);
console.log(ngocAnh.name, ngocAnh.role);
ngocAnh.sayMyName();
 ngocAnh.saySomeThing("Hien K17");