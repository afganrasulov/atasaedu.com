import { test, expect } from '@playwright/test';

test('ana sayfa başarıyla yüklenmeli', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/./);
});

test('ana sayfada görsel öğeler bulunmalı', async ({ page }) => {
    await page.goto('/');
    const body = page.locator('body');
    await expect(body).toBeVisible();
});
