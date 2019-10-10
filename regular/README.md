### 1. Password strength
> contains a combination of upper and lower case letters and Numbers, cannot use special characters, and is between 8 and 12 in length

>**const PasswordSecurity = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z]{8,12}$/;**

console.log(PasswordSecurity.test("w1234e434F")); // true
***

### 2. Email address
>**const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;**

console.log(email.test("14536845@qq.com")); // true
***
### 3. Phone number verification
>**const phone = /^([1][3,4,5,6,7,8,9])\d{9}$/;**

console.log(phone.test("13646474655"))； // true
***
### 4. QQ verification
>**[1-9][0-9]{4,}**
***
### 5. China postcode verification
>**[1-9]\d{5}(?!\d)**
***
### 6. Date format validation（2019-09-09）
>**^\d{4}-\d{1,2}-\d{1,2}**
***
### 7. Identification number verification
>**^((\d{18})|([0-9x]{18})|([0-9X]{18}))$**
***
### 8. IP address verification
>**((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))**
***
### 9. First and last blank character validation
>(^\s*)|(\s*$)
***
### 10.Whether the account is legal (alphanumeric underscores are allowed at the beginning of letters)
>^[a-zA-Z][a-zA-Z0-9_]{4,15}$










