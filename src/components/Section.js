export default class Section {

  constructor({ items,renderer }, containerSelector) {
    this._items = items;
    this._render = renderer;
    this._container = containerSelector;

  }
  renderer() {
    this._items.forEach(item => this._render(item));
  }

  addingCard(element) {
    this._container.prepend(element);
  }

}
