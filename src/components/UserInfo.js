export default class UserInfo {
  constructor(autorDescr, autorName, avatarImg) {
    this._userName = document.querySelector(autorName);
    this._autorDescr = document.querySelector(autorDescr);
     this._avatar = document.querySelector(avatarImg);
  }

  getUserInfo() {
    const itemUser = {
      user: this._userName.textContent,
      about: this._autorDescr.textContent
    };
    return itemUser;
  }
  
  setAvatar(data) {              
  this._avatar.src = data;
  }

  setUserInfo({ _id: userId, name: title, avatar: avatar, about: description }) {
    this.setAvatar(avatar);
    this._userName.textContent = title;
    this._autorDescr.textContent = description;
    this.userId = userId;

  }

}
