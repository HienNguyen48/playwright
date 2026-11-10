interface Items {
    name: string;
    price: number;
    quantity: number;
}


class Cart {
    item: Items[] = [];

    constructor() {
    }

    addItem(items: Items) {
        this.item.push(items);
    }

    getTotal(): number {
        let total = 0;
        for (let i = 0; i < this.item.length; i++) {
            total += this.item[i].price * this.item[i].quantity;
        }
        return total;
    }

    showCart(): void {
        for (let i = 0; i < this.item.length; i++) {
            console.log(`In ra sản phẩm: ${this.item[i].name}, ${this.item[i].price}, quantity: ${this.item[i].quantity}`);
        }
        console.log(`In ra tổng tiền ${cart.getTotal()}`)
    }
}

const cart = new Cart();

cart.addItem({ name: "Áo", price: 30000, quantity: 2 });
cart.addItem({ name: "Quần", price: 50000, quantity: 7 });
cart.addItem({ name: "Mũ", price: 70000, quantity: 5 });

console.log(cart.item);

console.log(cart.getTotal());

cart.showCart();
