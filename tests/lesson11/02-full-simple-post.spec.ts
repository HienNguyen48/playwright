import { test, expect, request } from "@playwright/test";
//expect để verify thông tin 

test.describe('Full tcs', async () => {
    let id: any;
    test('1:create todos', async ({ request }) => {
        const response = await request.post('https://material.playwrightvn.com/api/todo-app/v1/todo.php', {
            data: {
                "id": 1,
                "title": "Nguyen hien",
                "description": "Write comprehensive docs for the API",
                "status": "completed",
                "priority": "high",
                "due_date": "2026-11-23T17:00:00",
                "user_id": 1
            }
        })
        const responseJson = await response.json();
        console.log(responseJson);
        id = responseJson.todo.id;
        console.log(id);
        // lấy ra id 
        // Lưu lại;

        //TH không có json chỉ có text =>  thì ta phải chuyển cái text đó sang json
        // const responseText = await response.text();
        // const responseJson = JSON.parse(responseText);
        // console.log(responseJson);
    });

    test('2: delete todo', async ({ request }) => {
        // delete to do có id ở bước 1
        const response = await request.delete('https://material.playwrightvn.com/api/todo-app/v1/todo.php',
            {
                data: {
                    "id": id,
                },
            }
        );
        const responseJson = await response.json();
        console.log(responseJson);
    });
});



