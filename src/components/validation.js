function showError(inputFeild, errormessage, validationconfig) {
  const spanID = "error-" + inputFeild.id;
  const spanElement = document.getElementById(spanID);
  spanElement.textContent = errormessage;
  inputFeild.classList.add(validationconfig.inputinvalidclass);
}

function hideError(inputFeild, validationconfig) {
  const spanID = "error-" + inputFeild.id;

  const spanElement = document.getElementById(spanID);
  spanElement.textContent = "";
  inputFeild.classList.remove(validationconfig.inputinvalidclass);
}

function handleinput(inputElement, validationconfig) {
  if (inputElement.validity.valid) {
    hideError(inputElement, validationconfig);
  } else {
    showError(inputElement, inputElement.validationMessage, validationconfig);
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

export function resetError(form, validationconfig) {
  const inputlist = form.querySelectorAll(validationconfig.inputselector);
  const submitbutton = form.querySelector(validationconfig.buttonselector);
  сheckForm(form, submitbutton);
  inputlist.forEach((input) => {
    handleinput(input, validationconfig);
  });
}

export function enableValidation(validationconfig) {
  const formlist = document.querySelectorAll(validationconfig.formselector);
  formlist.forEach((form) => {
    const sabmitbutton = form.querySelector(validationconfig.buttonselector);
    сheckForm(form, sabmitbutton);
    const inputlist = form.querySelectorAll(validationconfig.inputselector);
    inputlist.forEach((input) => {
      input.addEventListener("input", () => {
        handleinput(input, validationconfig);
        сheckForm(form, sabmitbutton);
      });
    });
  });
}
