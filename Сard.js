export class Card {
  _open = false;
  _success = false;

  constructor(container, cardNumber, fn) {
    this.card = this.createElement()
    this.cardNumber = cardNumber;
    container.append(this.card)

    this.card.addEventListener('click', (e) => {
      if (this.open === false && this.success === false) {
        const activeCard = document.querySelectorAll('.card--active')
        let activeCardArray = Array.from(activeCard);
        // console.log(activeCard)
        // console.log(successCard)

        if (((activeCard.length % 2) === 0) && (!activeCardArray.every(n => n.classList.contains('succes')))) return

        // обязательно добавлять класс, так как первичное изменние open на true не добавит класс
        this.card.classList.add('card--active');
        this._open = true
        fn(this)
        // console.log(this)
      }
    })
  }

  createElement() {
    const card = document.createElement('button');
    const backSideCard = document.createElement('div');
    const frontSideCard = document.createElement('div');
    card.classList.add('card');
    backSideCard.classList.add('back-side');
    frontSideCard.classList.add('front-side');
    card.append(frontSideCard);
    card.append(backSideCard);
    return card
  }

  set cardNumber(value) {
    this._cardNumber = value
    this.card.children[1].textContent = this._cardNumber
  }

  get cardNumber() {
    return this._cardNumber
  }

  set open(value) {
    this._open = value
    if (value) {
      this.card.classList.add('card--active');
    } else {
      this.card.classList.remove('card--active');
    }
    // // сокращщенно
    // value ? this.card.classList.add('card--active') : this.card.classList.remove('card--active');
  }

  get open() {
    return this._open
  }

  // аналогично open
  set success(value) {
    this._success = value
    // добавление класса необходимо чтобы добавить условие, если 2 карты открыты нельзя нажимать на другие карты
    if (value) {
      this.card.classList.add('succes');
    }
  }

  get success() {
    return this._success
  }
}




export class AmazingCard extends Card {
  set cardNumber(value) {
    this._cardNumber = value
    const cardsImgArray = [
      '/img/cat1.webp',
      '/img/cat2.webp',
      '/img/cat3.webp',
      '/img/cat4.webp',
      '/img/cat5.webp',
      '/img/cat6.webp',
      '/img/cat7.webp',
      '/img/cat8.webp',
      '/img/cat9.webp',
      '/img/cat10.webp',
      '/img/cat11.png',
      '/img/cat12.webp',
      '/img/cat13.webp',
      '/img/cat14.webp',
      '/img/cat15.png',
      '/img/cat16.webp',
      '/img/cat17.webp',
      '/img/cat18.webp',
      '/img/cat19.webp',
      '/img/cat20.webp',
      '/img/cat21.png',
      '/img/cat22.webp',
      '/img/cat23.webp',
      '/img/cat24.png',
      '/img/cat25.png',
      '/img/cat26.webp',
      '/img/cat27.webp',
      '/img/cat28.webp',
      '/img/cat29.webp',
      '/img/cat30.webp',
      '/img/cat31.webp',
      '/img/cat32.png',
      '/img/cat33.png',
      '/img/cat34.webp',
      '/img/cat35.webp',
      '/img/cat36.webp',
      '/img/cat37.webp',
      '/img/cat38.webp',
      '/img/cat39.webp',
      '/img/cat40.png',
      '/img/cat41.webp',
      '/img/cat42.png',
      '/img/cat43.png',
      '/img/cat44.webp',
      '/img/cat45.webp',
      '/img/cat46.webp',
      '/img/cat47.webp',
      '/img/cat48.webp',
      '/img/cat49.webp',
      '/img/cat50.webp',
    ]
    const img = document.createElement('img');
    img.src = cardsImgArray[value - 1];
    // загрузка дефолтного изображения при ошибке загрузки изображений
    img.onerror = function() {
      const error = new Error('Ошибка во время загрузки изображения для карточки')
      console.log(error)
      img.src = './default.jpg'
    };
    // дополнительные стили при картинках (увеличенный размер карточек)
    this.card.style = 'width: 50px; height: 70px;'
    this.card.children[1].style = 'background-color: white;'
    this.card.children[1].append(img)
  }
  get cardNumber() {
    return this._cardNumber
  }
}

