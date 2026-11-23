import { Page, Locator, expect } from "@playwright/test";
interface CartItem {
    productName: string;
    price: number;
    quantity: number;
}

export class MaterialBasepage {
    page: Page;
    xpathRegisterPage: string = "//a[text()='Bài học 1: Register Page (có đủ các element)']";
    xpathProductPage: string = "//a[text()='Bài học 2: Product page']";
    cssTodoPage: string = "//a[text()='Bài học 3: Todo page']";
    personalNote: Locator;

    constructor(page: Page) {
        this.page = page;
        this.personalNote = page.locator("//a[text()='Bài học 4: Personal notes']");
    }
    async openMaterialPage() {
        await this.page.goto("https://material.playwrightvn.com/");
    }
    async gotoPage(pageName: string) {
        switch (pageName) {
            case "registerpPage":
                await this.page.locator(this.xpathRegisterPage).click({ timeout: 10_000 });
                break;
            case "productPage":
                await this.page.locator(this.xpathProductPage).click();
                break;
            case "cssTodopage":
                await this.page.locator(this.cssTodoPage).click();
                break;
            case "personalNotepage":
                await this.personalNote.click();
                break;
            default:
                throw new Error(`Không có ${pageName} nào`)
        }
    }
}

export class RegisterPage extends MaterialBasepage {
    xpathUserName: string = "//input[@id='username']";
    xpathEmail: string = "//input[@id='email']";;
    xpathGendermale: string = "//input[@id='male']";
    xpathGenderFemale: string = "//input[@id='female']";
    xpathInputHobbiesReading: string = "input#reading";
    xpathInputHobbiesTraveling: string = "input#traveling";
    xpathInputHobbiesCooking: string = "input#cooking";
    xpathInputInterests: string = "//select[@id='interests']";
    xpathInputCountry: string = "//select[@id='country']";
    xpathInputDateOfBirth: string = "//input[@id='dob']";
    xpathInputFile: string = "//input[@type='file']";
    xpathInputBiography: string = "//textarea[@id='bio']";
    xpathInputRateUs: string = "//input[@id='rating']";
    xpathInputFavoriteColor: string = "//input[@id='favcolor']"
    xpathHoverNewLetter: string = "//div[normalize-space(text()) =  'Hover over me']";
    xpathInputNewsletter: string = "input#newsletter";
    xpathClickEnableFeature: string = "//span[@class='slider round']";
    xpathClickRegisterButton: string = "//button[@type='submit']";
    xpathInputStarRating: string = "//div[@id='starRating']";
    xpathInputCustomerDate: string = "input#customDate";

    constructor(page: Page) {
        super(page);
    }

    async fillUserName(username: string) {
        await this.page.locator(this.xpathUserName).fill(username);
    }

    async fillEmail(email: string) {
        await this.page.locator(this.xpathEmail).fill(email);
    }

    async checkGender(gender: string) {
        if (gender === 'male') {
            await this.page.locator(this.xpathGendermale).check();
        } else {
            await this.page.locator(this.xpathGenderFemale).check();
        }
    }

    async checkHobbies(hobbies: string) {
        if (hobbies === 'reading') {
            await this.page.locator(this.xpathInputHobbiesReading).check();
        } else if (hobbies === 'traveling') {
            await this.page.locator(this.xpathInputHobbiesTraveling).check();
        } else if (hobbies === 'cooking') {
            await this.page.locator(this.xpathInputHobbiesCooking).check();
        } else {
            throw new Error(`Không có ${hobbies} nào`)
        }
    }

    async FillSelectOptionInterests(interests: string) {
        await this.page.locator(this.xpathInputInterests).selectOption(interests);
    }

    async fillCountry(country: string) {
        await this.page.locator(this.xpathInputCountry).selectOption(country);

    }

    async fillDateOfBirth(dateofbirth: string) {
        await this.page.locator(this.xpathInputDateOfBirth).fill(dateofbirth);

    }

    async setInputFiles(inputprofilepicture: string) {
        await this.page.locator(this.xpathInputFile).setInputFiles(inputprofilepicture);
    }

    async fillBiography(biography: string) {
        await this.page.locator(this.xpathInputBiography).fill(biography);
    }

    async fillRateUs(rateus: string) {
        await this.page.locator(this.xpathInputRateUs).fill(rateus);
    }

    async fillFavoriteColor(color: string) {
        await this.page.locator(this.xpathInputFavoriteColor).fill(color);
    }

    async hoverNewLetter() {
        await this.page.locator(this.xpathHoverNewLetter).hover();
    }

    async checkNewletter() {
        await this.page.locator(this.xpathInputNewsletter).check();
    }

    async checkEnableFeature() {
        await this.page.locator(this.xpathClickEnableFeature).click();
    }

    // Thanh sao rộng 100px, mỗi sao = 20px → click ở x = số sao × 20
    async fillRating(rating: number) {
        await this.page.locator(this.xpathInputStarRating).click({ position: { x: rating * 20, y: 10 } });
    }

    // Ô readonly nên không fill được → gán giá trị trực tiếp bằng JavaScript
    async fillCustomerDate(customerdate: string) {
        await this.page.locator(this.xpathInputCustomerDate).fill(customerdate, { force: true });
    }

    async clickBtnRegister() {
        await this.page.locator(this.xpathClickRegisterButton).click();
    }
}

export class productPage extends MaterialBasepage {
    heading: string = "table thead th";
    rows: string = " table tbody>tr";
    total: string = "td.total-price";
    cartItem: CartItem[] = [];

    constructor(page: Page) {
        super(page);
    }

    async addProduct(listProduct: CartItem[]) {
        for (let i = 0; i < listProduct.length; i++) {
            let clickProduct = `//div[text()='${listProduct[i].productName}']/following-sibling::button`;
            for (let j = 0; j < listProduct[i].quantity; j++) {
                await this.page.locator(clickProduct).click()
            }
            this.cartItem.push(listProduct[i]);
        }

    }

    async listProduct() {
        for (let i = 0; i < this.cartItem.length; i++) {
            console.log(`${this.cartItem[i].productName} - ${this.cartItem[i].price} - ${this.cartItem[i].quantity}`)
        }
    }

    async verifyHeading() {
        await expect(this.page.locator(this.heading)).toHaveText(["Product Name", "Price", "Quantity", "Total", "Actions"]);
    }

    // số dòng 
    async checkRowCount(countrow: number) {
        await expect(this.page.locator(this.rows)).toHaveCount(countrow);
    }

    // số dòng, thứ tự, dữ liệu 
    async verifyRows(expected: string[]) {
        await expect(this.page.locator(this.rows)).toHaveText(expected);
    }

    //Dữ liệu trên 1 cột 
}

