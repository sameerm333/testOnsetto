import dotenv from 'dotenv';

import { test } from '../fixtures/test-fixture';

test.describe('Account Settings', () => {

  test.beforeEach(async ({ loginPage, accountPage }) => {

    // Login
    await loginPage.loginUser(
       process.env.USER_EMAIL!,
    process.env.USER_PASSWORD!,
    process.env.USER_OTP!
    );

    // Navigate to Account page
    await accountPage.navigate();
  });

  test('Update bank and payment details (Happy Path)', async ({ accountPage }) => {

    // -------------------------
    // Bank Details
    // -------------------------
    await accountPage.enterBankDetails(
      '123456789',
      '1234567890'
    );

    await accountPage.saveBankDetails();

    await accountPage.verifyBankSaved();

    await accountPage.verifyMaskedBankDetails(
      '6789',
      '7890'
    );

    // -------------------------
    // Card Details
    // -------------------------
    await accountPage.enterCardDetails(
      'John Smith',
      '4242424242424242',
      '12',
      '2028',
      '123'
    );

    await accountPage.saveCardDetails();

    await accountPage.verifyMaskedCardDetails(
      '4242',
      '12',
      '2028'
    );
  });

  test('Should display validation message for invalid routing number', async ({ accountPage }) => {

    await accountPage.enterBankDetails(
      '12345',          // Invalid routing number
      '1234567890'
    );

    await accountPage.saveBankDetails();

    await accountPage.verifyRoutingError();
  });

  test('Should display validation message for invalid account number', async ({ accountPage }) => {

    await accountPage.enterBankDetails(
      '123456789',
      '12'              // Invalid account number
    );

    await accountPage.saveBankDetails();

    await accountPage.verifyAccountError();
  });

});