import {ESC} from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._buttonClose = this._popupSelector.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupOverlay = this._popupSelector.querySelector('.popup__field'); 
    this._popup = document.querySelectorAll('.popup');
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
   document.addEventListener('keydown', this._handleEscClose);
   
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
   document.removeEventListener('keydown', this._handleEscClose);
   
  }

  _handleEscClose(evt) {
    if (evt.code === ESC) {
     this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
         this.close();
    });
     
    this._popup.forEach((popup) => { 
       popup.addEventListener('mousedown', (evt) => { 
        if (evt.target === evt.currentTarget) { 
         this.close(); 
         } 
       }) 
    }); 
  }
}

