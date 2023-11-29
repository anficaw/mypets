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

function handleInput(inputElement, validationConfig) {
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
  const inputList = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(validationConfig.buttonSelector);
  сheckForm(form, submitButton);
  inputList.forEach((input) => {
    handleInput(input, validationConfig);
  });
}

export function enableValidation(validationConfig) {
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach((form) => {
    const submitButton = form.querySelector(validationConfig.buttonSelector);
    сheckForm(form, submitButton);
    const inputLists = form.querySelectorAll(validationConfig.inputSelector);
    inputLists.forEach((input) => {
      input.addEventListener("input", () => {
        handleInput(input, validationConfig);
        сheckForm(form, submitButton);
      });
    });
  });
}
