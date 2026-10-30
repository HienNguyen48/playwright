import { test } from "@playwright/test";
let userName = "Nguyễn Thị Hiền";
let email = "nguyenhienit94@gmail.com";
let interests = "science";
let dateOfBirth = "2026-10-30";
let picture = "tests/file1.txt";
let country = "uk";
let rateUs = "10";
let favoriteColor = "#FFFF00";
let biography = "Nhập thông tin biography";
let starRating = "4";
let customDate = "2026-10-30";

let inputUsername = "//input[@id='username']";
let inputEmail = "//input[@id='email']";
let inputGender = "//input[@id='female']";
let inputHobbies = "//input[@id='traveling']";
let inputInterests = "//select[@id='interests']";
let inputCountry = "//select[@id='country']";
let inputDateOfBirth = "//input[@id='dob']";
let inputFile = "//input[@type='file']";
let inputBiography = "//textarea[@id='bio']";
let inputRating = "//input[@id='rating']";
let inputFavoriteColor = "//input[@id='favcolor']"
let hoverNewLetter = "//div[normalize-space(text()) =  'Hover over me']";
let inputNewsletter = "//input[@id='newsletter']";
let clickEnableFeature = "//span[@class='slider round']";
let clickRegisterButton = "//button[@type='submit']";
let inputStarRating = "//div[@id='starRating' and @data-rating = '4.1']"
let inputCustomerDate = "//input[@id='customDate']";


test("Register Page", async ({ page }) => {
    await test.step("user Registration", async () => {
        {
            await page.goto("https://material.playwrightvn.com/");
            await page.locator("//a[text()='Bài học 1: Register Page (có đủ các element)']").click();
            await page.locator(inputUsername).fill(userName);
            await page.locator(inputEmail).fill(email);
            // await page.locator(inputGender).isChecked();
            await page.locator(inputGender).check();
            // await page.locator(inputHobbies).isChecked();
            await page.locator(inputHobbies).check();
            await page.locator(inputInterests).selectOption(interests);
            await page.locator(inputCountry).selectOption(country);
            await page.locator(inputDateOfBirth).fill(dateOfBirth);
            await page.locator(inputFile).setInputFiles(picture);
            await page.locator(inputBiography).fill(biography);
            await page.locator(inputRating).fill(rateUs);
            await page.locator(inputFavoriteColor).fill(favoriteColor);
            await page.locator(hoverNewLetter).hover();
            await page.locator(inputNewsletter).check();
            await page.locator(clickEnableFeature).click();
            // await page.locator(inputStarRating).click();
            // await page.locator(inputCustomerDate).fill(customDate);
            await page.locator(clickRegisterButton).click();
        }
    })
})