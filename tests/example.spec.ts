import { test, expect } from '@playwright/test';

//has title: tên của 1 tcs 
//
test('has title', async ({ page }) => {
  //goto => đi đến 1 trang playwright dev
  await page.goto('https://playwright.dev/');

  // Expect mong muốn
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click vào link có chữ get started
  await page.getByRole('link', { name: 'Get started' }).click();

  // Kiểm tra bất cứ phần tử nào trên màn hình mà là  heading => kiểm tra tiêu đề lớn ở trên trang web mà hiền thị ra ngoài màn hình ví du: installation có hiển thị trên màn hình 
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
