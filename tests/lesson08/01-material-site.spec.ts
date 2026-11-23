import { test, expect } from "@playwright/test"
test.describe("Material", async () => {
    test.beforeAll(async ({ page }) => {
        await page.goto("https://material.playwrightvn.com/")
    })

    test.afterAll(async ({ page }) => {
        console.log("Đã chạy xong tất cả");
        ;

    })
    test.beforeEach(async ({ page }) => {
        await test.step(" Vào trang web", async () => {
            await page.goto("https://material.playwrightvn.com/index.html");
        })
    })

    test.afterEach(async ({ page }) => {
        await page.goto("https://alpha-adminott.irismedia.vn/");
    })

    test("User register", async ({ page }) => {
        await test.step("Click  register", async () => {
            await page.locator("//a[text()='Bài học 1: Register Page (có đủ các element)']").click();
        })
    })

    test("Product page", async ({ page }) => {
        await test.step("Production page", async () => {
            await page.locator("//a[text()='Bài học 2: Product page']").click();
        })
    })

});

