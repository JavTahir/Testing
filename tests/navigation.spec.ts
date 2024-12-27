import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('navigation links exist', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('login-link')).toBeVisible();
    await expect(page.getByTestId('register-link')).toBeVisible();
  });

  test('navigate to login page', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('login-link').click();
    await expect(page.getByTestId('auth-form')).toBeVisible();
  });

  test('navigate to register page', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('register-link').click();
    await expect(page.getByTestId('auth-form')).toBeVisible();
  });
});