import { test } from '@playwright/test'; //import test vào file test
test('Basic action', async ({ page }) => {
    await test.step('step1', async () => {
        await page.goto("https://material.playwrightvn.com/");

    })
    await test.step('Click', async () => {
        await page.locator("//a[text()='Bài học 1: Register Page (có đủ các element)']").click();
    })
    // await test.step('Input', async () => {
    //     await page.locator("//input[@id='username']").fill("Nguyễn Thị Hiền");
    //     await page.locator("//input[@id='email']").pressSequentially("nguyenhienit94@gmail.com", { delay: 1_000 });
    // })

    // await test.step('Radio button/ Checkbox', async () => {
    //     let ischeckMale = await page.locator("//input[@id='male']").isChecked();
    //     console.log(ischeckMale);

    //     await page.locator("//input[@id='male']").check();
    //     ischeckMale = await page.locator("//input[@id='male']").isChecked();
    //     console.log(ischeckMale);
    // })

    // await test.step("Select Option", async() => {
    //      await page.locator("//select[@id='country']").selectOption("canada");
    // })

    await test.step("upload file", async() => {
        await page.locator("//input[@type='file']").setInputFiles("tests/file1.txt");
    })
})