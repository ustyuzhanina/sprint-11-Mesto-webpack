import {Card} from "./Card.js";
import {CardList} from "./CardList.js";
import {PopupNewPlace} from "./PopupNewPlace.js";
import {PopupUserInfo} from "./PopupUserInfo.js";
import {PopupImage} from "./PopupImage.js";
import {UserInfo} from "./UserInfo.js";
import {FormValidator} from "./FormValidator.js";
import {Api} from "./Api.js";

export default (function () {

  const list = document.querySelector(".places-list");
  const popupNewPlace = document.querySelector(".popup_new-place");
  const popupNewPlaceButton = document.querySelector(".user-info__place-button");

  const userCurrentData = {};
  userCurrentData.name = document.querySelector(".user-info__name");
  userCurrentData.about = document.querySelector(".user-info__job");
  userCurrentData.avatar = document.querySelector(".user-info__photo");

  const userData = {};

  const popupUserInfo = document.querySelector(".popup_user-info");
  const popupUserInfoButton = document.querySelector(".user-info__edit-button");
  const popupImage = document.querySelector(".popup_image");

  const popupObj = new PopupImage(popupImage);
  const cardList = new CardList(list);


  const config = {
    baseUrl: 'https://praktikum.tk/cohort11',
    headers: {
      authorization: '0545870b-6ad1-4b08-a3b6-74b447a5a618',
      'Content-Type': 'application/json',
      },
  }

  const api = new Api(config);

  api.getInitialCards().then(res => {
    const cardsArray = res.map(item => {
      const card = new Card(item, getPopupImage, api);
      return card.create();
    })       
    cardList.render(cardsArray);
  })
  .catch(err => console.log(err));

  api.getUserData().then(res => {
    Object.assign(userData, res);
    userCurrentData.name.textContent = userData.name;
    userCurrentData.about.textContent = userData.about;
    userCurrentData.avatar.style.backgroundImage = "url(" + userData.avatar + ")";
    return userData;    
  })
  .then(data => {
    /* Можно лучше: создать экземпляр один раз глобально, этот экземпляр ещё понадобится ниже */
    const userInfo = new UserInfo(data);
    userInfo.setUserInfo(data);
  })
  .catch(err => console.log(err));
  
 


  function onPopupNewPlaceClose() {
    formValidatorNewPlace.removeEventListeners();
    formValidatorNewPlace.resetErrors();
  }

  const popupNewPlaceObj = new PopupNewPlace(popupNewPlace, onPopupNewPlaceClose);
  const formValidatorNewPlace = new FormValidator(popupNewPlaceObj.popupForm);

  function onPopupUserInfoClose() {
    formValidatorUserInfo.removeEventListeners();
    formValidatorUserInfo.resetErrors();
  }

  const popupUserInfoObj = new PopupUserInfo(popupUserInfo, onPopupUserInfoClose);
  const formValidatorUserInfo = new FormValidator(popupUserInfoObj.popupForm);


  function getPopupImage(event) {
    const card = event.target.closest(".place-card");
    const imageLink = card.querySelector(".place-card__image").style.backgroundImage.slice(5, -2);
    popupObj.open();
    popupObj.insertImage(imageLink);

    return popupObj;
  }


  function handlePopupNewPlaceSubmit(event) {
    event.preventDefault();
    
    api.addCard(popupNewPlaceObj.doOnSubmit()).then(
      res => {
        const newCardObj = new Card(res, getPopupImage, api);
        const newDomCard = newCardObj.create();
        cardList.addCard(newDomCard);
        popupNewPlaceObj.close();
        popupNewPlaceObj.popupForm.reset();
        popupNewPlaceObj.popupForm.removeEventListener("submit", handlePopupNewPlaceSubmit);
      })
      .catch(err => console.log(err));    
   
    
    /*
        Можно лучше: Использование внутренних свойств экземпляров класса считается плохой практикой и нарушает основы ООП (инкапсуляция).
        Вместо этого можно реализовать отдельные геттеры и сеттеры:
        https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/get
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
     */
    
    /*
        Можно лучше: Использование внутренних свойств экземпляров класса считается плохой практикой и нарушает основы ООП (инкапсуляция).
        Вместо этого можно реализовать отдельные геттеры и сеттеры:
        https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/get
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
     */    
  }

  popupNewPlaceButton.addEventListener("click", function () {
    popupNewPlaceObj.open();
    popupNewPlaceObj.clickPopupNewPlaceButton();

    formValidatorNewPlace.setEventListeners();

    /*
      Можно лучше: Использование внутренних свойств экземпляров класса считается плохой практикой и нарушает основы ООП (инкапсуляция).
      Вместо этого можно реализовать отдельные геттеры и сеттеры:
      https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/get
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
     */
    popupNewPlaceObj.popupForm.addEventListener("submit", handlePopupNewPlaceSubmit);
  });


  function handlePopupUserInfoSubmit(event) {
    event.preventDefault();
    
    //переносим данные из формы в объект данных пользователя в script
    const newUserData = popupUserInfoObj.doOnSubmit();
    userData.name = newUserData.name;
    userData.about = newUserData.about;

    api.uploadUserInfo(userData).then(res => {

      // сохраняем новые данные в классе и обновляем данные на странице
      const userInfo = new UserInfo(res);
      userInfo.setUserInfo(res);
      userInfo.updateUserInfo(userCurrentData);
      popupUserInfoObj.close();

      popupUserInfoObj.popupForm.removeEventListener("submit", handlePopupUserInfoSubmit);
    })
    .catch(err => console.log(err));
    /*
      Можно лучше: Лучше создать один раз экземпляр класса и затем его переиспользовать, как это сделано с попапами форм.
     */

    /*
        Можно лучше: Использование внутренних свойств экземпляров класса считается плохой практикой и нарушает основы ООП (инкапсуляция).
        Вместо этого можно реализовать отдельные геттеры и сеттеры:
        https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/get
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
     */
    
  }

  popupUserInfoButton.addEventListener("click", function () {
    popupUserInfoObj.open();
    popupUserInfoObj.clickPopupUserInfoButton(userCurrentData);

    formValidatorUserInfo.setEventListeners();

    /*
      Можно лучше: Использование внутренних свойств экземпляров класса считается плохой практикой и нарушает основы ООП (инкапсуляция).
      Вместо этого можно реализовать отдельные геттеры и сеттеры:
      https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/get
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
     */
    popupUserInfoObj.popupForm.addEventListener("submit", handlePopupUserInfoSubmit);
  });

  // конец IIFE
})()

