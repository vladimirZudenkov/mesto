import '../pages/index.css';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import { formConfig, initialCards }  from '../utils/constants.js'; 


import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';



const userOpenButton = document.querySelector('.user__edit-profile'),
  popups = document.querySelectorAll('.popup'),
  userOverlay = document.querySelector('.user-form'),
  autor = document.querySelector('.user__title'),
  jobeDescr = document.querySelector('.user__profession'),
  autorNameInput = userOverlay.querySelector('.popup__input_text_name'),
  autorJobeInput = userOverlay.querySelector('.popup__input_text_description'),
  userFormElement = userOverlay.querySelector('.popup__field'),
  cardsContainer = document.querySelector('.cards__container'),
  cardsTemplate = document.querySelector('.cards__template').content,
  cardOverlay = document.querySelector('.new-card'),
  newCardButton = document.querySelector('.user__button'),
  newCardName = document.querySelector('.new-card__input_text_name'),
  newCardElement = document.querySelector('.new-card__field'),
  imgPreview = document.querySelector('.preview-card'),
  imgLink = document.querySelector('.preview-card__picture'),
  imgCaption = document.querySelector('.preview-card__caption'),
  newCardLink = document.querySelector('.new-card__input_text_link'),
  buttonsClose = document.querySelectorAll('.popup__close');

 
///
const userValidate = new FormValidator(formConfig, userFormElement);
const cardValidate = new FormValidator(formConfig, newCardElement);
///

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
    cardsList.addingCard(cardElement);
  },
},
cardsContainer
);

function handleCardSubmit(formData) {
  const newCard = {
    name: formData.name,
    link: formData.link
  };
  const dataCard = new Card(newCard, handlePreview, cardsTemplate);
  const cardElement = dataCard.generateCard();
  cardsList.addingCard(cardElement);
  const addCardSubmitButton = newCardElement.querySelector('.popup__button');
  addCardSubmitButton.classList.add('popup__button_disabled');
};

function handlePreview(name, link) {
  openImgPopup.open(name, link);
};



function openProfilePopup() {
  const info = authorInfo.getUserInfo();
  autorNameInput.value = info.name;
  autorJobeInput.value = info.about;
  ownerForm.open();
  userValidate.resetValidation();
};


function openCardPopup() {
  cardForm.open();
  cardValidate.resetValidation();
};


////
userValidate.enableValidation();
cardValidate.enableValidation();
ownerForm.setEventListeners();
cardForm.setEventListeners();
///

userOpenButton.addEventListener('click', openProfilePopup);
newCardButton.addEventListener('click', openCardPopup);

//userFormElement.addEventListener('submit', handleProfileSubmit);
//newCardElement.addEventListener('submit', handleCardSubmit);

cardsList.renderer();




// function render() {
//   cards.forEach(renderCard);
// }

// function createCard(card) {
//   const dataCard = new Card(card, handlePreview, cardsTemplate);
//   const cardElement = dataCard.generateCard();
//   return cardElement;
// };
// function renderCard(card) {
//  cardsContainer.prepend(createCard(card));
// }

// function handlePreview(name, link) {
//   openModal(imgPreview);
//   imgLink.src = link;
//   imgCaption.textContent = name;
//   imgLink.alt = name;
// };



// function handleCardSubmit(evt) {
//   evt.preventDefault();
//   const newCard = {
//     name: newCardName.value,
//     link: newCardLink.value
//   };
//   renderCard(newCard);
//   closeCardPopup();
 
//  newCardElement.reset();
// }

///*
// function openProfilePopup() {
//    openModal(userOverlay);
//    autorNameInput.value = autor.textContent;
//   autorJobeInput.value = jobeDescr.textContent;
// }

///*

// function openCardPopup() {
//   openModal(cardOverlay);
//   cardValidate.resetValidation();
// }

// function closeCardPopup() {
//   closeModal(cardOverlay);
  
// }

// function closePopupByEsc(evt) {
//   if (evt.key === "Escape") {
//    const popUpActive = document.querySelector(".popup_opened");
//    if (popUpActive) {
//      closeModal(popUpActive);
//     }
//   }
// }

// function openModal(item) {
//   item.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEsc);
// }

// function closeModal(item) {
//   item.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEsc);
// }

// buttonsClose.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closeModal(popup));
// });

// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//       if (evt.target.classList.contains('popup_opened')) {
//       closeModal(popup)
//     }
//       if (evt.target.classList.contains('popup__close')) 
//     {
//       closeModal(popup)
//     }
//   })
// });