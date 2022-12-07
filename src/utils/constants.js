 export const formConfig = ({
  formSelector: '.popup__field',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active'
});

export const ESC = 'Escape';



export const userOpenButton = document.querySelector('.user__edit-profile'),
  userOverlay = document.querySelector('.user-form'),
 // autor = document.querySelector('.user__title'),
 // jobeDescr = document.querySelector('.user__profession'),
  autorNameInput = userOverlay.querySelector('.popup__input_text_name'),
  autorJobeInput = userOverlay.querySelector('.popup__input_text_description'),
  userFormElement = userOverlay.querySelector('.popup__field'),
  cardsContainer = document.querySelector('.cards__container'),
  cardsTemplate = document.querySelector('.cards__template').content,
  newCardButton = document.querySelector('.user__button'),
  userAvatarButton = document.querySelector('.user__avatar-overlay'),
  newCardElement = document.querySelector('.new-card__field'),
  newAvatarElement = document.querySelector('.user-avatar__field')
 
 