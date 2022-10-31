import Card from './Сard.js';
import FormValidator from './FormValidator.js';
import { formConfig, initialCards }  from './constants.js'; 

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
  buttonClose = document.querySelectorAll('.popup__close');

 

const userValidate = new FormValidator(formConfig, userFormElement);
const cardValidate = new FormValidator(formConfig, newCardElement);

const cards = initialCards.reverse();

function render() {
  cards.forEach(renderCard);
}

function createCard(card) {
  const dataCard = new Card(card, handlePreview, cardsTemplate);
  const cardElement = dataCard.generateCard();
  return cardElement;
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  autor.textContent = autorNameInput.value;
  jobeDescr.textContent = autorJobeInput.value;
  closeModal(userOverlay);
}

function renderCard(card) {
 cardsContainer.prepend(createCard(card));
}

function handlePreview(name, link) {
  openModal(imgPreview);
  imgLink.src = link;
  imgCaption.textContent = name;
  imgLink.alt = name;
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardName.value,
    link: newCardLink.value
  };
  renderCard(newCard);
  closeCardPopup();
 
  evt.submitter.classList.add('popup__button_disabled');
  evt.submitter.setAttribute('disabled', true);
  newCardElement.reset();
}

function openProfilePopup() {
  openModal(userOverlay);
  autorNameInput.value = autor.textContent;
  autorJobeInput.value = jobeDescr.textContent;
}

function openCardPopup() {
  openModal(cardOverlay);
}


function closeCardPopup() {
  closeModal(cardOverlay);
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
   const popUpActive = document.querySelector(".popup_opened");
   if (popUpActive) {
     closeModal(popUpActive);
    }
  }
}

function openModal(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closeModal(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
 
}


buttonClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
      closeModal(popup)
    }
      if (evt.target.classList.contains('popup__close')) 
    {
      closeModal(popup)
    }
  })
  
});

userValidate.enableValidation();
cardValidate.enableValidation();

userOpenButton.addEventListener('click', openProfilePopup);
userFormElement.addEventListener('submit', handleProfileSubmit);
newCardButton.addEventListener('click', openCardPopup);
newCardElement.addEventListener('submit', handleCardSubmit);

render();


