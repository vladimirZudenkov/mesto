

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
   toggleButtonState(inputList, buttonElement, config);
   inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
     isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);

     
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList, config)) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass);
    } else {
    buttonElement.disabled = '';
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

    });

    setEventListeners(formElement, config);

  });

};

enableValidation({
  formSelector: '.popup__field',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active'
});







