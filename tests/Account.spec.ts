import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { expect, test, type BrowserContext, type Page } from '@playwright/test';
import registrationData from '../resources/test_data/registration-data.json';
import { POManager } from '../pages/po-manager';
import type { AccountType } from '../pages/newAccountPage';
import { NewAccountPage } from '../pages/newAccountPage';
import { HomePage } from '../pages/HomePage';
import { Utils } from '../resources/utils';
import type { TransferFundsPage } from '../pages/TransferFundsPage';
import { billPay_Data, updating_Profile } from '../resources/test_data/data';
import { log } from 'node:console';

const accountDataPath = resolve(cwd(), 'resources', 'test_data', 'opened-accounts.json');
const account_Types: AccountType[] = ['CHECKING', 'SAVINGS'];

test.describe('New Account Tests', () => {
  test.describe.configure({ mode: 'serial' });

  let context: BrowserContext;
  let page: Page;
  let funding_Account_Id: string;
  let pom: POManager;
  let utils: Utils;
  let homepage: HomePage;
  let newAccountPage: NewAccountPage;
  let register_data: typeof registrationData;
  const opened_Accounts: Partial<Record<Lowercase<AccountType>, string>> = {};

  test.beforeAll(async ({ browser }, testInfo) => {
    const baseURL = testInfo.project.use.baseURL;
    if (typeof baseURL !== 'string') {
      throw new Error('A string baseURL must be configured in playwright.config.ts.');
    }
    context = await browser.newContext({ baseURL });
    page = await context.newPage();
    pom = new POManager(page);
    utils = pom.getUtils();
    homepage = pom.getHomePage();
    newAccountPage = pom.getNewAccountPage();
    register_data = await pom.getUtils().dynamic_userName();
  });

  test.afterAll(async () => {
    await homepage.logOut()
    await page.waitForTimeout(1000)
    console.log('Logged out SuccesFully');
    await context.close();
  });

  test('opens checking and savings accounts using the funding account', async () => {
    await utils.fillAndVerifyRegistration(register_data, pom);

    await homepage.click_AccountOverview();
    funding_Account_Id = await newAccountPage.findFundingAccount_WithBalance();

    for (const account_type of account_Types) {
      opened_Accounts[account_type.toLowerCase() as Lowercase<AccountType>] =
        await newAccountPage.openAccount_get_NewAccountID(account_type, funding_Account_Id);
    }

    expect(opened_Accounts.checking).toBeDefined();
    expect(opened_Accounts.savings).toBeDefined();
    expect(opened_Accounts.checking).not.toBe(opened_Accounts.savings);

    await writeFile(
      accountDataPath,
      `${JSON.stringify({ fundingAccountId: funding_Account_Id, ...opened_Accounts }, null, 2)}\n`,
      'utf8',
    );
    console.log('----------------------------');

  });

  test('transfers $100 from the funding account to savings', async () => {
    const savingsAccountId = opened_Accounts.savings;
    if (!funding_Account_Id || !savingsAccountId) {
      throw new Error('The account-opening test must complete before transferring funds.');
    }

    const transferFundsPage: TransferFundsPage = pom.getTransferFundsPage();
    await transferFundsPage.transferFunds(100, funding_Account_Id, savingsAccountId);
    console.log('----------------------------');
  });

  test('pays a $30 bill from the savings account', async () => {
    const savings_AccountId = opened_Accounts.savings;
    if (!savings_AccountId) {
      throw new Error('The account-opening test must complete before paying a bill.');
    }
    await pom.getBillPayPage().sendPayment(billPay_Data, 30, savings_AccountId,);
    console.log('----------------------------');
  });

  test('updates the customer profile using the configured profile data', async () => {
    const updatePage = pom.getUpdateProfilePage();

    await updatePage.updateProfile(updating_Profile, register_data);
    console.log('Update Profile test completed successfully');
    console.log('----------------------------');

  });


});