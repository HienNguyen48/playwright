import { test, expect } from "@playwright/test";
import { MaterialBasepage, productPage, RegisterPage } from "../../pom/01-pom";

let userName = "Nguyễn Thị Hiền";
let email = "nguyenhienit94@gmail.com";
let interests = "science";
let dateOfBirth = "2026-10-30";
let picture = "tests/lesson10/file1.txt";
let country = "uk";
let rateUs = "10";
let favoriteColor = "#FFFF00";
let biography = "Nhập thông tin biography";
let starRating = 4;
let customDate = "2026-10-30";

let products = [
    { productName: "Product 1", price: 10.00, quantity: 2 },
    { productName: "Product 2", price: 20.00, quantity: 3 },
    { productName: "Product 3", price: 30.00, quantity: 1 }
]

test.describe('Gộp Tcs full', () => {
    test.skip("Register Page", async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await test.step("user Registration", async () => {
            {
                await registerPage.openMaterialPage();
                await registerPage.gotoPage("registerpPage");
                await registerPage.fillUserName(userName);
                await registerPage.fillEmail(email);
                await registerPage.checkGender("male");
                await registerPage.checkHobbies("cooking");
                await registerPage.FillSelectOptionInterests(interests)
                await registerPage.fillCountry(country);
                await registerPage.fillDateOfBirth(dateOfBirth);
                await registerPage.setInputFiles(picture);
                await registerPage.fillBiography(biography);
                await registerPage.fillRateUs(rateUs);
                await registerPage.fillFavoriteColor(favoriteColor);
                await registerPage.hoverNewLetter();
                await registerPage.checkNewletter();
                await registerPage.checkEnableFeature();
                await registerPage.fillRating(starRating);
                await registerPage.fillCustomerDate(customDate);
                await registerPage.clickBtnRegister();
            }
        })
    })

    test("Product Page - thêm sản phẩm và verify giỏ hàng", async ({ page }) => {
        const materialPage = new MaterialBasepage(page);
        const productsPage = new productPage(page);

        await test.step("Sản phẩm 2: 2 sản phẩm", async () => {
            await materialPage.openMaterialPage();
            await materialPage.gotoPage("productPage");
            await productsPage.addProduct(products);
            await productsPage.listProduct();

            let total = products.reduce((total, num) => total + num.price * num.quantity, 0);
            console.log(total);
        })
    })

})

