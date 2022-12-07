export default class Section {
  constructor({ items, renderer }, containerSelector ) {
    this._items = items;
    this._render = renderer;
    this._container = containerSelector;
  }
  
  renderItems(data, userInfo) {
    this._card = data;
    this._card.forEach(({name, link, owner, likes, _id})  => {
    this._render(
        { title: name, image: link, owner: owner, likes: likes,
          id:_id, ownerId: userInfo.userId}
      );
    })
  }

  appendItem(element) {
    this._container.append(element);
   
  }

  prependItem(element) {
    this._container.prepend(element);
   
  }
}
