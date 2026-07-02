import { test as base, expect } from '@playwright/test';
import { AccountSettingPage } from '../pages/AccountSettingPage';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  loginPage: LoginPage;
  accountPage: AccountSettingPage;
};

export const test = base.extend<MyFixtures>({

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  accountPage: async ({ page }, use) => {
    const accountPage = new AccountSettingPage(page);
    await use(accountPage);
  },

});

export { expect };