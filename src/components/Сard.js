
export default class Card {
  constructor(cards, handlePreview, templateData) {
    this._name = cards.name;
    this._link = cards.link;
    this._handlePreview = handlePreview;
    this._templateData = templateData;
  }

  _getTemplate() {
    const cardElement = this._templateData.querySelector('.cards__item')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.cards__item-picture');
    this._cardLike = this._element.querySelector('.cards__item-like');
    this._cardRemove = this._element.querySelector('.cards__remover');
    this._element.querySelector('.cards__item-heading').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setListeners();
    return this._element;   
  }

  _setListeners() {
    this._cardRemove.addEventListener('click', () => {
      this._handleRemoove();
    });
    this._cardLike.addEventListener('click', () => {
      this._handleLike();
    });
    this._cardImage.addEventListener('click', () => {
      this._handlePreview(this._name, this._link);
    });
  }

  _handleRemoove() {
    this._element.remove('cards__item');
    this._element = null;
  }

  _handleLike() {
    this._element.querySelector('.cards__item-like').classList.toggle('cards__item-like_active');
  }
}
