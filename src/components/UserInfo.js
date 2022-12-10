export default class UserInfo {
  constructor(autorDescr, autorName, avatarImg) {
    this._userName = document.querySelector(autorName);
    this._autorDescr = document.querySelector(autorDescr);
    this._avatar = document.querySelector(avatarImg);
  }

  getUserInfo() {
    const itemUser = {
      user: this._userName.textContent,
      about: this._autorDescr.textContent,
    };
    return itemUser;
  }

  setAvatar(data) {
    if (data) {
      this._avatar.src = data;
    } else {
      this._avatar.src =
        "https://sun9-62.userapi.com/impg/8ZB4w-Qu5TyOgy51y3bwh9BZt4TcBq8GOVL3bg/_x0e9Jk-vSg.jpg?size=599x450&quality=96&sign=121be18995ae328000b09b2698a159cf&type=album";
    }
  }

  setUserInfo({
    _id: userId,
    name: title,
    avatar: avatar,
    about: description,
  }) {
    if ({ userId, title, avatar, description }) {
      this.setAvatar(avatar);
      this._userName.textContent = title;
      this._autorDescr.textContent = description;
      this.userId = userId;
    } else {
      this.setAvatar(avatar);
      this._userName.textContent = "Данных нет Перезагрузите страничку";
      this._autorDescr.textContent = "Данных нет Перезагрузите страничку";
    }
  }
}
