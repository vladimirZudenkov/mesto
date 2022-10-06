
const userOpenButton = document.querySelector('.user__edit-profile'),
  userOverlay = document.querySelector('.user-form'),
//  userCloseButton = userOverlay.querySelector('.popup__button-close'),
  autor = document.querySelector('.user__title'),
  jobeDescr = document.querySelector('.user__profession'),
  autorNameInput = userOverlay.querySelector('.popup__input_text_name'),
  autorJobeInput = userOverlay.querySelector('.popup__input_text_description'),
  userFormElement = userOverlay.querySelector('.popup__field'),
  cardsContainer = document.querySelector('.cards__container'),
  cardsTemplate = document.querySelector('.cards__template').content,
  cardOverlay = document.querySelector('.new-card'),
  newCardButton = document.querySelector('.user__button'),
//  cardCloseButton = document.querySelector('.new-card__button-close'),
  newCardName = document.querySelector('.new-card__input_text_name'),
  newCardElement = document.querySelector('.new-card__field'),
  imgPreview = document.querySelector('.preview-card'),
  imgLink = document.querySelector('.preview-card__picture'),
  imgCaption = document.querySelector('.preview-card__caption'),
  newCardLink = document.querySelector('.new-card__input_text_link'),
//  previewCloseBtn = document.querySelector('.preview-card__button-close');
  closeButtons = document.querySelectorAll('.popup__close');


const cards = initialCards.reverse();

function render() {
  cards.forEach(renderCard);
}

function renderCard(cards) {
  cardsContainer.prepend(createCard(cards));
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  autor.textContent = autorNameInput.value;
  jobeDescr.textContent = autorJobeInput.value;
  closeModal(userOverlay);
}

function createCard(item) {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardImageData = cardElement.querySelector('.cards__item-picture');
  cardImageData.src = item.link;
  cardImageData.alt = item.name;
  cardElement.querySelector('.cards__item-heading').textContent = item.name;
  setListeners(cardElement);

  return cardElement;
}

function setListeners(element) {
  element.querySelector('.cards__remover').addEventListener('click', handleRemove);
  element.querySelector('.cards__item-like').addEventListener('click', handleLike);
  element.querySelector('.cards__item-picture').addEventListener('click', handlePreview);
}

function handleRemove(evt) {
  evt.target.closest('.cards__item').remove();
}

function handleLike(evt) {
  evt.target.classList.toggle('cards__item-like_active');
}

function handlePreview(evt) {
  openModal(imgPreview);
  imgLink.src = evt.target.src;
  imgCaption.textContent = evt.target.alt;
  imgLink.alt = evt.target.alt;

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

function closeByClick (evt) {
  if (evt.target.classList.contains("popup_opened")) {
  closeModal(evt.target);
}
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
  document.addEventListener('mousedown', closeByClick);
}

function closeModal(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('mousedown', closeByClick);
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});


userOpenButton.addEventListener('click', openProfilePopup);
//userCloseButton.addEventListener('click', closeProfilePopup);
userFormElement.addEventListener('submit', handleProfileSubmit);
newCardButton.addEventListener('click', openCardPopup);
//cardCloseButton.addEventListener('click', closeCardPopup);
//previewCloseBtn.addEventListener('click', closePreview);
newCardElement.addEventListener('submit', handleCardSubmit);


render();


