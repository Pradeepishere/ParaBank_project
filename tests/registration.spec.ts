import { test, BrowserContext } from '@playwright/test';
import { test as test_registration } from '../resources/fixtures/registration.fixture';
import { POManager } from '../pages/po-manager';
import { Utils } from '../resources/utils';


test.describe('Registration Tests', () => {
  let pom: POManager;
  let utils: Utils;

  test.beforeEach(async ({ page }) => {
    pom = new POManager(page);
    utils = pom.getUtils();
  })

  test('fills registration form using external JSON data', async () => {
    const registration_Jsondata = await utils.dynamic_userName()
    await utils.fillAndVerifyRegistration(registration_Jsondata, pom);
    console.log(registration_Jsondata.username, registration_Jsondata.password);

  });

  test_registration('fills registration form using fixture data', async ({ registrationDetails: registration_Fixturedata }) => {
    await utils.fillAndVerifyRegistration(registration_Fixturedata, pom);
  });

})