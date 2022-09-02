let openButton = document.querySelector('.user__edit-profile'),
    overlay = document.querySelector('.popup'),
    closeButton = overlay.querySelector('.popup__button-close'),
    autor = document.querySelector('.user__title'),
    jobeDescr = document.querySelector('.user__profession'),
    nameInput = document.querySelector('.popup__text_name'),
    jobeInput = document.querySelector('.popup__text_description'),
    formElement = overlay.querySelector('.popup__field');

function openModal() {
  overlay.classList.add('popup_opened');
  nameInput.value = autor.textContent;
  jobeInput.value = jobeDescr.textContent;
}

function closeModal() {
  overlay.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  autor.textContent = nameInput.value;
  jobeDescr.textContent = jobeInput.value;
  overlay.classList.remove('popup_opened');
}

openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
formElement.addEventListener('submit', handleFormSubmit);
