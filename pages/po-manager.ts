import type { Page } from '@playwright/test';
import { LoginPage } from './login-page';
import { NewAccountPage } from './newAccountPage';
import { RegisterPage } from './register-page';
import { Utils } from '../resources/utils';
import { HomePage } from './HomePage';
import { TransferFundsPage } from './TransferFundsPage';
import { BillPayPage } from './BillPayPage';
import { UpdateProfilePage } from './UpdateProfilePage';

export class POManager {
  private readonly loginPage: LoginPage;
  private readonly newAccountPage: NewAccountPage;
  private readonly registerPage: RegisterPage;
  private readonly utils: Utils;
  private readonly homepage: HomePage;
  private readonly transferFundsPage: TransferFundsPage;
  private readonly billPayPage: BillPayPage;
  private readonly updateProfilePage: UpdateProfilePage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.newAccountPage = new NewAccountPage(page);
    this.registerPage = new RegisterPage(page);
    this.utils = new Utils(page);
    this.homepage = new HomePage(page);
    this.transferFundsPage = new TransferFundsPage(page);
    this.billPayPage = new BillPayPage(page);
    this.updateProfilePage = new UpdateProfilePage(page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getRegisterPage(): RegisterPage {
    return this.registerPage;
  }

  getNewAccountPage(): NewAccountPage {
    return this.newAccountPage;
  }
  getUtils() {
    return this.utils;
  }
  getHomePage() {
    return this.homepage;
  }

  getTransferFundsPage(): TransferFundsPage {
    return this.transferFundsPage;
  }

  getBillPayPage(): BillPayPage {
    return this.billPayPage;
  }

  getUpdateProfilePage(): UpdateProfilePage {
    return this.updateProfilePage;
  }
}