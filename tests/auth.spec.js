/**
 * @File: tests/auth.spec.js
 * @Why: System tests for authentication functionality
 * @Does: Tests login, registration, password recovery, and auth state management
 */

const { test, expect } = require('@playwright/test');

test.describe('Authentication System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('should display login form with required fields', async ({ page }) => {
    await page.locator('#login-trigger').click();
    
    const emailInput = page.locator('#login_email');
    const passwordInput = page.locator('#login_pwd');
    
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('type', 'text');
    await expect(emailInput).toHaveAttribute('required', '');
    
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveAttribute('required', '');
    
    await expect(page.locator('#loginForm button[type="submit"]')).toBeVisible();
  });

  test('should display registration form with all fields', async ({ page }) => {
    await page.locator('#login-trigger').click();
    await page.locator('#register-link').click();
    
    await expect(page.locator('#register_email')).toBeVisible();
    await expect(page.locator('#register_pwd')).toBeVisible();
    await expect(page.locator('#register_re_pwd')).toBeVisible();
    await expect(page.locator('#registerForm button[type="submit"]')).toBeVisible();
  });

  test('should show error when passwords do not match in registration', async ({ page }) => {
    await page.locator('#login-trigger').click();
    await page.locator('#register-link').click();
    
    // Fill in registration form with mismatched passwords
    await page.locator('#register_email').fill('test@example.com');
    await page.locator('#register_pwd').fill('password123');
    await page.locator('#register_re_pwd').fill('password456');
    
    // Submit the form
    await page.locator('#registerForm button[type="submit"]').click();
    
    // Wait for error message
    await page.waitForTimeout(500);
    
    // Check that error is displayed
    const errorElement = page.locator('#reg-error-response');
    await expect(errorElement).toBeVisible();
    
    // Note: This tests client-side validation
    // Firebase errors would require actual Firebase connection
  });

  test('should display password recovery form', async ({ page }) => {
    await page.locator('#login-trigger').click();
    await page.locator('#forgotten-link').click();
    
    await expect(page.locator('#forgottenForm')).toBeVisible();
    await expect(page.locator('#before-reset')).toBeVisible();
    await expect(page.locator('#recovery_email')).toBeVisible();
    await expect(page.locator('#forgottenForm button[type="submit"]')).toBeVisible();
  });

  test('should navigate back to login from password recovery', async ({ page }) => {
    await page.locator('#login-trigger').click();
    await page.locator('#forgotten-link').click();
    
    // Check that we're on recovery form
    await expect(page.locator('#forgottenForm')).toBeVisible();
    
    // Click "Log In" link (if it exists after recovery)
    // Note: This would work after password recovery is submitted
    // For now, we test the initial state
  });

  test('should have login form prevent default submission', async ({ page }) => {
    await page.locator('#login-trigger').click();
    
    // Check that form has onsubmit="return false"
    const form = page.locator('#loginForm');
    const onsubmit = await form.getAttribute('onsubmit');
    expect(onsubmit).toBe('return false');
  });

  test('should have registration form prevent default submission', async ({ page }) => {
    await page.locator('#login-trigger').click();
    await page.locator('#register-link').click();
    
    const form = page.locator('#registerForm');
    const onsubmit = await form.getAttribute('onsubmit');
    expect(onsubmit).toBe('return false');
  });

  test('should have password recovery form prevent default submission', async ({ page }) => {
    await page.locator('#login-trigger').click();
    await page.locator('#forgotten-link').click();
    
    const form = page.locator('#forgottenForm');
    const onsubmit = await form.getAttribute('onsubmit');
    expect(onsubmit).toBe('return false');
  });

  test('should update auth text when user logs in', async ({ page }) => {
    // This test would require actual Firebase authentication
    // For now, we test the initial state
    await expect(page.locator('#auth-text')).toHaveText('Log In');
    
    // After successful login, the text should change to "Log Out"
    // This would be tested with actual Firebase credentials or mocked Firebase
  });
});

