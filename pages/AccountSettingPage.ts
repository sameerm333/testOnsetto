

import { Page, Locator, expect } from '@playwright/test';

export class AccountSettingPage {

  readonly page: Page;

  // Navigation
  readonly accountLink: Locator;

  // -----------------------------
  // Bank Details
  // -----------------------------
  readonly routingInput: Locator;
  readonly accountInput: Locator;
  readonly saveBankButton: Locator;

  readonly bankSuccessMessage: Locator;
  readonly savedBankInfo: Locator;

  readonly routingError: Locator;
  readonly accountError: Locator;

  // -----------------------------
  // Card Details
  // -----------------------------
  readonly cardHolderInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly cvcInput: Locator;
  readonly saveCardButton: Locator;

  readonly savedCardInfo: Locator;

  constructor(page: Page) {

    this.page = page;

    // -----------------------------
    // Navigation
    // -----------------------------

    this.accountLink = page.getByRole('link', {
      name: 'Account'
    });

    // -----------------------------
    // Bank
    // -----------------------------

    this.routingInput = page.getByTestId('bank-routing');

    this.accountInput = page.getByTestId('bank-account');

    this.saveBankButton = page.getByTestId('bank-save');

    this.savedBankInfo = page.getByTestId('bank-saved-info');

    this.bankSuccessMessage = page.getByText(
      'Banking details saved'
    );

    this.routingError = page.getByText(
      'Routing number must be exactly 9 digits'
    );

    this.accountError = page.getByText(
      'Account number must be 4 to 17 digits'
    );

    // -----------------------------
    // Card
    // -----------------------------

    this.cardHolderInput = page.getByTestId('card-holder');

    this.cardNumberInput = page.getByTestId('card-number');

    this.expiryMonthInput = page.getByTestId('card-exp-month');

    this.expiryYearInput = page.getByTestId('card-exp-year');

    this.cvcInput = page.getByTestId('card-cvc');

    this.saveCardButton = page.getByTestId('card-save');

    this.savedCardInfo = page.getByTestId('payment-saved-info');
  }

  // ==================================================
  // Navigation
  // ==================================================

  async navigate() {

    // Login already completed in beforeEach()

    await this.accountLink.click();

    await expect(this.page).toHaveURL(/\/app\/account/);
  }

  // ==================================================
  // Bank
  // ==================================================

  async enterBankDetails(
    routingNumber: string,
    accountNumber: string
  ) {

    await this.routingInput.clear();
    await this.routingInput.fill(routingNumber);

    await this.accountInput.clear();
    await this.accountInput.fill(accountNumber);
  }

  async saveBankDetails() {

    await this.saveBankButton.click();
  }

  async verifyBankSaved() {

    await expect(this.bankSuccessMessage).toBeVisible();
  }

  async verifyMaskedBankDetails(
    routingLast4: string,
    accountLast4: string
  ) {

    await expect(this.savedBankInfo).toContainText(routingLast4);

    await expect(this.savedBankInfo).toContainText(accountLast4);
  }

  // ==================================================
  // Card
  // ==================================================

  async enterCardDetails(
    holder: string,
    number: string,
    month: string,
    year: string,
    cvc: string
  ) {

    await this.cardHolderInput.fill(holder);

    await this.cardNumberInput.fill(number);

    await this.expiryMonthInput.fill(month);

    await this.expiryYearInput.fill(year);

    await this.cvcInput.fill(cvc);
  }

  async saveCardDetails() {

    await this.saveCardButton.click();
  }

  async verifyMaskedCardDetails(
    last4: string,
    month: string,
    year: string
  ) {

    await expect(this.savedCardInfo).toContainText(last4);

    await expect(this.savedCardInfo).toContainText(
      `${month}/${year}`
    );
  }

  // ==================================================
  // Validation
  // ==================================================

  async verifyRoutingError() {

    await expect(this.routingError).toBeVisible();
  }

  async verifyAccountError() {

    await expect(this.accountError).toBeVisible();
  }

}