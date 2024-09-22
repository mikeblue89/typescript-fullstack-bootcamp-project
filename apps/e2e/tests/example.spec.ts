import { test, expect } from '@playwright/test';

test.describe('E2E testing homework 6', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Search Bar Test', async ({ page }) => {
    const searchQuery = 'slim';
    await page.fill('input[placeholder="Search products..."]', searchQuery);

    await page.waitForSelector('.grid');
    const firstProduct = await page.locator('.grid > a').first();
    await firstProduct.click();


    await expect(page).toHaveURL(/\/products\/\d+/);

    await expect(page.locator('h1')).toHaveText('Slim Fit T-Shirt');
    await expect(page.locator('p.text-xl.font-bold')).toBeVisible();
    await expect(page.locator('p.text-lg.mb-4')).toBeVisible();
  });


  test('Collection select test', async ({ page }) => {

    await page.selectOption('select', 'Electronics');
    await page.waitForSelector('.grid');
    const firstProduct = await page.locator('.grid > a').first();
    await firstProduct.click();
    await expect(page).toHaveURL(/\/products\/\d+/);

    await expect(page.locator('h1')).toHaveText('WD 2TB External Hard Drive');
    await expect(page.locator('p.text-xl.font-bold')).toBeVisible();
    await expect(page.locator('p.text-lg.mb-4')).toBeVisible();
  });


  test('Price select test', async ({ page }) => {
    await page.locator('.price').selectOption('price_asc');
    await page.waitForSelector('.grid');
    const firstProduct = await page.locator('.grid > a').first();
    await expect(firstProduct.locator('h2')).toHaveText('Slim Fit T-Shirt');
    await firstProduct.click();
    await expect(page).toHaveURL(/\/products\/\d+/);

    await expect(page.locator('h1')).toHaveText('Slim Fit T-Shirt');
    await expect(page.locator('p.text-xl.font-bold')).toBeVisible();
    await expect(page.locator('p.text-lg.mb-4')).toBeVisible();
  });


});
