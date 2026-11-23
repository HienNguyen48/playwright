import { expect, test } from "@playwright/test";

test("Demo expect", async() => {
    expect(1+2).toBe(3);
    expect(1+2).toEqual(4);

    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);

    const str = "Hello Viet Nam";
    expect(str).toContain("Nam");
})