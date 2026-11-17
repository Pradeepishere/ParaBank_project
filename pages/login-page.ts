import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly registerLink: Locator;
  private readonly loginPageHeading: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.loginPageHeading = page.getByText('Customer Login');
  }

  async goto(): Promise<void> {
    await this.page.goto('index.htm');
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async login_btn(): Promise<void> {
    await this.loginButton.click();
  }

  async openRegistration(): Promise<void> {
    await this.registerLink.click();
    await expect(this.page).toHaveURL(/\/register\.htm(?:[;?]|$)/);
  }

  async expect_in_loginPage() {
    await expect(this.loginPageHeading).toBeVisible();
  }
}
