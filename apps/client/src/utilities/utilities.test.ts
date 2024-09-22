import { emailValidation, formatDateUTC, passwordValidation } from './utilities';


describe('emailValidation', () => {
    test('check if an email is valid', () => {
        const result = emailValidation('mail@test.com');
        expect(result).toBe(true);
    });

    test('check if an email is not valid', () => {
        const result = emailValidation('mailtest.com');
        expect(result).toBe(false);
    });
});

describe('passwordValidation', () => {
    test('check if password meets all the security requirements', () => {
        const result = passwordValidation('Dev1234#er');
        expect(result).toBe(true);
    });

    test('check if password does not meets all the security requirements', () => {
        const result = passwordValidation('1234');
        expect(result).toBe(false);
    });
});

describe('formatDateUTC', () => {
    it('should format a valid UTC date to YYYY-MM-DD', () => {
        const utcDate = new Date(Date.UTC(2024, 9, 20)); 
        expect(formatDateUTC(utcDate)).toBe('2024-09-20');
    });

    it('should handle an invalid date gracefully', () => {
        const invalidDate = new Date('invalid date string');
        expect(formatDateUTC(invalidDate)).toBe('NaN-NaN-NaN'); 
    });
});