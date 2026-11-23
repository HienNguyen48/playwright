interface Books {
    name: string;
    soLuong: number;
    phanLoai: string;
}

class Library {
    name: string;
    location: string;
    books: Books[] = [];

    constructor(name: string, location: string) {
        this.name = name;
        this.location = location;
    }

    addBook(listbook: Books) {
        this.books.push(listbook);
    }

    // findBook(name: string): Books | undefined {
    //     return this.books.find((book) => book.name === name);
    // }

    //Tìm kiếm k phân biệt hoa/ thường
    findBook(name: string): Books[]{
        const keyword =  name.trim().toLocaleLowerCase();
        return this.books.filter((book) => book.name.toLocaleLowerCase().includes(keyword));
    }

}

const thuVien = new Library("Thư viện Quốc gia Việt Nam", "31 Tràng Thi, Hoàn Kiếm, Hà Nội")
console.log(thuVien);
console.log(thuVien.name, thuVien.location);

thuVien.addBook({ name: "Dế Mèn phiêu lưu ký", soLuong: 10, phanLoai: "Thiếu nhi" });
thuVien.addBook({ name: "Tắt đèn", soLuong: 5, phanLoai: "Văn học" });
thuVien.addBook({ name: "Nhà giả kim", soLuong: 12, phanLoai: "Tiểu thuyết" });
console.log(thuVien.books);

console.log(thuVien.findBook("giả"));


