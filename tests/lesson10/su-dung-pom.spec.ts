import { test } from '@playwright/test';
import { MyloginPage } from '../../pom/pom';

//impot để thêm nó vào => dùng cái  pom đã viết 
test("Login Faild", async ({ page }) => {
    const LoginPage = new MyloginPage(page);

    await test.step("go to login page", async () => {
        await LoginPage.page.goto("https://pw-practice-dev.playwrightvn.com/wp-login.php?");
    })

    await test.step("Fill username", async () => {
        await LoginPage.fillUsername("Hien");
    })

    await test.step("Fill password", async () => {
        await LoginPage.fillPassword("123@abc");
    })

    await test.step("Click button Login", async () => {
        await LoginPage.clicklogin();
    })
})

test("Login Success", async ({ page }) => {
    const LoginPage = new MyloginPage(page);

    await test.step("go to login page", async () => {
        await LoginPage.page.goto("https://pw-practice-dev.playwrightvn.com/wp-login.php?");
    })

    await test.step("Fill username", async () => {
        await LoginPage.fillUsername("betterbytes.academy.admin");
    })

    await test.step("Fill password", async () => {
        await LoginPage.fillPassword("StrongPass@BetterBytesAcademy");
    })

    await test.step("Click button Login", async () => {
        await LoginPage.clicklogin();
    })
})