'use strict';

class CardList {

  constructor(container) {
    this.container = container;
    this.addCard = this.addCard.bind(this);
  }

  render(cards) {
    cards.forEach(item => {
      this.addCard(item);
    });
  }

  addCard(newCard) {
    this.container.appendChild(newCard);
  }

}
