import {Popup} from "./Popup.js";

class PopupNewPlace extends Popup {

  constructor(popup, onClose) {
    super(popup, onClose);
    this.popupForm = this.popupElement.querySelector(".popup__form");
    this.name = this.popupForm.querySelector(".popup__input_name");
    this.link = this.popupForm.querySelector(".popup__input_link");
    this.submitButton = this.popupForm.querySelector(".popup__button");
    this.doOnSubmit = this.doOnSubmit.bind(this);
    this.clickPopupNewPlaceButton = this.clickPopupNewPlaceButton.bind(this);
  }

  // при нажатии на кнопку открытия попапа ставим фокус на поле name,
  /* и подставляем текущие данные пользователя*/
  clickPopupNewPlaceButton() {
    this.name.focus();
    //делаем кнопку неактивной при открытии, когда валидации еще не было
    this.submitButton.setAttribute('disabled', "disabled");
    this.submitButton.classList.add(`popup__button_invalid`);
    this.submitButton.classList.remove(`popup__button_valid`);
  }

  doOnSubmit() {
    const newCard = {};
    newCard.name = this.name.value;
    newCard.link = this.link.value;
    return newCard;
  }

}

export {PopupNewPlace};
