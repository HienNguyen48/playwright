import { test, expect } from "@playwright/test";
let inputNewTask = "input#new-task";
const listTask = ["Task 1", "Task2", "Task3", "Task4", "Task5"]
const editTask = listTask.map((newTaskEdit) => `${newTaskEdit} - Đã sửa`);
let verifyInformation = "ul#task-list span";
let btnEdit = "ul#task-list button:nth-child(1)";
let btnDelete = "ul#task-list button:nth-child(2)";



test.describe("Todo page", () => {
    test.beforeEach("Todo page", async ({ page }) => {
        await page.goto("https://material.playwrightvn.com/");
        await page.getByRole("link", { name: "Bài học 3: Todo page", exact: true }).click();
        await expect(page).toHaveURL(/03-xpath-todo-list.html/);
        await expect(page.locator("//h1")).toContainText("To-Do List")
    })
    test("Bài học 3: Todo page", async ({ page }) => {
        await test.step("add todo", async () => {
            for (let i = 0; i < listTask.length; i++) {
                await page.locator(inputNewTask).fill(listTask[i]);
                await expect(page.locator(inputNewTask)).toHaveValue(listTask[i]);
                await expect(page.getByRole("button", { name: "Add Task" })).toBeEnabled();
                await page.getByRole("button", { name: "Add Task" }).click();
                await expect(page.locator(verifyInformation).nth(i)).toContainText(listTask[i]);

            }
        })

        await test.step("Edit todo", async () => {
            for (let i = 0; i < listTask.length; i++) {
                page.once('dialog', dialog => dialog.accept(editTask[i]));
                await page.locator(btnEdit).nth(i).click({ timeout: 10_000 });
                await expect(page.locator(verifyInformation).nth(i)).toContainText(editTask[i]);
            }
        })

        await test.step("Delete", async () => {
            for (let i = editTask.length - 1; i >= 0; i--) {
                page.once('dialog', dialog => dialog.accept((editTask[i])));
                await page.locator(btnDelete).nth(i).click();
                await expect(page.locator(verifyInformation)).toHaveCount(i);
            }
        })

    })

})