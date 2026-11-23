import { test } from "@playwright/test";

let inputTodoList = "//input[@id='new-task']";
let btnAddTask = "//button[text() ='Add Task']";
let arr: string[] = [];

test("todo page", async ({ page }) => {
    await test.step("", async () => {
        await page.goto("https://material.playwrightvn.com/");
        await page.locator("//a[text() ='Bài học 3: Todo page']").click();

        for (let i = 0; i <= 100; i++) {
            let nameLength = `Todo${i}`;
            arr.push(nameLength);
            await page.locator(inputTodoList).fill(nameLength);
            await page.locator(btnAddTask).click()
            console.log(nameLength);
        }

        let result = arr.filter((num, index) => (index + 1) % 2 !== 0);
        console.log(result);

    })
})