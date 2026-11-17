import { expect, type Page } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import registrationJson from './test_data/registration-data.json';
import { POManager } from '../pages/po-manager';
import type { RegistrationDetails } from './fixtures/registration.fixture';
import { LoginPage } from '../pages/login-page';
import { RegisterPage } from '../pages/register-page';

export class Utils {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async fillAndVerifyRegistration(details: RegistrationDetails, pom: POManager): Promise<void> {

        //  const poManager = new POManager(this.page);
        const loginPage = pom.getLoginPage();
        const registerPage = pom.getRegisterPage();
        const homepage = pom.getHomePage()
        await loginPage.goto();
        await loginPage.openRegistration();
        await expect(this.page.getByRole('heading', { name: 'Signing up is easy!' })).toBeVisible();
        await registerPage.fillRegistrationForm(details);

        console.log('UserName : ', details.username);

        await registerPage.expect_inputValues(details);
        await registerPage.submitRegistration();
        await homepage.expectRegistrationSuccess();
        // await this.page.waitForTimeout(5000);

        // console.log('current URL : ', await this.page.url());

    }

    async dynamic_userName(): Promise<RegistrationDetails> {
        return {
            ...registrationJson,
            username: `${registrationJson.username}_${randomUUID().replaceAll('-', '').slice(0, 10)}`,
        };
    }

    async logged_in(register_data: RegistrationDetails, loginPage: LoginPage, pom: POManager): Promise<void> {

        await this.fillAndVerifyRegistration(register_data, pom);
        await loginPage.goto();
        await loginPage.expect_in_loginPage();
        await loginPage.fillCredentials(register_data.username, register_data.password);
        await loginPage.login_btn();
        await this.page.waitForTimeout(5000);
        // await
        await expect(this.page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();

    }

}