import { expect, type Locator, type Page } from '@playwright/test';
import { RegistrationDetails, update_Profile } from '../resources/test_data/data';


export class UpdateProfilePage {
  private readonly profileHeading: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly addressInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly phoneNumberInput: Locator;
  private readonly updateProfileButton: Locator;

  constructor(private readonly page: Page) {
    this.profileHeading = page.getByRole('heading', { name: 'Update Profile' });
    this.firstNameInput = page.locator('#customer\\.firstName');
    this.lastNameInput = page.locator('#customer\\.lastName');
    this.addressInput = page.locator('#customer\\.address\\.street');
    this.cityInput = page.locator('#customer\\.address\\.city');
    this.stateInput = page.locator('#customer\\.address\\.state');
    this.zipCodeInput = page.locator('#customer\\.address\\.zipCode');
    this.phoneNumberInput = page.locator('#customer\\.phoneNumber');
    this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });
  }

  async updateProfile(profile: update_Profile, details: RegistrationDetails): Promise<void> {
    await this.page.goto('updateprofile.htm');
    await expect(this.profileHeading).toBeVisible();
    await expect(this.firstNameInput).toHaveValue(details.firstName)

    await this.fil_UpdateForm(profile);

    await expect(this.updateProfileButton).toBeVisible()
    await this.click_UpdateProfileButton()

    await this.page.reload()
    await expect(this.profileHeading).toBeVisible();
    await this.expect_FieldsToHaveValues(profile)
  }

  async fil_UpdateForm(profile: update_Profile) {
    await this.firstNameInput.fill(profile.firstName);
    await this.lastNameInput.fill(profile.lastName);
    await this.addressInput.fill(profile.address);
    await this.cityInput.fill(profile.city);
    await this.stateInput.fill(profile.state);
    await this.zipCodeInput.fill(profile.zipCode);
    await this.phoneNumberInput.fill(profile.phoneNumber);
  }

  async click_UpdateProfileButton() {
    await this.updateProfileButton.click();
  }

  async expect_FieldsToHaveValues(profile: update_Profile) {
    await expect(this.firstNameInput).toHaveValue(profile.firstName);
    await expect(this.lastNameInput).toHaveValue(profile.lastName);
    await expect(this.addressInput).toHaveValue(profile.address);
    await expect(this.cityInput).toHaveValue(profile.city);
    await expect(this.stateInput).toHaveValue(profile.state);
    await expect(this.zipCodeInput).toHaveValue(profile.zipCode);
    await expect(this.phoneNumberInput).toHaveValue(profile.phoneNumber);
  }
}
