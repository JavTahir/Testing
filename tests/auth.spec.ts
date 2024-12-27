import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Welcome")).toBeVisible();
  });

  test("navigation links exist", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("login-link")).toBeVisible();
    await expect(page.getByTestId("register-link")).toBeVisible();
  });

  test("navigate to login page", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("login-link").click();
    await expect(page.getByTestId("auth-form")).toBeVisible();
  });

  test("navigate to register page", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("register-link").click();
    await expect(page.getByTestId("auth-form")).toBeVisible();
  });

  test("login form validation", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("submit-button").click();
    const emailInput = page.getByTestId("email-input");
    await expect(emailInput).toHaveAttribute("required", "");
  });

  test("register form validation", async ({ page }) => {
    await page.goto("/register");
    await page.getByTestId("submit-button").click();
    const emailInput = page.getByTestId("email-input");
    await expect(emailInput).toHaveAttribute("required", "");
  });

  test("invalid email format", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("email-input").fill("invalid-email");
    await page.getByTestId("email-input").blur();
    await page.getByTestId("submit-button").click();

    await page.waitForSelector('[aria-invalid="true"]');

    await expect(page.getByTestId("email-input")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  test("login with invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("email-input").fill("test@example.com");
    await page.getByTestId("password-input").fill("wrongpassword");
    await page.getByTestId("submit-button").click();
    await expect(page.getByText("Invalid login credentials")).toBeVisible();
  });

  test("register new user", async ({ page }) => {
    await page.goto("/register");
    const testEmail = `test${Date.now()}@example.com`;
    await page.getByTestId("email-input").fill(testEmail);
    await page.getByTestId("password-input").fill("Test123!");
    await page.getByTestId("submit-button").click();
    await expect(page.getByText("Registration successful!")).toBeVisible();
  });

  test("password minimum length", async ({ page }) => {
    await page.goto("/register");
    await page.getByTestId("email-input").fill("test@example.com");
    await page.getByTestId("password-input").fill("123");
    await page.getByTestId("password-input").blur(); // Add blur event
    await page.getByTestId("submit-button").click();
    await page.waitForSelector('[data-testid="password-error"]'); // Wait for error
    // await expect(page.getByText(/password.*too short/i)).toBeVisible();
  });
});
