import { test, expect } from "@playwright/test";

const email = process.env.E2E_EMAIL?.trim();
const password = process.env.E2E_PASSWORD?.trim();
const hasAuth = Boolean(email && password);

test.describe("diary full flow (Supabase)", () => {
  test.skip(!hasAuth, "Set E2E_EMAIL and E2E_PASSWORD for this suite.");

  test.describe.configure({ mode: "serial" });

  test("로그인(또는 가입) → 작성 → 목록 → 상세 → 수정 → 삭제 → 로그아웃", async ({
    page,
  }) => {
    const unique = `E2E ${Date.now()}`;
    const title = `일기 ${unique}`;
    const editedTitle = `${title} (수정됨)`;

    await page.goto("/login");
    await page.getByLabel("이메일").fill(email!);
    await page.getByLabel("비밀번호").fill(password!);
    await page.getByRole("button", { name: "로그인" }).click();

    const reachedDiariesAfterLogin = await page
      .waitForURL(/\/diaries$/, { timeout: 20_000 })
      .then(() => true)
      .catch(() => false);

    if (!reachedDiariesAfterLogin) {
      await page.goto("/signup");
      await page.getByLabel("이메일").fill(email!);
      await page.getByLabel("비밀번호", { exact: true }).fill(password!);
      await page.getByLabel("비밀번호 확인").fill(password!);
      await page.getByRole("button", { name: "가입하기" }).click();

      if (!page.url().includes("/diaries")) {
        await page.goto("/login");
        await page.getByLabel("이메일").fill(email!);
        await page.getByLabel("비밀번호").fill(password!);
        await page.getByRole("button", { name: "로그인" }).click();
      }
    }

    await expect(page).toHaveURL(/\/diaries$/, { timeout: 30_000 });

    await page.getByRole("link", { name: "+ 새 일기" }).click();
    await expect(page).toHaveURL(/\/diaries\/new$/);

    await page.locator("button").filter({ hasText: "😊" }).first().click();
    await page.getByLabel("제목").fill(title);
    await page.getByLabel("내용").fill(`본문 ${unique}\n두 번째 줄`);
    await page.getByRole("button", { name: "저장하기" }).click();

    await expect(page).toHaveURL(/\/diaries$/);
    await expect(page.getByRole("link", { name: new RegExp(title) })).toBeVisible({
      timeout: 15_000,
    });

    await page.getByRole("link", { name: new RegExp(title) }).click();
    await expect(page.getByRole("heading", { name: title })).toBeVisible();

    await page.getByRole("link", { name: "수정" }).click();
    await expect(page).toHaveURL(/\/edit$/);
    await page.getByLabel("제목").fill(editedTitle);
    await page.getByRole("button", { name: "수정 완료" }).click();
    await expect(page).toHaveURL(/\/diaries\/[^/]+$/);
    await expect(page.getByRole("heading", { name: editedTitle })).toBeVisible();

    await page.getByRole("button", { name: "삭제" }).first().click();
    await expect(
      page.getByRole("heading", { name: "정말 삭제하시겠습니까?" })
    ).toBeVisible();
    await page.getByRole("button", { name: "삭제" }).last().click();

    await expect(page).toHaveURL(/\/diaries$/);
    await expect(page.getByRole("link", { name: new RegExp(editedTitle) })).toHaveCount(
      0,
      { timeout: 10_000 }
    );

    await page.getByRole("button", { name: "로그아웃" }).click();
    await expect(page).toHaveURL(/\/login$/, { timeout: 15_000 });
  });
});
