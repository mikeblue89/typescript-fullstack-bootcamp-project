export function emailValidation(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function passwordValidation(password: string): boolean {
    const minLength = 8;
    const startsWithUpperCase = /^[A-Z]/;
    const containsNumber = /[0-9]/;
    const containsSymbol = /[!@#$%^&*(),.?":{}|<>]/;

    return (
        password.length >= minLength &&
        startsWithUpperCase.test(password) &&
        containsNumber.test(password) &&
        containsSymbol.test(password)
    );
}

export function formatDateUTC(date: Date): string {
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth()).padStart(2, '0'); 
    const year = String(date.getUTCFullYear());
    
    return `${year}-${month}-${day}`;
}