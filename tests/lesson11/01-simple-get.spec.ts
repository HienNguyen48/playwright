import { expect, test } from "@playwright/test";

test('Get all to do', async ({ request }) => {
    //log kết quả tổng thể bao gồm nhiều thứ
    const response = await request.get('https://material.playwrightvn.com/api/todo-app/v1/todos.php');
    //Lấy ra body
    const responseJson = await response.json();
    console.log(responseJson.todos.length);

    expect(response.status()).toBe(200);
    expect(responseJson.todos.length).toEqual(19);
})
