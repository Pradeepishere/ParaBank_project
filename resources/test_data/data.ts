export interface RegistrationDetails {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    ssn: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export type BillPayDetails = {
    payeeName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    accountNumber: string;
    verifyAccountNumber: string;
};
export const billPay_Data: BillPayDetails =
{
    payeeName: 'Test Utility Company',
    address: '123 Utility Street',
    city: 'Testville',
    state: 'CA',
    zipCode: '90210',
    phoneNumber: '555-0100',
    accountNumber: '20100',
    verifyAccountNumber: '20100',
}

export interface update_Profile {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}

export type Update_Profile_Data = Partial<update_Profile>;

export const updating_Profile: update_Profile = {
    firstName: 'Ram',
    lastName: 'sun',
    address: 'abc',
    city: 'New_York',
    state: 'USA',
    zipCode: '123',
    phoneNumber: '0987654321'
}
