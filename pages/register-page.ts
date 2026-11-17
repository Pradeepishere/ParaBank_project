import { Locator, Page, expect } from '@playwright/test';
import { RegistrationDetails } from '../resources/fixtures/registration.fixture';


export class RegisterPage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly addressInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly phoneNumberInput: Locator;
  private readonly ssnInput: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly registerButton: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.locator('[id="customer.firstName"]');
    this.lastNameInput = page.locator('[id="customer.lastName"]');
    this.addressInput = page.locator('[id="customer.address.street"]');
    this.cityInput = page.locator('[id="customer.address.city"]');
    this.stateInput = page.locator('[id="customer.address.state"]');
    this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
    this.phoneNumberInput = page.locator('[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('[id="customer.ssn"]');
    this.usernameInput = page.locator('[id="customer.username"]');
    this.passwordInput = page.locator('[id="customer.password"]');
    this.confirmPasswordInput = page.locator('[id="repeatedPassword"]');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async register_goto() {
    await this.page.goto('register.htm');
  }

  async fillRegistrationForm(details: RegistrationDetails): Promise<void> {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.cityInput.fill(details.city);
    await this.stateInput.fill(details.state);
    await this.zipCodeInput.fill(details.zipCode);
    await this.phoneNumberInput.fill(details.phoneNumber);
    await this.ssnInput.fill(details.ssn);
    await this.usernameInput.fill(details.username);
    await this.passwordInput.fill(details.password);
    await this.confirmPasswordInput.fill(details.confirmPassword);
  }

  async submitRegistration(): Promise<void> {
    await this.registerButton.click();
  }

  async expect_inputValues(details: RegistrationDetails) {
    await expect(this.firstNameInput).toHaveValue(details.firstName);
    await expect(this.lastNameInput).toHaveValue(details.lastName);
    await expect(this.addressInput).toHaveValue(details.address);
    await expect(this.cityInput).toHaveValue(details.city);
    await expect(this.stateInput).toHaveValue(details.state);
    await expect(this.zipCodeInput).toHaveValue(details.zipCode);
    await expect(this.phoneNumberInput).toHaveValue(details.phoneNumber);
    await expect(this.ssnInput).toHaveValue(details.ssn);
    await expect(this.usernameInput).toHaveValue(details.username);
    await expect(this.passwordInput).toHaveValue(details.password);
    await expect(this.confirmPasswordInput).toHaveValue(details.confirmPassword);
  }
}