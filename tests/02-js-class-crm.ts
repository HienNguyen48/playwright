class Customer {
    id: number;
    name: string;
    email: string;
    phone: string;

    constructor(id: number, name: string, email: string, phone: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    displayInfo() {
        console.log(` Hiển thi thông tin ${this.id}`);
        console.log(` Hiển thi thông tin ${this.name}`);
        console.log(` Hiển thi thông tin ${this.email}`);
        console.log(` Hiển thi thông tin ${this.phone}`);
    }

    updatedEmail(newEmail: string) {
        this.email = newEmail;
    }
}

let hienBeu = new Customer(1, "ngocAnh", "nguyenhienit94@gmail.com", "0374619213");
console.log(hienBeu);
console.log(hienBeu.id, hienBeu.name, hienBeu.email, hienBeu.phone);
hienBeu.displayInfo();

hienBeu.updatedEmail("maingoc999@gmail.com");
hienBeu.displayInfo();
