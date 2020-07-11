'use strict';

class FormValidator {
  constructor(form) {
    this.form = form;
    this.isValidate = this.isValidate.bind(this);
    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
  }

  /*Функция проверки поля на ошибки, возвращает истину если поле валидно
 * или ложь в противном случае, устанавливает кастомное сообщение об ошибке*/

  isValidate(inputElement) {

    inputElement.setCustomValidity(""); //устанавливаем свойсво validity.customError в false


    //* если на инпуте есть атрибут required, поле validity.valueMissing
    /* будет true / false (заполнено)*/
    if (inputElement.validity.valueMissing) {
      // текст ошибки записываем в inputElem.validationMessage с помощью input.setCustomValidity()
      inputElement.setCustomValidity(errorMessages.empty);
      return false
    }

    //* если на инпуте есть атрибут minlength, поле validity.tooShort будет
    /* true / false (достигнута мин. длина)*/
    if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      inputElement.setCustomValidity(errorMessages.wrongLength);
      return false
    }

    //* если на инпуте есть атрибут type, поле validity.typeMismatch будет
    /* true / false (сопадение типа)*/
    if (inputElement.validity.typeMismatch && inputElement.type === 'url') {
      inputElement.setCustomValidity(errorMessages.wrongUrl);
      return false
    }

    return inputElement.checkValidity();
  }


  //*функция валидации поля
  checkInputValidity(inputElement) {
    const errorElem = inputElement.parentNode.querySelector(`#${inputElement.id}-error`);
    const valid = this.isValidate(inputElement); // устанавливаем инпуту кастомные ошибки, если они есть.
    if (!valid) {
      errorElem.textContent = inputElement.validationMessage;
    } else {
      errorElem.textContent = "";
    }

    return valid;
  }

  handleInputs(event) {
    const submitElement = this.form.querySelector('.popup__button');

    const [...inputs] = this.form.querySelectorAll(".popup__input"); // превращаем итератор(итерируемый объект) в массив

    this.checkInputValidity(event.target); // проверяем поле на валидность и выводим ошибку если не валидно.


    if (inputs.every(this.isValidate)) { // если каждый инпут формы вернул true, то включаем кнопку в противном случае выключаем
      this.setSubmitButtonState(submitElement, true);
    } else {
      this.setSubmitButtonState(submitElement, false);
    }

  }

  setEventListeners() {
    this.form.addEventListener("input", this.handleInputs, true);
  }

  removeEventListeners() {
    this.form.removeEventListener("input", this.handleInputs, true);
  }

  //* функция, меняющая состояние кнопки сабмита
  setSubmitButtonState(button, state) {
    if (state) {
      button.removeAttribute('disabled');
      button.classList.add(`popup__button_valid`);
      button.classList.remove(`popup__button_invalid`);
    } else {
      button.setAttribute('disabled', 'disabled');
      button.classList.add(`popup__button_invalid`);
      button.classList.remove(`popup__button_valid`);
    }
  }

  resetErrors() {
    this.form.reset();
    const errors = this.form.querySelectorAll(".error");
    errors.forEach(error => error.textContent = "");
  }


}
