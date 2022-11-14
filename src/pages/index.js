import '../pages/index.css';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import { formConfig, initialCards, userOpenButton, buttonsClose, userOverlay, autor, jobeDescr, autorNameInput,
  autorJobeInput, userFormElement, cardsContainer, cardsTemplate, cardOverlay, popups, newCardButton,
  newCardElement, imgPreview }  from '../utils/constants.js'; 
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userValidate = new FormValidator(formConfig, userFormElement);
const cardValidate = new FormValidator(formConfig, newCardElement);
const authorInfo = new UserInfo(autor, jobeDescr);

const imagePopup = new PopupWithImage(imgPreview);            ////    ====>   imgPreview = document.querySelector('.preview-card'),
const ownerForm = new PopupWithForm(userOverlay, (data) => {
  handleProfileSubmit(data);
});

const cardForm = new PopupWithForm(cardOverlay, (data) => {
  handleCardSubmit(data);
});

const cards = initialCards.reverse();

function handleProfileSubmit(data) {
  authorInfo.setUserInfo(data);
};

const cardsList = new Section({
  items: cards,
  renderer: (cards) => {
    const dataCard = new Card(cards, handlePreview, cardsTemplate);//*** */
    const cardElement = dataCard.generateCard();//*** */
    cardsList.addItem(cardElement);
  },
}, cardsContainer );

function handleCardSubmit(formData) {
  const newCard = {
    name: formData.name,
    link: formData.link
  };
  const dataCard = new Card(newCard, handlePreview, cardsTemplate);
  const cardElement = dataCard.generateCard();///**** */
  cardsList.addItem(cardElement);
  cardValidate.resetValidation();
};

function handlePreview(name, link) {
  imagePopup.open(name, link);
};

function openProfilePopup() {
  const info = authorInfo.getUserInfo();
  autorNameInput.value = info.user;
  autorJobeInput.value = info.about;
  ownerForm.open();
  userValidate.resetValidation();
};

function openCardPopup() {
  cardForm.open();
  cardValidate.resetValidation();
};

/*
buttonsClose.forEach((button) => { 
  const popup = button.closest('.popup'); 
  button.addEventListener('click', () => closeModal(popup)); 
}); 
*/
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
}); 
*/


userValidate.enableValidation();
cardValidate.enableValidation();
ownerForm.setEventListeners();
cardForm.setEventListeners();

userOpenButton.addEventListener('click', openProfilePopup);
newCardButton.addEventListener('click', openCardPopup);

cardsList.renderItems();


