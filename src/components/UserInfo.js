export default class UserInfo {
  constructor(autorName, autorDescr) {
    this._autorName = autorName;
    this._autorDescr = autorDescr;
  }
  getUserInfo() {
    const itemUser = {
      user: this._autorName.textContent,
      about: this._autorDescr.textContent
    };
    return itemUser;
  }

  setUserInfo(data) {
    this.name = data.user;
    this.about = data.about;
    this._autorName.textContent = this.name;
    this._autorDescr.textContent = this.about;

  }

}
