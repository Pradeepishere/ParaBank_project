import { expect, type Locator, type Page } from '@playwright/test';

export class TransferFundsPage {
  private readonly transfer_Heading: Locator;
  private readonly amount: Locator;
  private readonly from_Account: Locator;
  private readonly to_Account: Locator;
  private readonly transfer_btn: Locator;
  private readonly transfer_Complete_msg: Locator;
  private readonly transferResult: Locator;
  private readonly Transfered_amount: Locator;

  constructor(private readonly page: Page) {
    this.transfer_Heading = page.getByRole('heading', { name: 'Transfer Funds' });
    this.amount = page.locator('#amount');
    this.from_Account = page.locator('#fromAccountId');
    this.to_Account = page.locator('#toAccountId');
    this.transfer_btn = page.getByRole('button', { name: 'Transfer' });
    this.transfer_Complete_msg = page.getByRole('heading', { name: 'Transfer Complete!' });
    this.transferResult = page.locator('#showResult');
    this.Transfered_amount = page.locator('#amountResult')
  }

  async transferFunds(amount: number, fromAccountId: string, toAccountId: string): Promise<void> {
    await this.page.goto('transfer.htm');
    await expect(this.transfer_Heading).toBeVisible();
    await this.amount.fill(String(amount));
    await this.from_Account.selectOption(fromAccountId);
    await this.to_Account.selectOption(toAccountId);
    await this.transfer_btn.click();

    await expect(this.transfer_Complete_msg).toBeVisible();
    await expect(this.transferResult).toContainText(`$${amount.toFixed(2)} has been transferred`);
    await expect(this.transferResult).toContainText(`from account #${fromAccountId}`);
    await expect(this.transferResult).toContainText(`to account #${toAccountId}`);
    const amount_Transfered = await this.Transfered_amount.textContent();
    await expect(amount).toBe(Number(amount_Transfered?.replace('$', '').replace('.00', '').trim()));
    console.log('Amount Transferred : ', amount_Transfered);
    // console.log('Amount Transferred : ', amount_Transfered, amount_Transfered?.replace('$', '').replace('.00', '').trim());

  }
}
