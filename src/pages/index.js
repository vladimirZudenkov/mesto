import '../pages/index.css';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import { formConfig, initialCards,userOpenButton, userOverlay, autor, jobeDescr, autorNameInput,
  autorJobeInput, userFormElement, cardsContainer, cardsTemplate, cardOverlay, newCardButton,
  newCardElement, imgPreview }  from '../utils/constants.js'; 
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const userValidate = new FormValidator(formConfig, userFormElement);
const cardValidate = new FormValidator(formConfig, newCardElement);
const openImgPopup = new PopupWithImage(imgPreview);
const authorInfo = new UserInfo(autor, jobeDescr);
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
    const dataCard = new Card(cards, handlePreview, cardsTemplate);
    const cardElement = dataCard.generateCard();
    cardsList.addItem(cardElement);
  },
}, cardsContainer );

function handleCardSubmit(formData) {
  const newCard = {
    name: formData.name,
    link: formData.link
  };
  const dataCard = new Card(newCard, handlePreview, cardsTemplate);
  const cardElement = dataCard.generateCard();
  cardsList.addItem(cardElement);
  const addCardSubmitButton = newCardElement.querySelector('.popup__button-save');
  addCardSubmitButton.classList.add('popup__button_disabled');
};

function handlePreview(name, link) {
  openImgPopup.open(name, link);
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

cardsList.renderer();


