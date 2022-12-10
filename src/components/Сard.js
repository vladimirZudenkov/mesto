export default class Card {
  constructor(
    cards,
    handlePreview,
    templateData,
    { handleLikeClick, handleDeleteLikeClick, handleDeleteCard }
  ) {
    this._name = cards.title;
    this._link = cards.image;
    this._handlePreview = handlePreview;
    this._templateData = templateData;
    this._id = cards.id;
    this.ownerId = cards.owner._id;
    this.owner = cards.ownerId;
    this._likes = cards.likes;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    const cardElement = this._templateData
      .querySelector(".cards__item")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".cards__item-picture");
    this._cardLike = this._element.querySelector(".cards__item-like");
    this._cardRemove = this._element.querySelector(".cards__remover");
    this._element.querySelector(".cards__item-heading").textContent =
      this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._checkPropertyIdCard();
    this.setupLikeCount();
    this._setListeners();
    this._checkLiked();

    return this._element;
  }

  _setListeners() {
    this._cardRemove.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handlePreview(this._name, this._link);
    });

    this._cardLike.addEventListener("click", () => {
      if (this._cardLike.classList.contains("cards__item-like_active")) {
        this._dislike();
      } else {
        this._like();
      }
    });
  }

  deleteElementCard() {
    this._handleRemoove();
  }

  _handleRemoove() {
    this._element.remove("cards__item");
    this._element = null;
  }

  setupLikeCount() {
    this._element.querySelector(".cards__like-count").textContent = String(
      this._likes.length
    );
  }

  _checkPropertyIdCard() {
    if (this.ownerId !== this.owner) {
      this._deleteCard();
    }
  }

  _deleteCard() {
    this._element.querySelector(".cards__remover").remove();
  }

  _dislike() {
    this._removeLikedClass();
    this._handleDeleteLikeClick(this._likes);
  }

  _like() {
    this._addLikedClass();
    this._handleLikeClick(this._likes);
  }

  _checkLiked() {
    this._likes.forEach((like) => {
      if (like._id === this.owner) {
        this._addLikedClass();
      }
    });
  }

  _removeLikedClass() {
    this._cardLike.classList.remove("cards__item-like_active");
  }

  _addLikedClass() {
    this._cardLike.classList.add("cards__item-like_active");
  }
}