/*
  Отлично, класс Api создан, данные с сервера приходят и профиль пользователя сохраняется
  Но есть несколько замечаний:

  Надо исправить:
  - + создавать экземпляр CardList не внутри запроса
  - + при добавлении карточек через попап падает ошибка
  - + все изменения на странице должны происходить, только после того, как
  сервер ответил подтверждением, в том числе и закрытие попапа

  Можно лучше:
  - + передавать в класс только базовый адрес сервера https://praktikum.tk/cohort11, 
  имена ендпоинтов добавлять к нему в самом методе
  - + проверка ответа сервера и преобразование из json
  дублируется во всех методах класса Api, лучше вынести в отдельный метод

*/


/*
  Все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/























/*
    Резюме по работе:
    Работа принята. Получилось очень хорошо!

    Что понравилось:
    - используются ES6 классы;;
    - используется наследование классов;
    - в классах не создаются инстансы других классов.

    Что можно улучшить:
    - отформатировать единообразно код;
    - переиспользовать экземпляр класса UserInfo;
    - использовать геттеры для доступа к внутренним свойствам экземпляра класса;
    - использовать шаблонные строки из es6;
    - передавать event в функцию;
    - в классе Card инициализировать свойства с dom-элементами в методе create.

    Успехов в дальнейшем обучении!
 */
