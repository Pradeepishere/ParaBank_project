import { expect, type Locator, type Page } from '@playwright/test';
import { BillPayDetails } from '../resources/test_data/data';



export class BillPayPage {
  private readonly payeeNameInput: Locator;
  private readonly addressInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly phoneNumberInput: Locator;
  private readonly accountNumberInput: Locator;
  private readonly verifyAccountInput: Locator;
  private readonly amountInput: Locator;
  private readonly fromAccountSelect: Locator;
  private readonly sendPaymentButton: Locator;
  private readonly paymentComplete_msg: Locator;
  private readonly paymentResult: Locator;

  constructor(private readonly page: Page) {
    this.payeeNameInput = page.locator('input[name="payee.name"]');
    this.addressInput = page.locator('input[name="payee.address.street"]');
    this.cityInput = page.locator('input[name="payee.address.city"]');
    this.stateInput = page.locator('input[name="payee.address.state"]');
    this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]');
    this.phoneNumberInput = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumberInput = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    this.paymentComplete_msg = page.getByRole('heading', { name: 'Bill Payment Complete' });
    this.paymentResult = page.locator('#billpayResult');
  }

  async sendPayment(data: BillPayDetails, amount: number, fromAccountId: string,) {
    await this.page.goto('billpay.htm');
    await expect(this.page.getByRole('heading', { name: 'Bill Pay' })).toBeVisible();
    await this.payeeNameInput.fill(data.payeeName);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.zipCodeInput.fill(data.zipCode);
    await this.phoneNumberInput.fill(data.phoneNumber);
    await this.accountNumberInput.fill(data.accountNumber);
    await this.verifyAccountInput.fill(data.accountNumber);
    await this.amountInput.fill(String(amount));
    await this.fromAccountSelect.selectOption(fromAccountId);
    await this.sendPaymentButton.click();

    await expect(this.paymentComplete_msg).toBeVisible();
    const amount_transfered = await this.page.locator('#amount').textContent()
    console.log(await this.paymentComplete_msg.textContent(), 'of : ', amount_transfered);
    await expect(this.paymentResult).toContainText(
      `Bill Payment to ${data.payeeName} in the amount of $${amount.toFixed(2)} from account ${fromAccountId} was successful.`,
    );
  }
}
