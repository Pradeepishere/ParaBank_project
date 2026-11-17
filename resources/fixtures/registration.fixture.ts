import { randomUUID } from 'node:crypto';
import { test as base } from '@playwright/test';
import type { RegistrationDetails } from '../test_data/data';

export type { RegistrationDetails } from '../test_data/data';


type RegistrationFixtures = {
  registrationDetails: RegistrationDetails;
};

export const test = base.extend<RegistrationFixtures>({
  registrationDetails: async ({ }, use) => {
    const uniqueId = randomUUID().replaceAll('-', '').slice(0, 10);
    const pwd = `pwd_${uniqueId}`;

    await use({
      firstName: 'Jordan',
      lastName: 'Fixture',
      address: '456 Fixture Test Avenue',
      city: 'Sampletown',
      state: 'NY',
      zipCode: '10001',
      phoneNumber: '555-0102',
      ssn: '000-00-0002',
      username: `user_${uniqueId}`,
      password: pwd,
      confirmPassword: pwd,
    });
  },
});
