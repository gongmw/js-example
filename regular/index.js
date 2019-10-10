const PasswordSecurity = ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z]{8,12}$;

console.log(PasswordSecurity.test("1234e434"));