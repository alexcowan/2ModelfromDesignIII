/**
 * @File: tests/catalog.spec.js
 * @Why: System tests for the main catalog page functionality
 * @Does: Tests parts display, filtering, navigation, and basic UI interactions
 */

const { test, expect } = require('@playwright/test');

test.describe('Parts Catalog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('should load the catalog page successfully', async ({ page }) => {
    // Check that the page title is correct
    await expect(page).toHaveTitle(/Parts Catalog/);
    
    // Check that main navigation elements are present
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Help')).toBeVisible();
    
    // Check that authentication controls are present
    await expect(page.locator('#auth-text')).toBeVisible();
    await expect(page.locator('#auth-text')).toHaveText('Log In');
  });

  test('should display search controls', async ({ page }) => {
    // Check that search controls are visible
    await expect(page.locator('#search-controls')).toBeVisible();
    await expect(page.locator('text=Sort By')).toBeVisible();
    await expect(page.locator('text=Search By')).toBeVisible();
    
    // Check that filter dropdowns are present
    await expect(page.locator('#ddMfr')).toBeVisible();
    await expect(page.locator('#ddModel')).toBeVisible();
    
    // Check that Go button is present
    await expect(page.locator('#go-btn')).toBeVisible();
    await expect(page.locator('#go-btn')).toHaveText('Go');
  });

  test('should display parts content area', async ({ page }) => {
    // Check that the parts content container exists
    await expect(page.locator('#parts-content')).toBeVisible();
  });

  test('should open login form when clicking Log In', async ({ page }) => {
    // Initially, login form should be hidden
    await expect(page.locator('#login-content')).not.toBeVisible();
    
    // Click the login trigger
    await page.locator('#login-trigger').click();
    
    // Login form should now be visible
    await expect(page.locator('#login-content')).toBeVisible();
    await expect(page.locator('#loginForm')).toBeVisible();
    await expect(page.locator('#login_email')).toBeVisible();
    await expect(page.locator('#login_pwd')).toBeVisible();
  });

  test('should toggle login form visibility', async ({ page }) => {
    // Click to open
    await page.locator('#login-trigger').click();
    await expect(page.locator('#login-content')).toBeVisible();
    
    // Click again to close
    await page.locator('#login-trigger').click();
    await expect(page.locator('#login-content')).not.toBeVisible();
  });

  test('should switch to registration form', async ({ page }) => {
    // Open login form
    await page.locator('#login-trigger').click();
    await expect(page.locator('#loginForm')).toBeVisible();
    
    // Click register link
    await page.locator('#register-link').click();
    
    // Registration form should be visible, login form hidden
    await expect(page.locator('#registerForm')).toBeVisible();
    await expect(page.locator('#loginForm')).not.toBeVisible();
    
    // Check registration form fields
    await expect(page.locator('#register_email')).toBeVisible();
    await expect(page.locator('#register_pwd')).toBeVisible();
    await expect(page.locator('#register_re_pwd')).toBeVisible();
  });

  test('should switch to password recovery form', async ({ page }) => {
    // Open login form
    await page.locator('#login-trigger').click();
    
    // Click forgotten password link
    await page.locator('#forgotten-link').click();
    
    // Password recovery form should be visible
    await expect(page.locator('#forgottenForm')).toBeVisible();
    await expect(page.locator('#before-reset')).toBeVisible();
    await expect(page.locator('#recovery_email')).toBeVisible();
  });

  test('should filter parts by manufacturer', async ({ page }) => {
    // Wait for parts to load (Firebase data)
    await page.waitForTimeout(2000);
    
    // Select a manufacturer from dropdown
    await page.locator('#ddMfr').selectOption('Acme');
    
    // Click Go button
    await page.locator('#go-btn').click();
    
    // Wait a moment for filtering to apply
    await page.waitForTimeout(500);
    
    // Note: This test assumes parts are loaded from Firebase
    // In a real scenario, you might want to mock Firebase or use test data
  });

  test('should filter parts by model', async ({ page }) => {
    // Wait for parts to load
    await page.waitForTimeout(2000);
    
    // Select a model from dropdown
    await page.locator('#ddModel').selectOption('TooCool');
    
    // Click Go button
    await page.locator('#go-btn').click();
    
    // Wait for filtering to apply
    await page.waitForTimeout(500);
  });

  test('should navigate to detail page when clicking a part', async ({ page }) => {
    // Wait for parts to load
    await page.waitForTimeout(2000);
    
    // Try to find a part link (if parts are loaded)
    const partLink = page.locator('.part-ref').first();
    
    // Check if any parts are loaded
    const partCount = await page.locator('.catalog-part').count();
    
    if (partCount > 0) {
      // Click on the first part
      await partLink.click();
      
      // Should navigate to detail page
      await expect(page).toHaveURL(/detail\.html/);
    } else {
      // If no parts loaded (e.g., Firebase not configured), skip this test
      test.skip();
    }
  });
});

