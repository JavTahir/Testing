import { test, expect } from "@playwright/test";
import { fillLoginForm, generateTestEmail } from "./utils/test-utils";

test.describe("Registration", () => {
  test("register form validation", async ({ page }) => {
    await page.goto("/register");
    await page.getByTestId("submit-button").click();
    const emailInput = page.getByTestId("email-input");
    await expect(emailInput).toHaveAttribute("required", "");
    // await expect(emailInput).toHaveAttribute("aria-invalid", "true");
  });

  test("register new user", async ({ page }) => {
    await page.goto("/register");
    await fillLoginForm(page, generateTestEmail(), "Test123!");
    await page.getByTestId("submit-button").click();
    await expect(page.getByText("Registration successful!")).toBeVisible();
  });

  test("password minimum length", async ({ page }) => {
    await page.goto("/register");

    await page.getByTestId("email-input").fill("test@example.com");
    await page.getByTestId("password-input").fill("123");
    await page.getByTestId("password-input").blur();
    await page.getByTestId("submit-button").click();

    // Log page content for inspection
    console.log(await page.content());

    // Check if the error locator exists
    const errorLocator = page.locator('[data-testid="password-error"]');
    const isErrorVisible = await errorLocator.isVisible();
    console.log("Error locator visible:", isErrorVisible);

    if (!isErrorVisible) {
      console.warn("Password error message not found.");
    }

    await expect(errorLocator).toBeVisible({ timeout: 10000 });
  });
});
