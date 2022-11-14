import {ESC} from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._buttonClose = this._popupSelector.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
   // this._popup = this.popupSelector.querySelector('popup');
   console.log(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
   document.addEventListener('keydown', this._handleEscClose);
  // document.addEventListener('mousedown', this._handleClickClose);

  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
   document.removeEventListener('keydown', this._handleEscClose);
   document.removeEventListener('mousedown', this._handleClickClose);
  }


  _handleEscClose(evt) {
    if (evt.code === ESC) {
      this.close();
    }
  }

  _handleClickClose(evt) {
    this._popUpActive = document.querySelector('.popup_opened');
    if (evt.target === this._popUpActive) {
      this.close();
    }

  }


  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('mousedown', this._handleClickClose);
  }

}
/*
popups.forEach((popup) => { 
  popup.addEventListener('mousedown', (evt) => { 
      if (evt.target.classList.contains('popup_opened')) { 
      Popup.open(); 
    } 
      if (evt.target.classList.contains('popup__close'))  
    { 
      Popup.close();
    } 
  }) 
}); */

/*
popups.forEach((popup) => { 
  popup.addEventListener('mousedown', (evt) => { 
      if (evt.target.classList.contains('popup_opened')) { 
      Popup.open(); 
    } 
      if (evt.target.classList.contains('popup__close'))  
    { 
      Popup.close();
    } 
  }) 
}); */