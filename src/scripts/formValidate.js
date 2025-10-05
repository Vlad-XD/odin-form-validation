// contains functions for form validations and displaying errors
//  all validate functions return false if the input field is not valid

// error message definitions
const ERROR_EMPTY = "Field cannot be empty.";

const ERROR_DONATION = {
  invalid: "Invalid donation amount.",
  zero: "Donation amount must be greater than 0.",
};

const ERROR_CONTACT = {
  email: "Invalid email.",
  phone: "Invalid phone number.",
};

const ERROR_ADDRESS = {
  postal: "Invalid postal code.",
};

const ERROR_CARD = {
  number: "Invalid card number.",
  security: "Invalid security code.",
  expiration: "Invalid expiration date.",
};

const ERROR_PWD = {
  min: "Password is too short.",
  max: "Password is too long.",
  number: "Password must contain a number.",
  symbol: "Password must contain a symbol.",
  confirm: "Passwords do not match.",
};

// variable declarations
const errorLabelClass = "error-label";
const errorInputClass = "error-input";
const inputContainerParentClass = "form-field";

function validateCustomDonation(element) {
  const donationAmount = Number(element.value);

  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  // check that a number was passed
  if (Number.isNaN(donationAmount)) {
    showError(element, ERROR_DONATION.invalid);
    return false;
  }

  // check that the number was greater than zero
  if (donationAmount <= 0) {
    showError(element, ERROR_DONATION.zero);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validateDedication(element) {
  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validateFirstName(element) {
  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validateLastName(element) {
  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validateEmailAddress(element) {
  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  if (element.validity.patternMismatch) {
    showError(element, ERROR_CONTACT.email);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validatePhoneNumber(element) {
  const phoneNumber = element.value;
  const phoneNumberInputLength = 12; // includes dashes in number

  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  if (phoneNumber.length < phoneNumberInputLength) {
    showError(element, ERROR_CONTACT.phone);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validateStreetAddress(element) {
  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validateCity(element) {
  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validatePostalCode(postalCodeElement, countryElement) {
  const postalCode = postalCodeElement.value;
  const country = countryElement.value;

  removeErrorLabel(postalCodeElement);

  // check if field is empty
  if (postalCodeElement.validity.valueMissing) {
    showError(postalCodeElement, ERROR_EMPTY);
    return false;
  }

  // if address is from US, validate proper postal code
  if (country === "United States") {
    const postalRegex = /^\d{5}(?:-\d{4})?$/;
    if (!postalRegex.test(postalCode)) {
      showError(postalCodeElement, ERROR_ADDRESS.postal);
      return false;
    }
  }

  // if no errors...
  removeError(postalCodeElement);
  return true;
}

function validateState(element) {
  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validateCardNumber(element) {
  const cardNumberInputLength = 19; // takes into account spaces
  const cardNumber = element.value;

  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  // check field has sufficient numbers
  if (cardNumber.length !== cardNumberInputLength) {
    showError(element, ERROR_CARD.number);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validateExpirationDate(element) {
  const expirationDateInputLength = 7; // includes formatting
  const expirationDate = element.value;

  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  // check field has sufficient numbers
  if (expirationDate.length !== expirationDateInputLength) {
    showError(element, ERROR_CARD.expiration);
    return false;
  }

  // check expiration date is greater than or equal to current date
  const expMonth = Number(expirationDate.slice(0, 2));
  const expYear = Number(expirationDate.slice(5));
  const currentDate = new Date();
  const currentYear = Number(String(currentDate.getFullYear()).slice(-2));
  const currentMonth = Number(
    String(currentDate.getMonth() + 1).padStart(2, "0"),
  );

  // check for valid month
  if (expMonth > 12 || expMonth < 1) {
    showError(element, ERROR_CARD.expiration);
    return false;
  }

  // check for valid year
  if (expYear < currentYear) {
    showError(element, ERROR_CARD.expiration);
    return false;
  }

  // check for valid expiration date
  if (expMonth < currentMonth && expYear <= currentYear) {
    showError(element, ERROR_CARD.expiration);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validateSecurityCode(element) {
  const securityCodeInputLength = 3; // can also be four
  const securityCode = element.value;

  removeErrorLabel(element);

  // check if field is empty
  if (element.validity.valueMissing) {
    showError(element, ERROR_EMPTY);
    return false;
  }

  // check field has sufficient numbers
  if (
    securityCode.length !== securityCodeInputLength &&
    securityCode.length !== securityCodeInputLength + 1
  ) {
    showError(element, ERROR_CARD.security);
    return false;
  }

  // if no errors...
  removeError(element);
  return true;
}

function validatePassword(passwordElement) {
  const passwordMinLength = 8;
  const passwordMaxLength = 20;
  const password = passwordElement.value;

  let hasNumber = false;
  let hasSymbol = false;

  removeErrorLabel(passwordElement);

  // check min password length
  if (password < passwordMinLength) {
    showError(passwordElement, ERROR_PWD.min);
    return false;
  }

  // check max password length
  if (password > passwordMaxLength) {
    showError(passwordElement, ERROR_PWD.max);
    return false;
  }

  // check for at least one number and one special character
  for (const char of password) {
    if (!hasNumber && /\d/.test(char)) {
      hasNumber = true;
    }

    if (!hasSymbol && /[^a-zA-Z0-9 ]/.test(char)) {
      hasSymbol = true;
    }
  }

  if (!hasNumber) {
    showError(passwordElement, ERROR_PWD.number);
    return false;
  }

  if (!hasSymbol) {
    showError(passwordElement, ERROR_PWD.symbol);
    return false;
  }

  // if no errors...
  removeError(passwordElement);
  return true;
}

function validateConfirmPassword(passwordConfirmElement, passwordElement) {
  removeErrorLabel(passwordConfirmElement);
  if (passwordElement.value != passwordConfirmElement.value) {
    showError(passwordConfirmElement, ERROR_PWD.confirm);
    return false;
  } else {
    removeError(passwordConfirmElement);
    return true;
  }
}

// helper functions for generating errors
function createErrorLabel(message) {
  const labelElement = document.createElement("small");
  labelElement.classList.add(errorLabelClass);
  labelElement.textContent = message;
  return labelElement;
}

function showErrorLabel(element, errorLabel) {
  const formFieldParent = element.closest(`.${inputContainerParentClass}`);
  formFieldParent.appendChild(errorLabel);
}

function removeErrorLabel(element) {
  const formFieldParent = element.closest(`.${inputContainerParentClass}`);
  const errorLabel = formFieldParent.querySelector(`.${errorLabelClass}`);
  if (errorLabel) {
    formFieldParent.removeChild(errorLabel);
  }
}

function showError(element, errorMessage) {
  element.classList.add(errorInputClass);
  showErrorLabel(element, createErrorLabel(errorMessage));
}

function removeError(element) {
  element.classList.remove(errorInputClass);
  removeErrorLabel(element);
}

export {
  validateCustomDonation,
  validateDedication,
  validateFirstName,
  validateLastName,
  validateEmailAddress,
  validatePhoneNumber,
  validateStreetAddress,
  validateCity,
  validatePostalCode,
  validateState,
  validateCardNumber,
  validateExpirationDate,
  validateSecurityCode,
  validatePassword,
  validateConfirmPassword,
  removeError,
};
