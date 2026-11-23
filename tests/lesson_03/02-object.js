const myInfo = {
    hoTen: "Nguyễn Thị Hiền",
    diaChi: "Bình đà",
    soDienThoai: "0374619213",
    tuoi: 32,
    hocVan:{
        khoa: "cntt",
        lop: "K12"
    }
};

console.log(myInfo.hocVan);
console.log(myInfo.hocVan.lop);
console.log(myInfo["hocVan"]["lop"]);