
const userOpenButton = document.querySelector('.user__edit-profile'),
  userOverlay = document.querySelector('.user-form'),
  userCloseButton = userOverlay.querySelector('.popup__button-close'),
  autor = document.querySelector('.user__title'),
  jobeDescr = document.querySelector('.user__profession'),
  autorNameInput = userOverlay.querySelector('.popup__input_text_name'),
  autorJobeInput = userOverlay.querySelector('.popup__input_text_description'),
  userFormElement = userOverlay.querySelector('.popup__field'),
  cardsContainer = document.querySelector('.cards__container'),
  cardsTemplate = document.querySelector('.cards__template').content,
  cardOverlay = document.querySelector('.new-card'),
  newCardButton = document.querySelector('.user__button'),
  cardCloseButton = document.querySelector('.new-card__button-close'),
  newCardName = document.querySelector('.new-card__input_text_name'),
  newCardElement = document.querySelector('.new-card__field'),
  imgPreview = document.querySelector('.preview-card'),
  imgLink = document.querySelector('.preview-card__picture'),
  imgCaption = document.querySelector('.preview-card__caption'),
  newCardLink = document.querySelector('.new-card__input_text_link'),
  previewCloseBtn = document.querySelector('.preview-card__button-close');


const cards = initialCards.reverse();

function render() {
  cards.forEach(renderCard);
}

function renderCard(cards) {
  cardsContainer.prepend(createCard(cards));
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  autor.textContent = autorNameInput.value;
  jobeDescr.textContent = autorJobeInput.value;
  closeModal(userOverlay);
}

function createCard(cards) {
  const cardsElement = cardsTemplate.cloneNode(true);
  cardsElement.querySelector('.cards__item-picture').src = cards.link;
  cardsElement.querySelector('.cards__item-picture').alt = cards.name;
  cardsElement.querySelector('.cards__item-heading').textContent = cards.name;
  setListeners(cardsElement);

  return cardsElement;
}

function setListeners(element) {
  element.querySelector('.cards__remover').addEventListener('click', handleRemover);
  element.querySelector('.cards__item-like').addEventListener('click', handleLike);
  element.querySelector('.cards__item-picture').addEventListener('click', handlePreview);
}

function handleRemover(evt) {
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
  addingCardClose();

  const addCardSubmitButton =  newCardElement.querySelector('.popup__button-save');
  addCardSubmitButton.classList.add('popup__button_disabled');
  newCardElement.reset();
}


function addingUserForm() {
  openModal(userOverlay);
  autorNameInput.value = autor.textContent;
  autorJobeInput.value = jobeDescr.textContent;
}

function addingCardForm() {
  openModal(cardOverlay);
  newCardElement.reset();

}

function closeByClick (evt) {
  const popUpActive = document.querySelector('.popup_opened');
  if (evt.target === popUpActive) {
  closeModal(popUpActive);
  }
}

function addingCardClose() {
  closeModal(cardOverlay);
}

function userFormClose() {
  closeModal(userOverlay);
}

function closingPreview() {
  closeModal(imgPreview);
}

function closePopupByEsc(evt) {
  const popUpActive = document.querySelector('.popup_opened');
  if (evt.key === "Escape" && popUpActive != null) {
     closeModal(popUpActive);
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

userOpenButton.addEventListener('click', addingUserForm);
userCloseButton.addEventListener('click', userFormClose);
userFormElement.addEventListener('submit', handleFormSubmit);
newCardButton.addEventListener('click', addingCardForm);
cardCloseButton.addEventListener('click', addingCardClose);
previewCloseBtn.addEventListener('click', closingPreview);
newCardElement.addEventListener('submit', handleCardSubmit);

render();


