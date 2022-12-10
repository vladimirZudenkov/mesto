import "../pages/index.css";
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import {
  formConfig,
  userOpenButton,
  autorNameInput,
  autorJobeInput,
  userFormElement,
  cardsContainer,
  cardsTemplate,
  newCardButton,
  newCardElement,
  userAvatarButton,
  newAvatarElement,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "41fe127a-ff59-48a7-b930-14bf98ee0a17",
    "Content-Type": "application/json",
  },
};

const api = new Api(apiConfig);

const authorInfo = new UserInfo(
  ".user__profession",
  ".user__title",
  ".user__avatar"
);
const userValidate = new FormValidator(formConfig, userFormElement);
const cardValidate = new FormValidator(formConfig, newCardElement);
const avatarValidate = new FormValidator(formConfig, newAvatarElement);
const imagePopup = new PopupWithImage(".preview-card");

const ownerForm = new PopupWithForm(".user-form", (data) => {
  handleProfileSubmit(data);
});

const cardForm = new PopupWithForm(".new-card", (data) => {
  handleCardSubmit(data);
});

const userAvatar = new PopupWithForm(".user-avatar", (data) => {
  handleAvatarSubmit(data);
});

api
  .getData()
  .then(([cardsData, userData]) => {
    authorInfo.setUserInfo(userData);
    cardsList.renderItems(cardsData, authorInfo);
  })
  .catch((error) => {
    console.log(error);
  });

function handleAvatarSubmit(data) {
  userAvatar.renderLoading(true);
  api
    .changeAvatar(data.avatar)
    .then((data) => {
      authorInfo.setAvatar(data.avatar);
      userAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      userAvatar.renderLoading(false);
    });
}

function handleProfileSubmit(data) {
  ownerForm.renderLoading(true);
  api
    .setUserData(data.user, data.about)
    .then((data) => {
      authorInfo.setUserInfo(data);
      ownerForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      ownerForm.renderLoading(false);
    });
}

const cardsList = new Section(
  {
    renderer: (cards) => {
      cardsList.appendItem(renderCards(cards));
    },
  },
  cardsContainer
);

function handleCardSubmit(formData) {
  cardForm.renderLoading(true);
  api
    .postUserCard(formData)
    .then((data) => {
      const card = {
        title: data.name,
        image: data.link,
        owner: data.owner,
        id: data._id,
        likes: data.likes,
        ownerId: data.owner._id,
      };

      cardsList.prependItem(renderCards(card));
      cardForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardForm.renderLoading(false);
    });
}

const popupWithSubmit = new PopupWithConfirmation(".delete-card");

function renderCards(cards) {
  const dataCard = new Card(cards, handlePreview, cardsTemplate, {
    handleLikeClick: () => {
      api
        .addLike(cards.id)
        .then(({ likes }) => {
          dataCard.setupLikeCount((cards.likes.length = likes.length));
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleDeleteLikeClick: () => {
      api
        .remooveLike(cards.id)
        .then(({ likes }) => {
          dataCard.setupLikeCount((cards.likes.length = likes.length));
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleDeleteCard: (data) => {
      popupWithSubmit.setSubmit(() => {
        api
          .remooveCard(data._id)
          .then(() => {
            data.deleteElementCard();
            popupWithSubmit.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
      popupWithSubmit.open();
    },
  });

  const cardElement = dataCard.generateCard();
  return cardElement;
}

function handlePreview(name, link) {
  imagePopup.open(name, link);
}

function openProfilePopup() {
  const info = authorInfo.getUserInfo();
  autorNameInput.value = info.user;
  autorJobeInput.value = info.about;
  ownerForm.open();
  userValidate.resetValidation();
}

function openCardPopup() {
  cardForm.open();
  cardValidate.resetValidation();
}

function openAvatarPopup() {
  userAvatar.open();
  avatarValidate.resetValidation();
}

popupWithSubmit.setEventListeners();

userValidate.enableValidation();
cardValidate.enableValidation();
avatarValidate.enableValidation();
ownerForm.setEventListeners();
cardForm.setEventListeners();
userAvatar.setEventListeners();
imagePopup.setEventListeners();

userOpenButton.addEventListener("click", openProfilePopup);
newCardButton.addEventListener("click", openCardPopup);
userAvatarButton.addEventListener("click", openAvatarPopup);
