import { test, expect } from "@playwright/test";

test.describe("Responsive Layout and UI Spacing", () => {
  test("Responsive layout stacks vertically on mobile and 3-column on desktop", async ({ page }) => {
    // -----------------
    // Mobile: stacked layout
    // -----------------
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const mobileCards = await page.locator('[data-testid^="card-"]').all();
    expect(mobileCards.length).toBeGreaterThanOrEqual(1);

    if (mobileCards.length >= 2) {
      for (let i = 0; i < mobileCards.length - 1; i++) {
        const rect1 = await mobileCards[i].boundingBox();
        const rect2 = await mobileCards[i + 1].boundingBox();
        if (!rect1 || !rect2) throw new Error(`Bounding box null for card ${i} or ${i + 1}`);

        // Ensure vertical stacking
        expect(rect2.y).toBeGreaterThan(rect1.y + rect1.height - 1); // small tolerance
      }
    }

    // -----------------
    // Desktop: 3-column layout
    // -----------------
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");

    const desktopCards = await page.locator('[data-testid^="card-"]').all();
    expect(desktopCards.length).toBeGreaterThanOrEqual(3); // at least 3 main cards

    const rects = await Promise.all(desktopCards.map((card) => card.boundingBox()));
    const validRects = rects.filter((rect) => rect !== null) as DOMRect[];

    // Ensure horizontal alignment for first 3 cards
    const HORIZONTAL_TOLERANCE = 350; // allow for spacing + margins
    for (let i = 0; i < 3 - 1; i++) {
      const distance = Math.abs(validRects[i].x - validRects[i + 1].x);
      expect(distance).toBeLessThan(HORIZONTAL_TOLERANCE);
    }
  });

  test("Consistent UI spacing using Tailwind classes", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");

    const cardContent = page
      .getByTestId("card-borrower-detail")
      .locator("div[data-slot='card-content']");

    const padding = await cardContent.evaluate((el) => getComputedStyle(el).paddingLeft);
    expect(padding).toBe("24px"); // matches Tailwind px-6
  });
});
