import { test, expect, Page } from "@playwright/test";

// ===== URL =====
const URL_HOME = "https://material.playwrightvn.com/";

// ===== Locator =====
const linkPersonalNotes = "//a[text()='Bài học 4: Personal notes']";
const heading = "//h1";
const inputSearch = "#search";
const inputTitle = "#note-title";
const inputContent = "#note-content";
const btnAddNote = "#add-note";
const noteItems = "#notes-list li";
const noteTitles = "#notes-list li strong";
const noteContents = "#notes-list li p";
const noteCount = "#note-count";

// ===== Dữ liệu test =====
const listNotes = [
    { title: "XPath Axes", content: "parent, child, following-sibling" },
    { title: "CSS Selector", content: "#id, .class, :nth-child(n)" },
    { title: "Playwright Locator", content: "getByRole, getByText, getByLabel" },
    { title: "Họp team", content: "Thứ 2 lúc 9h, review test case" },
    { title: "Mua sắm", content: "Sữa, trứng, bánh mì" },
];

// Trang tìm theo cả title lẫn content, không phân biệt hoa thường
const listSearch = [
    { keyword: "xpath", expected: ["XPath Axes"] },                 // khớp title, chữ thường
    { keyword: "GETBYROLE", expected: ["Playwright Locator"] },     // khớp content, chữ hoa
    { keyword: "thứ 2", expected: ["Họp team"] },                   // tiếng Việt có dấu
    { keyword: "selector", expected: ["CSS Selector"] },
    { keyword: "không có gì", expected: [] },                        // không có kết quả
];

// Dữ liệu không hợp lệ: thiếu title hoặc content thì không được thêm
const listInvalid = [
    { name: "Bỏ trống cả hai", title: "", content: "" },
    { name: "Bỏ trống title", title: "", content: "Có nội dung" },
    { name: "Bỏ trống content", title: "Có tiêu đề", content: "" },
    { name: "Title chỉ có dấu cách", title: "    ", content: "Có nội dung" },
    { name: "Content chỉ có dấu cách", title: "Có tiêu đề", content: "    " },
];

// ===== Hàm dùng chung =====
async function addNote(page: Page, note: { title: string; content: string }) {
    await page.locator(inputTitle).fill(note.title);
    await page.locator(inputContent).fill(note.content);
    await page.locator(btnAddNote).click();
}

async function addAllNotes(page: Page) {
    for (const note of listNotes) {
        await addNote(page, note);
    }
    await expect(page.locator(noteItems)).toHaveCount(listNotes.length);
}

// Tìm 1 dòng note theo title (khớp chính xác, tránh "Task 1" khớp "Task 10")
function rowByTitle(page: Page, title: string) {
    return page.locator(noteItems).filter({
        has: page.locator("strong").getByText(title, { exact: true }),
    });
}

