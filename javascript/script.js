
const openButton = document.querySelector('.user__edit-profile'),
  overlay = document.querySelector('.popup'),
  closeButton = overlay.querySelector('.popup__button-close'),
  autor = document.querySelector('.user__title'),
  jobeDescr = document.querySelector('.user__profession'),
  autorNameInput = overlay.querySelector('.popup__input_text_name'),
  autorJobeInput = overlay.querySelector('.popup__input_text_description'),
  formElement = overlay.querySelector('.popup__field'),
  cardsContainer = document.querySelector('.cards__container'),
  cardsTemplate = document.querySelector('.cards__template').content,
  cardOverlay = document.querySelector('.new-card'),
  newCardButton = document.querySelector('.user__button'),
  cardCloseButton = document.querySelector('.new-card__button-close'),
  newCardName = document.querySelector('.new-card__text_name'),
  newCardElement = document.querySelector('.new-card__field'),
  imgPreview = document.querySelector('.preview-card'),
  imgLink = document.querySelector('.preview-card__picture'),
  imgCaption = document.querySelector('.preview-card__caption'),
  newCardLink = document.querySelector('.new-card__text_link'),
  previewCloseBtn = document.querySelector('.preview-card__button-close');

  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const cards = initialCards.reverse();

function render() {
  cards.forEach(createCards);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  autor.textContent = autorNameInput.value;
  jobeDescr.textContent = autorJobeInput.value;
  closeModal(overlay);
}

function createCards(cards) {
  const cardsElement = cardsTemplate.cloneNode(true);
  cardsElement.querySelector('.cards__item-picture').src = cards.link;
  cardsElement.querySelector('.cards__item-picture').alt = cards.name;
  cardsElement.querySelector('.cards__item-heading').textContent = cards.name;

  setListeners(cardsElement);
  cardsContainer.prepend(cardsElement);
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

}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardName.value,
    link: newCardLink.value
  };
  createCards(newCard);
  addingCardClose();
}


function addingUserForm() {
  openModal(overlay);
  autorNameInput.value = autor.textContent;
  autorJobeInput.value = jobeDescr.textContent;
}

function addingCardForm() {
  openModal(cardOverlay);
  newCardName.value = "Название";
  newCardLink.value = "Ссылка на картинку";
}


function addingCardClose() {
  closeModal(cardOverlay);
}

function userFormClose() {
  closeModal(overlay);
}

function closingPreview() {
  closeModal(imgPreview);
}

function openModal(item) {
  item.classList.add('popup_opened');
}

function closeModal(item) {
  item.classList.remove('popup_opened');
}

openButton.addEventListener('click', addingUserForm);
closeButton.addEventListener('click', userFormClose);
formElement.addEventListener('submit', handleFormSubmit);
newCardButton.addEventListener('click', addingCardForm);
cardCloseButton.addEventListener('click', addingCardClose);
previewCloseBtn.addEventListener('click', closingPreview);
newCardElement.addEventListener('submit', handleCardSubmit);

render();


