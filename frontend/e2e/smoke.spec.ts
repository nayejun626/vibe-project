import { test, expect } from "@playwright/test";

test.describe("public routes", () => {
  test("home redirects to login", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("login page shows form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /나만의 일기장/ })).toBeVisible();
    await expect(page.getByLabel("이메일")).toBeVisible();
    await expect(page.getByLabel("비밀번호")).toBeVisible();
    await expect(page.getByRole("button", { name: "로그인" })).toBeVisible();
  });

  test("signup page shows form", async ({ page }) => {
    await page.goto("/signup");
    await expect(
      page.getByText("새 계정을 만들고 일기를 시작하세요")
    ).toBeVisible();
    await expect(page.getByLabel("이메일")).toBeVisible();
    await expect(page.getByLabel("비밀번호", { exact: true })).toBeVisible();
    await expect(page.getByLabel("비밀번호 확인")).toBeVisible();
    await expect(page.getByRole("button", { name: "가입하기" })).toBeVisible();
  });
});
