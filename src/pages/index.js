import '../pages/index.css';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import { formConfig, initialCards, userOpenButton,  autor, jobeDescr, autorNameInput,
  autorJobeInput, userFormElement, cardsContainer, cardsTemplate, newCardButton,
  newCardElement, }  from '../utils/constants.js'; 
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userValidate = new FormValidator(formConfig, userFormElement);
const cardValidate = new FormValidator(formConfig, newCardElement);
const authorInfo = new UserInfo(autor, jobeDescr);

const imagePopup = new PopupWithImage('.preview-card');            
const ownerForm = new PopupWithForm('.user-form', (data) => {
  handleProfileSubmit(data);
});
const cardForm = new PopupWithForm('.new-card', (data) => {
  handleCardSubmit(data);
});

const cards = initialCards.reverse();

function handleProfileSubmit(data) {
  authorInfo.setUserInfo(data);
};

const cardsList = new Section({
  items: cards,
  renderer: (cards) => {
    cardsList.addItem(rederCards(cards));
  },
}, cardsContainer );

function handleCardSubmit(formData) {
  const newCard = {
    name: formData.name,
    link: formData.link
  };
  cardsList.addItem(rederCards(newCard));
  cardValidate.resetValidation();
};

function rederCards(cards) {
  const dataCard = new Card(cards, handlePreview, cardsTemplate);   
  const cardElement = dataCard.generateCard();
  return cardElement                        
}

function handlePreview(name, link) {
  imagePopup.open(name, link);
  imagePopup.setEventListeners();
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


userValidate.enableValidation();
cardValidate.enableValidation();
ownerForm.setEventListeners();
cardForm.setEventListeners();

userOpenButton.addEventListener('click', openProfilePopup);
newCardButton.addEventListener('click', openCardPopup);

cardsList.renderItems();


