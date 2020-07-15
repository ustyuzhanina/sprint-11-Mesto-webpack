import {Popup} from "./Popup.js";

class PopupUserInfo extends Popup {

  constructor(popup, onClose) {
    super(popup, onClose);
    this.popupForm = this.popupElement.querySelector(".popup__form");
    this.userName = this.popupForm.querySelector(".popup__input_username");
    this.userAbout = this.popupForm.querySelector(".popup__input_useroccupation");
    this.submitButton = this.popupForm.querySelector(".popup__button");
    this.doOnSubmit = this.doOnSubmit.bind(this);
    this.clickPopupUserInfoButton = this.clickPopupUserInfoButton.bind(this);
  }

  clickPopupUserInfoButton(userCurrentData) {
    this.userName.value = userCurrentData.name.textContent;
    this.userAbout.value = userCurrentData.about.textContent;

    this.userName.focus();
    //делаем кнопку активной при открытии, когда валидации еще не было
    this.submitButton.removeAttribute('disabled');
    this.submitButton.classList.add(`popup__button_valid`);
    this.submitButton.classList.remove(`popup__button_invalid`);
  }

  //создаем объект с введенными в форму данными пользователя
  doOnSubmit() {
    const userData = {};
    userData.name = this.userName.value;
    userData.about = this.userAbout.value;
    return userData;
  }

}

export {PopupUserInfo};