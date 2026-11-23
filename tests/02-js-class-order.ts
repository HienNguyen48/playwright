interface Product {
    name: string;
    price: number;
    amount: number;
    discount: number
}

class Order {
    orderId: string;
    customerName: string;
    items: Product[] = [];
    totalAmount: number = 0

    constructor(orderId: string, customerName: string) {
        this.orderId = orderId;
        this.customerName = customerName;
    }

    addItem(product: Product) {
        this.items.push(product);
        this.totalAmount += product.price * product.amount * (1 - product.discount / 100);
    }
}

const SP = new Order("Đơn hàng", "Khách hàng");
console.log(SP);
console.log(SP.orderId, SP.customerName);

SP.addItem({ name: "Hoa Hồng 1", price: 2000, amount: 3, discount: 10 });
SP.addItem({ name: "Hoa Hồng 2", price: 3000, amount: 12, discount: 4 });

console.log(SP.items);
console.log(SP.totalAmount);