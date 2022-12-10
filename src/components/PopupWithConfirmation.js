import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__field");
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
  setSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }
}
