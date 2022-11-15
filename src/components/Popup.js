import {ESC} from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._buttonClose = this._popupSelector.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._popupSelector.querySelectorAll('.popup__field'); // 
   // this._handleClickClose = this._handleClickClose.bind(this); 
    console.log(this._handleClickClose);
    
    this._popup = this._popupSelector.querySelector('.popup');
    
  }

// export default class Popup {
//   constructor(popupSelector) {
//     this._popupSelector = document.querySelector(popupSelector);
//     console.log(this._popupSelector);
//     this._buttonClose = this._popupSelector.querySelector('.popup__close');
//     this._handleEscClose = this._handleEscClose.bind(this);
//     this._handleClickClose = this._handleClickClose.bind(this);
//    // this._popup = this.popupSelector.querySelector('popup');
//    console.log(popupSelector);
//   }



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

  // _handleClickClose(evt) {
  //   console.log(evt);
  //   // this._popUpActive = document.querySelector('.popup_opened');
  //   // this._popUpActive = document.querySelector('.popup_opened');
  //   if (evt.target === evt.currentTarget) {
  //     this.close();
  //   }
    
  // }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
    //this._overlay.addEventListener('mousedown', this._handleClickClose);
    // document.addEventListener('mousedown', this._handleClickClose, (evt)  => {
    //   if (evt.target === evt.currentTarget) {
    //     this.close();
    // }});

    document.addEventListener('mousedown', this._handleClickClose);


  //  this._overlay.addEventListener ('mousedown' , () => {
  //   this.close();
  //   console.log(this._handleClickClose);
  // })
   
  //   this._handleClickClose.addEventListener ('mousedown', () => {
  //      this.close();
  //      console.log(this._handleClickClose);
  //    })

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