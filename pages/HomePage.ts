import { test, expect, Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    private readonly success_Register: Locator;
    readonly accountOverview_Heading: Locator;
    private readonly logout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.success_Register = page.getByText('Your account was created successfully. You are now logged in.');
        this.accountOverview_Heading = page.getByRole('link', { name: 'Accounts Overview' });
        this.logout = page.getByRole('link', { name: 'Log Out' })
    }

    async goto() {
        await this.page.goto('');
    }

    async expectRegistrationSuccess(): Promise<void> {
        await expect(
            this.page.getByText('Your account was created successfully. You are now logged in.')
        ).toBeVisible();
        console.log(await this.success_Register.textContent());
    }
    async click_AccountOverview() {
        await expect(this.accountOverview_Heading).toBeVisible();
        await this.accountOverview_Heading.click();
    }
    async logOut() {
        if (await this.logout.isVisible()) {
            await this.logout.click()
        }
        else console.log('Log Out button not Visble');
    }
}