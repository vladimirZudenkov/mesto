let openButton = document.querySelector('.user__edit-profile'),
    overlay = document.querySelector('.popup'),
    closeButton = overlay.querySelector('.popup__button-close'),
    autor = document.querySelector('.user__title'),
    jobeDescr = document.querySelector('.user__profession'),
    autorNameInput = overlay.querySelector('.popup__text_name'),
    autorJobeInput = overlay.querySelector('.popup__text_description'),
    formElement = overlay.querySelector('.popup__field');

function openModal() {
  overlay.classList.add('popup_opened');
  autorNameInput.value = autor.textContent;
  autorJobeInput.value = jobeDescr.textContent;
}

function closeModal() {
  overlay.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  autor.textContent = autorNameInput.value;
  jobeDescr.textContent = autorJobeInput.value;
  overlay.classList.remove('popup_opened');
}

openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
formElement.addEventListener('submit', handleFormSubmit);
