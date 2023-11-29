function showError(inputFeild, errorMessage, validationConfig) {
  const spanID = "error-" + inputFeild.id;
  const spanElement = document.getElementById(spanID);
  spanElement.textContent = errorMessage;
  inputFeild.classList.add(validationConfig.inputInvalidClass);
}

function hideError(inputFeild, validationConfig) {
  const spanID = "error-" + inputFeild.id;

  const spanElement = document.getElementById(spanID);
  spanElement.textContent = "";
  inputFeild.classList.remove(validationConfig.inputInvalidClass);
}

function handleinput(inputElement, validationConfig) {
  if (inputElement.validity.valid) {
    hideError(inputElement, validationConfig);
  } else {
    showError(inputElement, inputElement.validationMessage, validationConfig);
  }
}

function enableButton(button) {
  button.disabled = false;
}

export function disableButton(button) {
  button.disabled = true;
}

function сheckForm(form, button) {
  if (form.checkValidity()) {
    enableButton(button);
  } else {
    disableButton(button);
  }
}

export function resetError(form, validationConfig) {
  const inputLists = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(validationConfig.buttonSelector);
  сheckForm(form, submitButton);
  inputLists.forEach((input) => {
    handleinput(input, validationConfig);
  });
}

export function enableValidation(validationConfig) {
  const formLists = document.querySelectorAll(validationConfig.formSelector);
  formLists.forEach((form) => {
    const submitButton = form.querySelector(validationConfig.buttonSelector);
    сheckForm(form, submitButton);
    const inputLists = form.querySelectorAll(validationConfig.inputSelector);
    inputLists.forEach((input) => {
      input.addEventListener("input", () => {
        handleinput(input, validationConfig);
        сheckForm(form, submitButton);
      });
    });
  });
}
