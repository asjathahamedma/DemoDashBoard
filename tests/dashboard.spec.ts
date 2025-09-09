import { test, expect } from "@playwright/test";

test.describe("Borrower workflow", () => {
  test("pipeline tab switching", async ({ page }) => {
    await page.goto("/");

    // Switch to In Review tab
    await page.getByRole("tab", { name: "In Review" }).click();

    // Expect at least one borrower card to be visible
    await expect(page.getByTestId("borrower-card").first()).toBeVisible();
  });

  test("select borrower shows details", async ({ page }) => {
    await page.goto("/");

    // Click first borrower card
    const firstBorrower = page.getByTestId("borrower-card").first();
    await firstBorrower.click();

    // Detail card should be visible
    const detailCard = page.getByTestId("card-borrower-detail");
    await expect(detailCard).toBeVisible();

    // Name should be visible (dynamic)
    const borrowerName = await firstBorrower.locator("div.font-medium").textContent();
    await expect(detailCard.locator("[data-testid='borrower-name']")).toContainText(borrowerName || "");
  });

  test("AI explainability accordion expands", async ({ page }) => {
    await page.goto("/");

    // Click first borrower card
    const firstBorrower = page.getByTestId("borrower-card").first();
    await firstBorrower.click();

    const aiTrigger = page.getByTestId("ai-explainability-trigger");
    if (await aiTrigger.count() > 0) {
      await aiTrigger.click();
      const aiFlags = page.getByTestId("card-borrower-detail").locator('[data-testid^="ai-flag"]');
      await expect(aiFlags.first()).toBeVisible();
    }
  });

  test("button actions work", async ({ page }) => {
    await page.goto("/");

    // Click first borrower card
    await page.getByTestId("borrower-card").first().click();

    await page.getByRole("button", { name: "Approve" }).click();
    await page.getByRole("button", { name: "Send to Valuer" }).click();
    await page.getByRole("button", { name: "Request Documents" }).click();
  });
});
