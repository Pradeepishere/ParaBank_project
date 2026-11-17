import { test as registrationTest } from './registration.fixture';
import { POManager } from '../../pages/po-manager';
import type { RegistrationDetails } from './registration.fixture';
import type { Page } from '@playwright/test';

export type AuthenticatedUser = {
  page: Page;
  pom: POManager;
  registrationDetails: RegistrationDetails;
};

type LoginWorkerFixtures = {
  authenticatedUser: AuthenticatedUser;
};

export const test = registrationTest.extend<{}, LoginWorkerFixtures>({
  authenticatedUser: [async ({ browser }, use, workerInfo) => {
    const baseURL = workerInfo.project.use.baseURL;
    if (typeof baseURL !== 'string') {
      throw new Error('A string baseURL must be configured in playwright.config.ts.');
    }

    const context = await browser.newContext({ baseURL });
    try {
      const page = await context.newPage();
      const pom = new POManager(page);
      const utils = pom.getUtils();
      const registrationDetails = await utils.dynamic_userName();

      await utils.logged_in(registrationDetails, pom.getLoginPage(), pom);
      await use({ page, pom, registrationDetails });
    } finally {
      await context.close();
    }
  }, { scope: 'worker' }],
});
