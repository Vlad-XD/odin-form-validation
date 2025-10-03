// import css
import "./css/normalize.css";
import "./css/reset.css";
import "./css/fonts.css";
import "./css/styles.css";

// variable declarations
const hiddenClass = "hidden";
const donationSelectedClass = "selected";
const oneTimeDonationAmounts = [25, 50, 100, 250, 500, 1000];
const monthlyDonationAmounts = [10, 15, 20, 35, 50, 100];
const oneTimeFrequencyLabel = "One time donation";
const monthlyFrequencyLabel = "Monthly donation";
const oneTimeCurrencySuffix = "USD";
const monthlyCurrencySuffix = "USD/mo";

// obtain values from APIs
const countryList = [];
const stateList = [];

fetch('https://restcountries.com/v3.1/all?fields=name')
.then(res => res.json())
.then((json) => {
  for (const country of json) {
    countryList.push(country.name.common);
  }
  countryList.sort();
  setCountries(countrySelect);
});


fetch('https://countriesnow.space/api/v0.1/countries/states', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({country: 'United States'})
})
.then(res => res.json())
.then((json) => {
  for (const state of json.data.states) {
    stateList.push(state.name);
  }
  stateList.sort();
  setStates(stateSelect);
});

// obtain elements from DOM 

// Donation Amount section
const oneTimeRadio = document.querySelector("#one-time");
const oneTimeButton = document.querySelector("label[for='one-time']");
const monthlyButton = document.querySelector("label[for='monthly']");
const presetButtonList = document.querySelectorAll(".donation-preset");
const presetRadioList = document.querySelectorAll(".donation-preset-radio");
const otherAmountInput = document.querySelector("#donation-amount-input");
const dedicationCheckbox = document.querySelector("#donation-dedication");
const dedicationNameInput = document.querySelector("#dedication-name");
// Contact Information section
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
// Billing Address section
const streetAddressInput = document.querySelector("#street-address");
const addressTwoInput = document.querySelector("#address-line-2");
const cityInput = document.querySelector("#city");
let stateSelect = document.querySelector("#state");
const postalCodeInput = document.querySelector("#postal-code");
const countrySelect = document.querySelector("#country");
// Card Information section
const cardNumberInput = document.querySelector("#cc");
const expirationInput = document.querySelector("#expiration");
const securityCodeInput = document.querySelector("#cvv");
// Account Creation section
const createYesButton = document.querySelector("#create-true");
const createNoButton = document.querySelector("#create-false");
const accountPasswordSection = document.querySelector(".account-password-section");
const passwordInput = document.querySelector("#password");
const passwordConfirmInput = document.querySelector("#password-confirmation");
// Donation Summary section
const frequencySummaryLabel = document.querySelector(".donation-summary-frequency");
const frequencySummaryAmount = document.querySelector(".donation-total");
const frequencySummarySuffix = document.querySelector(".currency-suffix");
const formSubmitButton = document.querySelector(".form-submit-button");

// form validation

// functionality for donation amount section
oneTimeButton.addEventListener("click", () => {
  for (let i = 0; i < oneTimeDonationAmounts.length; i++) {
    presetButtonList[i].textContent = `$${oneTimeDonationAmounts[i].toLocaleString("en-US")}`;
    if (presetRadioList[i].checked === true) {
      updateSummaryAmmount(oneTimeDonationAmounts[i]);
    }
  }
  frequencySummaryLabel.textContent = oneTimeFrequencyLabel;
  frequencySummarySuffix.textContent = oneTimeCurrencySuffix;
});

monthlyButton.addEventListener("click", () => {
  for (let i = 0; i < monthlyDonationAmounts.length; i++) {
    presetButtonList[i].textContent = `$${monthlyDonationAmounts[i].toLocaleString("en-US")}/mo`;
    if (presetRadioList[i].checked === true) {
    updateSummaryAmmount(monthlyDonationAmounts[i]);
    }
  }
  frequencySummaryLabel.textContent = monthlyFrequencyLabel;
  frequencySummarySuffix.textContent = monthlyCurrencySuffix;
});

for (let i = 0; i < presetButtonList.length; i++) {
  presetButtonList[i].addEventListener("click", () => {
    if (oneTimeRadio.checked) {
        updateSummaryAmmount(oneTimeDonationAmounts[i]);
    } else {
        updateSummaryAmmount(monthlyDonationAmounts[i]);
    }
  });
}

otherAmountInput.addEventListener("input", () => {
  otherAmountInput.classList.add(donationSelectedClass);
  for (const option of presetRadioList) {
    option.checked = false;
  }
});

otherAmountInput.addEventListener("change", () => {
  updateSummaryAmmount(Number(otherAmountInput.value));
});

// format input for other amount input

// prevent more than two decimal places
otherAmountInput.addEventListener("input", (e) => {

  let value = otherAmountInput.value;
  if (value.includes('.')) {
    const [intPart, decPart] = value.split('.');
    if (decPart.length > 2) {
      otherAmountInput.value = intPart + '.' + decPart.slice(0, 2);
    }
  }

})

otherAmountInput.addEventListener("input", (e) => {


})

for (const radio of presetRadioList) {
  radio.addEventListener("change", () => {
    otherAmountInput.value = "";
    otherAmountInput.classList.remove(donationSelectedClass);
  });
}

dedicationCheckbox.addEventListener("change", () => {
  // clear input and then toggle visibility
  dedicationNameInput.value = "";
  dedicationNameInput.classList.toggle(hiddenClass);
});

