import { Page } from '@playwright/test';

export const fillLoginForm = async (page: Page, email: string, password: string) => {
  await page.getByTestId('email-input').fill(email);
  await page.getByTestId('password-input').fill(password);
};

export const generateTestEmail = () => `test${Date.now()}@example.com`;