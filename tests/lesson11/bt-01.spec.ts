import { expect, request, test } from "@playwright/test";

test.describe('full bai tap', async () => {
    // test('Login success admin account', async ({ request }) => {
    //     const BaseURL = "https://material.playwrightvn.com/api/user-management/v1";
    //     const response = await request.post(`${BaseURL}/login.php`, {
    //         data: {
    //             "email": "admin@example.com",
    //             "password": "password"
    //         }
    //     });
    //     const responseJSON = await response.json();
    //     console.log(responseJSON);
    //     expect(response.status(), 'Status code = 200').toBe(200);
    //     expect(responseJSON, 'Response phải có data.token').toHaveProperty('data.token');

    //     const token = responseJSON.data.token;
    //     expect(typeof token, 'Token phải là chuỗi').toBe("string");
    //     expect(token.length, 'Token không rỗng').toBeGreaterThan(0);
    // })

    test('login success user account', async ({ request }) => {
        const BaseURL = "https://material.playwrightvn.com/api/user-management/v1";
        const response = await request.post(`${BaseURL}/login.php`, {
            data: {
                "email": "john@example.com",
                "password": "password"
            }
        });
        const responseJSON = await response.json();
        console.log(responseJSON);
        expect(response.status(), 'Status code = 200').toBe(200);
        expect(responseJSON, 'Response phải có data.token').toHaveProperty('data.token');

        const token = responseJSON.data.token;
        expect(typeof token, 'Token phải là chuỗi').toBe("string");
        expect(token.length, 'Token không rỗng').toBeGreaterThan(0);
    })
})