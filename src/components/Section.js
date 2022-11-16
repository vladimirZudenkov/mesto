export default class Section {

  constructor({ items,renderer }, containerSelector) {
    this._items = items;
    this._render = renderer;
    this._container = containerSelector;
  }
  
  renderItems() {
    this._items.forEach(item => this._render(item));
  }
  addItem(element) {
    this._container.prepend(element);
  }
}
