import { test as base } from '@playwright/test';
import { LoginPage } from './login.page';

type baseFixture = {
    loginPage: LoginPage;
};

export const test = base.extend<baseFixture>({
    loginPage: async ({ page }, use) => {
        new LoginPage(page);
        await use(new LoginPage(page));
    },
});