const academy: string = "Better byte";

//C1: Dùng type
type K17User = {
    name: string;
    age: number;
    yearOfExprience: number;
}

//C2: Dùng interface
interface K17User1 {
    name: string;
    age: number;
    yearOfExprience: number;
}

const student1: K17User = {
    name: "Phong",
    age: 18,
    yearOfExprience: 1
}

//Định nghĩa kiểu custom
interface Gold {
    loaiVang: string;
    giaMua: number;
    giaBan: number;
    soLuong: number;
}

const gold1: Gold = {
    loaiVang: "mieng",
    giaMua: 1000,
    giaBan: 2000,
    soLuong: 2
}

const gold2: Gold = {
    loaiVang: "nhan",
    giaMua: 4000,
    giaBan: 6000,
    soLuong: 3
}