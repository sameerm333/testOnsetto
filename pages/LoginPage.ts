import dotenv from 'dotenv';
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

  readonly page: Page;

  // Login
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  // OTP
  readonly otpHeading: Locator;
  readonly otpInput: Locator;
  readonly verifyButton: Locator;

  // Logged-in page
  readonly marketplaceHeading: Locator;

  constructor(page: Page) {

    this.page = page;

    // -----------------------
    // Login Page
    // -----------------------

    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');

    this.signInButton = page.getByRole('button', {
      name: 'Sign in'
    });

    // -----------------------
    // OTP Screen
    // -----------------------

    this.otpHeading = page.getByRole('heading', {
      name: 'Verify your identity'
    });

    this.otpInput = page.locator(
      'input[autocomplete="one-time-code"]'
    );

    this.verifyButton = page.getByRole('button', {
      name: 'Verify'
    });

    // -----------------------
    // Marketplace
    // -----------------------

    this.marketplaceHeading = page.getByRole('heading', {
      name: 'Marketplace'
    });
  }

  // ====================================
  // Navigation
  // ====================================

  async navigate() {

    await this.page.goto(`${process.env.BASE_URL}/login`);

    await expect(this.emailInput).toBeVisible();
  }

  // ====================================
  // Login
  // ====================================

  async enterEmail(email: string) {

    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {

    await this.passwordInput.fill(password);
  }

  async clickSignIn() {

    await this.signInButton.click();
  }

  // ====================================
  // OTP
  // ====================================

  async waitForOTPPage() {

    await expect(this.otpHeading).toBeVisible();
  }

  async enterOTP(otp: string) {

    await this.otpInput.fill(otp);
  }

  async clickVerify() {

    await this.verifyButton.click();
  }

  // ====================================
  // Complete Login
  // ====================================

  async loginUser(
    email: string,
    password: string,
    otp: string
  ) {

    await this.navigate();

    await this.enterEmail(email);

    await this.enterPassword(password);

    await this.clickSignIn();

    // Same URL, OTP screen appears
    await this.waitForOTPPage();

    await this.enterOTP(otp);

    await this.clickVerify();

    // Login complete
    await expect(this.marketplaceHeading).toBeVisible();

    await expect(this.page).toHaveURL(/\/app\/marketplace/);
  }

  // ====================================
  // Verification
  // ====================================

  async verifyLoginSuccessful() {

    await expect(this.marketplaceHeading).toBeVisible();

    await expect(this.page).toHaveURL(/\/app\/marketplace/);
  }

}