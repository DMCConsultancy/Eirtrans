/*
 * Validation functions
 */

export const ValueEmpty = value => {
  if (value) {
    return false;
  }
  return true;
};

export const ValidateMobile = mobile => {
  const reg = new RegExp('^\\d+$');

  if (ValueEmpty(mobile)) {
    return 'Please fill your mobile number';
  } else if (!reg.test(mobile)) {
    return 'Invalid mobile number';
  }
  return 'success';
};

export const ValidateMail = email => {
  if (ValueEmpty(email)) {
    return 'Please provide an email';
  }
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email)) {
    return 'Invalid Email id';
  }
  return 'success';
};

export const ValidatePassword = password => {
  var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (ValueEmpty(password)) {
    return 'Please provide a password to keep your account secure';
  } else if (password.length < 8 || password.length > 16) {
    return 'Password should be 8-16 characters long';
  } else if (!reg.test(password)) {
    return 'Password should contain atleast one number & a special character';
  }

  return 'success';
};

export const ifEmail = str => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(str);
};
