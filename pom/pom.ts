import { Page } from "@playwright/test";

//export xuất nó ra
export class MyloginPage {
    page: Page;
    usernameXpath: string = "input#user_login";
    passwordXpath: string = "input#user_pass";
    rememberMeXpath: string = "//label[text()='Remember Me']";
    loginXpath: string = "input#wp-submit";

    constructor(page: Page) {
        this.page = page;
    }

    async fillUsername(username: string) {
        await this.page.locator(this.usernameXpath).fill(username);
    }

    async fillPassword(password: string) {
        await this.page.locator(this.passwordXpath).fill(password);
    }

    async clicklogin() {
        await this.page.locator(this.loginXpath).click();
    }
}