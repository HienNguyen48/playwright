import { test, expect } from "@playwright/test";
let textTrang = "//a[text()='Bài học 4: Personal notes']";
const listNotes = [
    { title: "XPath Axes", content: "parent, child, following-sibling" },
    { title: "CSS Selector", content: "#id, .class, :nth-child(n)" },
    { title: "Playwright Locator", content: "getByRole, getByText, getByLabel" },
    { title: "Họp team", content: "Thứ 2 lúc 9h, review test case" },
    { title: "Mua sắm", content: "Sữa, trứng, bánh mì" },
];
let searchNotes = "input#search";
let titles = "input#note-title";
let contents = "textarea#note-content";
let btnAddNotes = "//button[text() = 'Add Note']";
let listable = "ul#notes-list li";
let searchTable = "input#search";
//ul#notes-list li:nth-child(1)

test.describe('Persional Notes', () => {
    test.beforeEach('Login vào Mh', async ({ page }) => {
        await page.goto("https://material.playwrightvn.com/");
        await page.locator(textTrang).click();
        await expect(page).toHaveURL(/04-xpath-personal-notes\.html/);
        await expect(page.locator("//h1")).toHaveText("Personal Notes")
    });

    test('Add Notes', async ({ page }) => {
        test.step('thêm mới', async () => {
            for (let listnote of listNotes) {
                await page.locator(titles).fill(listnote.title);
                await page.locator(contents).fill(listnote.content);

                await expect(page.locator(titles)).toHaveValue(listnote.title);
                await expect(page.locator(contents)).toHaveValue(listnote.content);

                await page.locator(btnAddNotes).click();
                let total = listNotes.reduce((total, num) => total + num.title.length + num.content.length, 0)
            }
            await expect(page.locator(listable)).toHaveCount(listNotes.length);
        })

        test.step('Edit notes', async () => {
            for (let listnote of listNotes) {
                // let result = listNotes.filter((listnote) => listnote.title && listnote.content);
                
            }
        })


    })
})