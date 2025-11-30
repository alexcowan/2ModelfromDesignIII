/**
 * @File: tests/filter.spec.js
 * @Why: System test for parts filtering by manufacturer
 * @Does: Tests that filtering for 'Acme' manufacturer only displays Acme parts
 */

const { test, expect } = require('@playwright/test');

test.describe('Parts Filtering', () => {
  test('should filter parts to show only Acme manufacturer when Acme is selected and Go is pressed', async ({ page }) => {
    // Given: User has arrived at the baseline state of the 'Parts' page with no filter applied
    await page.goto('/index.html');
    
    // Wait for parts to load from Firebase
    await page.waitForSelector('.catalog-part', { timeout: 10000 });
    
    // Get all parts in baseline state
    const allParts = page.locator('.catalog-part');
    const partCount = await allParts.count();
    
    // Verify we have parts loaded
    expect(partCount).toBeGreaterThan(0);
    
    // Verify baseline: all parts should be visible (display not set to 'none')
    for (let i = 0; i < partCount; i++) {
      const part = allParts.nth(i);
      const display = await part.evaluate(el => window.getComputedStyle(el).display);
      expect(display).not.toBe('none');
    }
    
    // When: They filter for 'Acme' and press the 'Go' button
    await page.locator('#ddMfr').selectOption('Acme');
    await page.locator('#go-btn').click();
    
    // Wait a moment for the filter to apply
    await page.waitForTimeout(500);
    
    // Then: Only parts with 'Manufacturer' as 'Acme' display
    for (let i = 0; i < partCount; i++) {
      const part = allParts.nth(i);
      const manufacturer = await part.getAttribute('mfr');
      const display = await part.evaluate(el => window.getComputedStyle(el).display);
      
      if (manufacturer === 'Acme') {
        // Acme parts should be visible
        expect(display).not.toBe('none');
      } else {
        // Non-Acme parts should be hidden
        expect(display).toBe('none');
      }
    }
  });
});