test.describe("Personal Notes", () => {
    test.beforeEach("Mở trang Personal notes", async ({ page }) => {
        await page.goto(URL_HOME);
        await page.locator(linkPersonalNotes).click();
        await expect(page).toHaveURL(/04-xpath-personal-notes\.html/);
        await expect(page).toHaveTitle("Personal Notes");
        await expect(page.locator(heading)).toHaveText("Personal Notes");
    });

    test("TC01 - Trạng thái ban đầu", async ({ page }) => {
        await expect(page.locator(noteItems)).toHaveCount(0);
        await expect(page.locator(noteCount)).toHaveText("Total Notes: 0");
        await expect(page.locator(inputSearch)).toBeEmpty();
        await expect(page.locator(inputTitle)).toBeEmpty();
        await expect(page.locator(inputContent)).toBeEmpty();
        await expect(page.locator(inputSearch)).toHaveAttribute("placeholder", "Search notes...");
        await expect(page.locator(inputTitle)).toHaveAttribute("placeholder", "Enter note title");
        await expect(page.locator(inputContent)).toHaveAttribute("placeholder", "Enter note content");
        await expect(page.getByRole("button", { name: "Add Note" })).toBeEnabled();
    });

    test("TC02 - Thêm nhiều note", async ({ page }) => {
        await test.step("Thêm từng note và kiểm tra sau mỗi lần thêm", async () => {
            for (let i = 0; i < listNotes.length; i++) {
                await page.locator(inputTitle).fill(listNotes[i].title);
                await page.locator(inputContent).fill(listNotes[i].content);
                await expect(page.locator(inputTitle)).toHaveValue(listNotes[i].title);
                await expect(page.locator(inputContent)).toHaveValue(listNotes[i].content);

                await page.locator(btnAddNote).click();

                await expect(page.locator(noteItems)).toHaveCount(i + 1);
                await expect(page.locator(noteCount)).toHaveText(`Total Notes: ${i + 1}`);
                await expect(page.locator(noteTitles).nth(i)).toHaveText(listNotes[i].title);
                await expect(page.locator(noteContents).nth(i)).toHaveText(listNotes[i].content);
                // Thêm xong thì form được xóa trắng
                await expect(page.locator(inputTitle)).toBeEmpty();
                await expect(page.locator(inputContent)).toBeEmpty();
            }
        });

        await test.step("Kiểm tra toàn bộ danh sách", async () => {
            await expect(page.locator(noteTitles)).toHaveText(listNotes.map(n => n.title));
            await expect(page.locator(noteContents)).toHaveText(listNotes.map(n => n.content));
        });

        await test.step("Mỗi note có đủ nút Edit và Delete", async () => {
            for (const note of listNotes) {
                const row = rowByTitle(page, note.title);
                await expect(row.getByRole("button", { name: "Edit" })).toBeVisible();
                await expect(row.getByRole("button", { name: "Delete" })).toBeVisible();
            }
        });
    });

    test("TC03 - Tự cắt dấu cách thừa ở đầu và cuối", async ({ page }) => {
        await addNote(page, { title: "   Có dấu cách   ", content: "   Nội dung   " });
        await expect(page.locator(noteTitles)).toHaveText(["Có dấu cách"]);
        await expect(page.locator(noteContents)).toHaveText(["Nội dung"]);
    });

    for (const item of listInvalid) {
        test(`TC04 - Không thêm note khi dữ liệu không hợp lệ: ${item.name}`, async ({ page }) => {
            await addNote(page, item);
            await expect(page.locator(noteItems)).toHaveCount(0);
            await expect(page.locator(noteCount)).toHaveText("Total Notes: 0");
        });
    }

    test("TC05 - Sửa note", async ({ page }) => {
        const oldNote = listNotes[1];
        const newNote = { title: "CSS Selector - đã ôn", content: "#id, .class, [attr], :has()" };

        await addAllNotes(page);

        await test.step("Bấm Edit thì dữ liệu cũ đổ lên form", async () => {
            await rowByTitle(page, oldNote.title).getByRole("button", { name: "Edit" }).click();
            await expect(page.locator(inputTitle)).toHaveValue(oldNote.title);
            await expect(page.locator(inputContent)).toHaveValue(oldNote.content);
        });

        await test.step("Nhập dữ liệu mới và lưu", async () => {
            await page.locator(inputTitle).fill(newNote.title);
            await page.locator(inputContent).fill(newNote.content);
            await page.locator(btnAddNote).click();
        });

        await test.step("Kiểm tra note đã đổi, số lượng không đổi, vị trí giữ nguyên", async () => {
            const expectedTitles = listNotes.map(n => n.title);
            expectedTitles[1] = newNote.title;

            await expect(page.locator(noteItems)).toHaveCount(listNotes.length);
            await expect(page.locator(noteCount)).toHaveText(`Total Notes: ${listNotes.length}`);
            await expect(page.locator(noteTitles)).toHaveText(expectedTitles);
            await expect(page.locator(noteContents).nth(1)).toHaveText(newNote.content);
            await expect(rowByTitle(page, oldNote.title)).toHaveCount(0);
        });
    });

    test("TC06 - Xóa note (bấm OK)", async ({ page }) => {
        const deleted = listNotes[2];
        await addAllNotes(page);

        page.once("dialog", async dialog => {
            expect(dialog.type()).toBe("confirm");
            expect(dialog.message()).toBe("Are you sure you want to delete this note?");
            await dialog.accept();
        });
        await rowByTitle(page, deleted.title).getByRole("button", { name: "Delete" }).click();

        const remain = listNotes.filter(n => n.title !== deleted.title).map(n => n.title);
        await expect(rowByTitle(page, deleted.title)).toHaveCount(0);
        await expect(page.locator(noteTitles)).toHaveText(remain);
        await expect(page.locator(noteCount)).toHaveText(`Total Notes: ${remain.length}`);
    });

    test("TC07 - Hủy xóa note (bấm Hủy)", async ({ page }) => {
        await addAllNotes(page);

        page.once("dialog", dialog => dialog.dismiss());
        await rowByTitle(page, listNotes[0].title).getByRole("button", { name: "Delete" }).click();

        await expect(page.locator(noteTitles)).toHaveText(listNotes.map(n => n.title));
        await expect(page.locator(noteCount)).toHaveText(`Total Notes: ${listNotes.length}`);
    });

    test("TC08 - Xóa tất cả note", async ({ page }) => {
        await addAllNotes(page);

        page.on("dialog", dialog => dialog.accept());   // mọi confirm đều bấm OK, đặt 1 lần
        for (let i = listNotes.length - 1; i >= 0; i--) {
            await page.locator(noteItems).nth(i).getByRole("button", { name: "Delete" }).click();
            await expect(page.locator(noteItems)).toHaveCount(i);
            await expect(page.locator(noteCount)).toHaveText(`Total Notes: ${i}`);
        }
    });

    test("TC09 - Tìm kiếm note", async ({ page }) => {
        await addAllNotes(page);

        for (const item of listSearch) {
            await test.step(`Tìm "${item.keyword}"`, async () => {
                await page.locator(inputSearch).fill(item.keyword);
                await expect(page.locator(noteTitles)).toHaveText(item.expected);
                await expect(page.locator(noteCount)).toHaveText(`Total Notes: ${item.expected.length}`);
            });
        }

        await test.step("Xóa từ khóa thì hiện lại đủ danh sách", async () => {
            await page.locator(inputSearch).clear();
            await expect(page.locator(noteTitles)).toHaveText(listNotes.map(n => n.title));
            await expect(page.locator(noteCount)).toHaveText(`Total Notes: ${listNotes.length}`);
        });
    });

    test("TC10 - Note vẫn còn sau khi tải lại trang (localStorage)", async ({ page }) => {
        await addAllNotes(page);

        await page.reload();

        await expect(page.locator(noteTitles)).toHaveText(listNotes.map(n => n.title));
        await expect(page.locator(noteContents)).toHaveText(listNotes.map(n => n.content));
        await expect(page.locator(noteCount)).toHaveText(`Total Notes: ${listNotes.length}`);
    });

    // BUG của trang: khi đang tìm kiếm, nút Delete dùng vị trí trong danh sách ĐÃ LỌC
    // để xóa trong danh sách GỐC, nên xóa nhầm note khác.
    // test.fail(): test này được mong đợi là FAIL. Khi dev sửa bug, test sẽ báo để gỡ test.fail().
    test("TC11 - [BUG] Xóa note khi đang tìm kiếm phải xóa đúng note", async ({ page }) => {
        test.fail(true, "Bug: deleteNote dùng index của danh sách đã lọc");
        await addAllNotes(page);

        await page.locator(inputSearch).fill("Mua sắm");
        await expect(page.locator(noteTitles)).toHaveText(["Mua sắm"]);

        page.once("dialog", dialog => dialog.accept());
        await rowByTitle(page, "Mua sắm").getByRole("button", { name: "Delete" }).click();

        await page.locator(inputSearch).clear();
        await expect(rowByTitle(page, "Mua sắm")).toHaveCount(0, { timeout: 2_000 });             // đúng: "Mua sắm" bị xóa
        await expect(rowByTitle(page, listNotes[0].title)).toHaveCount(1, { timeout: 2_000 });   // đúng: "XPath Axes" còn
    });
});