// helper function for updating donation summary
function updateSummaryAmmount(number) {
  frequencySummaryAmount.textContent = number.toFixed(2);
}

// functionality for contact information section

// format input for phone number

// prevent non-digit key strokes
phoneInput.addEventListener("beforeinput", (e) => {
  if (e.data && /\D/.test(e.data)) {
    e.preventDefault;
  }
})

phoneInput.addEventListener("input", (e) => {
  // remove non-digits
  let digits = e.target.value.replace(/\D/g, ''); 

  // Split into groups: 3, 3, 4 digits
  let part1 = digits.substring(0, 3);
  let part2 = digits.substring(3, 6);
  let part3 = digits.substring(6, 10);

  let formatted = part1;
  if (part2) {
    formatted += '-' + part2;
  }
  if (part3) {
    formatted += '-' + part3;
  }

  e.target.value = formatted;
})

// functionality for billing address section

// format input for postal code

// prevent non-digit or dash key strokes
postalCodeInput.addEventListener("beforeinput", (e) => {
  if (e.data && /[^\d-]/.test(e.data)) {
    e.preventDefault;
  }
})

postalCodeInput.addEventListener("input", (e) => {
  // remove non-digits or dashes
  let formatted = e.target.value.replace(/[^\d-]/g, ''); 
  e.target.value = formatted;
})

countrySelect.addEventListener("change", () => {
  const stateInput = stateSelectHelpers();

  if(countrySelect.value === "United States") {
    stateInput.toggleSelect();
  } else {
    stateInput.toggleInput();
  }

});

// helper function for changing between state input type
function stateSelectHelpers(){

  const html = `
              <select name="state" id="state" class="form-input form-select" autocomplete="address-level1" required>
                <option>Nevada</option>
                <option selected>Arizona</option>
              </select>

              <input
                type="text"
                name="state"
                id="state"
                class="form-input"
                autocomplete="address-level1"
                required
              />              
  `;
  const template = document.createElement('template');
  template.innerHTML = html.trim();

  const selectElement = template.content.firstElementChild;
  setStates(selectElement);
  const inputElement = template.content.lastElementChild;
  
  const toggleSelect = () => {
    stateSelect.parentNode.replaceChild(selectElement, stateSelect);
    stateSelect = selectElement;
  };

  const toggleInput = () => {
    stateSelect.parentNode.replaceChild(inputElement, stateSelect);
    stateSelect = inputElement;
  };

  return {toggleSelect, toggleInput};
}

// helper function to add countries to a select element
function setCountries(selectElement) {
  selectElement.innerHTML = '';
  for (const country of countryList) {
    const countryOption = document.createElement("option");
    countryOption.value = country;
    countryOption.textContent = country;
    if (country === "United States") {
      countryOption.selected = true;
    }
    selectElement.appendChild(countryOption);
  }
}

// helper function to add states to a select element
function setStates(selectElement) {
  selectElement.innerHTML = '';
  for (const state of stateList) {
    const stateOption = document.createElement("option");
    stateOption.value = state;
    stateOption.textContent = state;
    if (state === "Nevada") {
      stateOption.selected = true;
    }
    selectElement.appendChild(stateOption);
  }
}

// functionality for card information section

// format input for card number

// prevent non-digit key strokes
cardNumberInput.addEventListener("beforeinput", (e) => {
  if (e.data && /\D/.test(e.data)) {
    e.preventDefault;
  }
})

cardNumberInput.addEventListener("input", (e) => {
  // remove non-digits
  let digits = e.target.value.replace(/\D/g, ''); 

  // Split into groups: 4, 4, 4, 4 digits
  let part1 = digits.substring(0, 4);
  let part2 = digits.substring(4, 8);
  let part3 = digits.substring(8, 12);
  let part4 = digits.substring(12, 16);
  
  let formatted = part1;
  if (part2) {
    formatted += ' ' + part2;
  }
  if (part3) {
    formatted += ' ' + part3;
  }
  if (part4) {
    formatted += ' ' + part4;
  }

  e.target.value = formatted;
})

// format input for expiration

// prevent non-digit key strokes
expirationInput.addEventListener("beforeinput", (e) => {
  if (e.data && /\D/.test(e.data)) {
    e.preventDefault;
  }
})

expirationInput.addEventListener("input", (e) => {
  // remove non-digits
  let digits = e.target.value.replace(/\D/g, ''); 

  // Split into groups: 2, 2 digits
  let part1 = digits.substring(0, 2);
  let part2 = digits.substring(2, 4);
  
  let formatted = part1;
  if (part2) {
    formatted += ' / ' + part2;
  }

  e.target.value = formatted;
})

// format input for security code

// prevent non-digit or dash key strokes
securityCodeInput.addEventListener("beforeinput", (e) => {
  if (e.data && /[^\d]/.test(e.data)) {
    e.preventDefault;
  }
})

securityCodeInput.addEventListener("input", (e) => {
  // remove non-digits
  let formatted = e.target.value.replace(/[^\d]/g, ''); 
  e.target.value = formatted;
})

// functionality for account creation section
createYesButton.addEventListener("change", () => {
  accountPasswordSection.classList.remove(hiddenClass);
});

createNoButton.addEventListener("change", () => {
  accountPasswordSection.classList.add(hiddenClass);
  passwordInput.value = "";
  passwordConfirmInput.value = "";
});

// functionality for form submission






