import { expect, type Locator, type Page } from '@playwright/test';

export type AccountType = 'CHECKING' | 'SAVINGS';

export class NewAccountPage {
  private readonly accounts_Overview: Locator;
  private readonly account_Rows: Locator;
  private readonly openNewAccount_Link: Locator;
  private readonly newAccount_msg: Locator;
  private readonly accountType_Select: Locator;
  private readonly fundingAccount_Select: Locator;
  private readonly openAccount_btn: Locator;
  private readonly accOpened_Success_msg: Locator;
  private readonly newAccount_ID: Locator;

  constructor(private readonly page: Page) {
    this.openNewAccount_Link = page.getByRole('link', { name: 'Open New Account' });
    this.newAccount_msg = page.locator('div[id = "openAccountForm"] h1[class= "title"]')
    this.accountType_Select = page.locator('#type');
    this.fundingAccount_Select = page.locator('#fromAccountId');
    this.openAccount_btn = page.getByRole('button', { name: 'Open New Account' });
    this.accOpened_Success_msg = page.getByText('Congratulations, your account is now open.');
    this.newAccount_ID = page.locator('#newAccountId');

    this.accounts_Overview = page.getByRole('heading', { name: 'Accounts Overview' });
    this.account_Rows = page.locator('#accountTable tbody tr');
  }

  async openAccount_get_NewAccountID(accountType: AccountType, fundingAccountId: string): Promise<string> {
    await this.openNewAccount_Link.click();
    await expect(this.newAccount_msg).toBeVisible()
    await this.accountType_Select.selectOption({ label: accountType });
    await this.fundingAccount_Select.selectOption(fundingAccountId);
    await this.openAccount_btn.click();

    await expect(this.accOpened_Success_msg).toBeVisible();
    await expect(this.newAccount_ID).toBeVisible();
    await this.accOpened_Success_msg.waitFor({ state: 'visible' });
    const accountNumber = (await this.newAccount_ID.innerText()).trim();
    return accountNumber;
  }

  async findFundingAccount_WithBalance() {
    await expect(this.accounts_Overview).toBeVisible();

    const first_row = this.account_Rows.first()
    const cells = first_row.locator('td');  // find all data cells in current row
    const cell_Count = await cells.count();  // how many <td> elements exist in the current row
    const balance_Text = (await cells.nth(cell_Count - 1).innerText()).trim();  // Get the last cell's text
    const balance = Number(balance_Text.replace(/[$,\s]/g, ''));   // Remove $ and commas, then convert to number
    console.log('Available Balance in first row : ', balance);

    let accID: string;

    if (Number.isFinite(balance)) {   // Checks whether balance is a valid finite number
      accID = (await cells.first().locator('a').innerText()).trim();
      console.log('Funding Account ID with balance : ', accID, ' , ', typeof (accID));
      return accID;    // get Account ID
    }
    else
      throw new Error(`The funding account has an invalid balance: "${balance_Text}".`);


    // for (const row of await this.account_Rows.all())  // 3 rows , select 1 row at time
    // {
    //   const cells = row.locator('td');  // find all data cells in current row
    //   const cellCount = await cells.count();  // how many <td> elements exist in the current row
    //   if (cellCount < 2) {  // as we know row contains 3 data cells
    //     continue;   // skip this row if it doesn't have enough cells
    //   }   // as at last Row , there is 1 cell only : total Balance , so we can skip that row

    //   const balance_Text = (await cells.nth(cellCount - 1).innerText()).trim();  // Get the last cell's text
    //   const balance = Number(balance_Text.replace(/[$,\s]/g, ''));   // Remove $ and commas, then convert to number
    //   if (Number.isFinite(balance) && balance === amount) {
    //     return (await cells.first().locator('a').innerText()).trim();
    //   }
    // }
    //throw new Error(`No funding account with a balance of ${amount.toFixed(2)} was found.`);

  }


}
