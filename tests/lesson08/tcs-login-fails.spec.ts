import { expect, Page, test } from '@playwright/test';
let locatorUserName = "//input[@id='user_login']";
let locatorPassword = "//input[@id='user_pass']";
let btnLogin = "//input[@id='wp-submit']";
let msgLoginFail = "//p/child::strong[normalize-space()='Error:']/following-sibling::strong";
let UsersMenu = "//li[@id='menu-users']/a";
let MenuTextUsers = "//h1[normalize-space(text())='Users']";
let BtnAddUser = "//h1[normalize-space(text())='Users']//following-sibling::a[text()='Add User']";
let fillUserNameFail = "betterbytes.academy.admin1";
let fillPassWordFail = "StrongPass111@BetterBytesAcademy";
let fillUserNamePass = "betterbytes.academy.admin";
let fillPassWordPass = "StrongPass@BetterBytesAcademy";
let inputUserName = "//input[@id='user_login']";
let inputEmail = "//input[@id='email']";
let inputFirstname = "//input[@id='first_name']";
let inputLastName = "//input[@id='last_name']";
let inputRole = "//select[@id='role']";
let btnAddUserform = "//input[@id='createusersub']";
let inputPassword = "//input[@id='pass1']";

// Thêm thời gian vào username, email để mỗi lần chạy không bị trùng
const stamp = Date.now();

// Username: không dấu (WordPress không cho username có dấu)
// Email: @example.com để không gửi thư tới hộp thư thật
// Password: đủ mạnh để nút Add User không bị khóa
let listUser = [
    { username: `K10_Hien_${stamp}`, email: `k10_hien_${stamp}@example.com`, password: "Hien@2026Pass#Strong", firstname: "Hiền", lastname: "Nguyễn", role: "contributor" },
    { username: `K10_Minh_${stamp}`, email: `k10_minh_${stamp}@example.com`, password: "Minh@2026Pass#Strong", firstname: "Minh", lastname: "Nguyễn", role: "administrator" },
    { username: `K10_Khanh_${stamp}`, email: `k10_khanh_${stamp}@example.com`, password: "Khanh@2026Pass#Strong", firstname: "Khánh", lastname: "Nguyễn", role: "editor" },
    { username: `K10_Tho_${stamp}`, email: `k10_tho_${stamp}@example.com`, password: "Tho@2026Pass#Strong", firstname: "Thọ", lastname: "Nguyễn", role: "author" }
];
let msgAddUser = "//div[@id='message']";

test.describe.skip('Authentication',() => {
    test.beforeEach(async ({ page }) => {
        await test.step("Đi tới trang login", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-login.php?");
        })
    })

    test("Login Fail", async ({ page }) => {
        await page.locator(locatorUserName).fill(fillUserNameFail);
        await page.locator(locatorPassword).fill(fillPassWordFail);
        await page.locator(btnLogin).click();
        await expect(page.locator(msgLoginFail)).toBeVisible();
    })

    test("Login Pass", async ({ page }) => {
        await page.locator(locatorUserName).fill(fillUserNamePass);
        await page.locator(locatorPassword).fill(fillPassWordPass);
        await page.locator(btnLogin).click();
        await expect(page).toHaveURL(/wp-admin/, { timeout: 15_000 });

        await expect(page.locator("//h1")).toBeVisible();
        await expect(page).toHaveTitle(/Dashboard/i, { timeout: 10_000 })
    })
})

test.describe('Account', () => {
    test.beforeEach(async ({ page }) => {
        await test.step("Đi tới trang login", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-login.php?");
            await page.locator(locatorUserName).fill(fillUserNamePass);
            await page.locator(locatorPassword).fill(fillPassWordPass);
            await page.locator(btnLogin).click();
            await expect(page).toHaveURL(/wp-admin/);
        })
    })

    test("Create accounts from listUser", async ({ page }) => {

        for (let i = 0; i < listUser.length; i++) {
            const user = listUser[i];

            await test.step(`Tạo user ${user.username} - role ${user.role}`, async () => {
                // Mỗi vòng: vào màn Users rồi bấm Add User để mở form mới
                await page.locator(UsersMenu).click();
                await expect(page).toHaveURL(/wp-admin\/users\.php/, { timeout: 10_000 });
                await expect(page.locator(MenuTextUsers)).toBeVisible();
                await expect(page.locator(BtnAddUser)).toBeVisible();
                await page.locator(BtnAddUser).click();
                await expect(page).toHaveURL(/wp-admin\/user-new\.php/);

                // Điền form
                await page.locator(inputUserName).fill(user.username);
                await page.locator(inputEmail).fill(user.email);
                await page.locator(inputFirstname).fill(user.firstname);
                await page.locator(inputLastName).fill(user.lastname);
                await page.locator(inputPassword).fill(user.password);
                await page.locator(inputRole).selectOption(user.role);

                // Kiểm tra dữ liệu đã điền
                await expect(page.locator(inputUserName)).toHaveValue(user.username);
                await expect(page.locator(inputEmail)).toHaveValue(user.email);
                await expect(page.locator(inputFirstname)).toHaveValue(user.firstname);
                await expect(page.locator(inputLastName)).toHaveValue(user.lastname);
                await expect(page.locator(inputRole)).toHaveValue(user.role);

                // Bấm Add User và kiểm tra tạo THÀNH CÔNG
                await page.locator(btnAddUserform).click({ timeout: 10_000 });
                await expect(page).toHaveURL(/wp-admin\/users\.php\?id=\d+/, { timeout: 10_000 });
                await expect(page.locator(msgAddUser)).toContainText("New user created.");
            });
        }
    })
})


