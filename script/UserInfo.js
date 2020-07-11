'use strict';

class UserInfo{
  constructor(userData){
    this.name = userData.name;
    this.about = userData.about;
    this.avatar = userData.avatar;
    this._id = userData._id;
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  // отображать данные на странице
updateUserInfo (userCurrentData) {
  userCurrentData.name.textContent = this.name;  
  userCurrentData.about.textContent = this.about;
}

//обновлять данные внутри экземпляра класса
setUserInfo(data) {
  this.name = data.name;
  this.about = data.about;
}

}
