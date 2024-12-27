import { test, expect } from "@playwright/test";
import { fillLoginForm } from "./utils/test-utils";

test.describe("Login", () => {
  test("login form validation", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("submit-button").click();
    const emailInput = page.getByTestId("email-input");
    await expect(emailInput).toHaveAttribute("required", "");
  });

  test("invalid email format", async ({ page }) => {
    await page.goto("/login");
    await fillLoginForm(page, "invalid-email", "password123");
    await page.getByTestId("submit-button").click();
    await expect(page.getByTestId("email-input")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  test("login with invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await fillLoginForm(page, "test@example.com", "wrongpassword");
    await page.getByTestId("submit-button").click();
    await expect(page.getByText("Invalid login credentials")).toBeVisible();
  });
});
