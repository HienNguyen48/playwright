import { test } from "@playwright/test";

let product = [
    { producName: "Product 1", price: 10.00, Quantity: 2 },
    { producName: "Product 2", price: 20.00, Quantity: 3 },
    { producName: "Product 3", price: 30.00, Quantity: 1 }
]
test("", async ({ page }) => {
    // await test.step("Sản phẩm 1: 2 sản phẩm", async () => {
    //     await page.goto("https://material.playwrightvn.com/");
    //     await page.locator("//a[text() ='Bài học 2: Product page']").dblclick();
    //     await page.locator(clickProduct1).click();
    // })

    await test.step("Sản phẩm 2: 2 sản phẩm", async () => {
        await page.goto("https://material.playwrightvn.com/");
        await page.locator("//a[text() ='Bài học 2: Product page']").click();
        for (let i = 0; i < product.length; i++) {
            let clickProduct = `//div[text()='${product[i].producName}']/following-sibling::button`;
            for (let j = 0; j < product[i].Quantity; j++) {
                await page.locator(clickProduct).click()
            }

        }

        let total = product.reduce((total, num) => total + num.price * num.Quantity, 0);
        console.log(total);

    })
})