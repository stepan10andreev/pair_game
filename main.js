import {Card, AmazingCard} from './Сard.js'

(function() {
  let firstCard, secondCard;
  // функция создания начального массива чисел; c параметром - зависящего то количества карточек, введенного пользователем
  function getArrayOfNumber(amountNumber) {
    let initialArrayNumber = [];
    for (let count = 1; count <= amountNumber; count++) {
      initialArrayNumber.push(count);
      initialArrayNumber.push(count);
    }
    return initialArrayNumber;
  }

  // функция перемешивания чисел в массиве - алгоритма Фишера — Йетса
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // функция создания контейнера игры с карточками на основе класса
  function createGameCards(array, withImage) {
    let gameContainer = document.createElement('div');
    gameContainer.classList.add('game-container');
    document.body.append(gameContainer)
    if (withImage) {
      for (const item of array) {
        new AmazingCard(gameContainer, item, flip);
      }
    } else {
      for (const item of array) {
        new Card(gameContainer, item, flip);
      }
    }
    return gameContainer;
  }

  // функция создания формы в начале игры с полем для ввода и кнопкой - "начать игру"
  function createFormGame() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const title = document.createElement('h1');
    const subtitle = document.createElement('h2');
    const labelForcheckboxForTimeout = document.createElement('label');
    const checkboxForTimeout = document.createElement('input');
    const timeoutInput = document.createElement('input');
    const radioButtonWrapper = document.createElement('div');
    const labelForRadioButtonWithImage = document.createElement('label');
    const radioButtonWithImage = document.createElement('input');
    const labelForRadioButtonWithoutImage = document.createElement('label');
    const radioButtonWithoutImage = document.createElement('input');
    // content
    title.textContent = 'Игра в пары';
    subtitle.textContent = 'Выберите количество карточек по вертикали и горизонтали';
    button.textContent = 'Начать игру';
    // classes
    form.classList.add('form-game');
    labelForcheckboxForTimeout.classList.add('label-for-timeout-checkbox');
    labelForRadioButtonWithoutImage.classList.add('label-for-radio-without-image');
    labelForRadioButtonWithImage.classList.add('label-for-radio-with-image');
    radioButtonWrapper.classList.add('radio-btn-wrapper');
    input.classList.add('form-input');
    timeoutInput.classList.add('form-input');
    button.classList.add('btn-start');
    title.classList.add('form-title');
    subtitle.classList.add('form-subtitle');
    input.type = 'number';
    input.placeholder = 'Введите четное число от 2 до 10';
    timeoutInput.placeholder = 'Введите количество секунд (max - 300)';
    // attributes
    checkboxForTimeout.setAttribute('type', 'checkbox');
    timeoutInput.setAttribute('type', 'number');
    timeoutInput.setAttribute('max', '300');
    timeoutInput.setAttribute('min', '1');
    radioButtonWithImage.setAttribute('type', 'radio');
    radioButtonWithoutImage.setAttribute('type', 'radio');
    radioButtonWithImage.setAttribute('name', 'howToPlay');
    radioButtonWithoutImage.setAttribute('name', 'howToPlay');
    radioButtonWithoutImage.setAttribute('checked', 'true');
    // DOM
    form.append(title);
    form.append(input);
    form.append(subtitle);
    form.append(radioButtonWrapper);
    radioButtonWrapper.append(labelForRadioButtonWithImage);
    radioButtonWrapper.append(labelForRadioButtonWithoutImage);
    labelForRadioButtonWithImage.append(radioButtonWithImage);
    labelForRadioButtonWithoutImage.append(radioButtonWithoutImage);
    labelForRadioButtonWithImage.append('Играть с картинками');
    labelForRadioButtonWithoutImage.append('Играть с цифрами');
    labelForcheckboxForTimeout.append(checkboxForTimeout)
    labelForcheckboxForTimeout.append('Использовать/не использовать таймер');
    form.append(labelForcheckboxForTimeout);
    form.append(button);
    document.body.append(form);

    checkboxForTimeout.addEventListener('input', function(e) {
      if (checkboxForTimeout.checked) {
        button.before(timeoutInput)
      } else {
        timeoutInput.remove();
      }
    })

    return {
      form,
      input,
      button,
      title,
      radioButtonWithImage,
      checkboxForTimeout,
      timeoutInput
    }
  }

  // функция создания кнопки - "сыграть еще раз" после окончания игры
  function createRestartButton() {
    let button = document.createElement('button');
    let divOverlay = document.createElement('div');
    button.textContent = 'Сыграть еще раз';
    button.classList.add('btn-restart');
    divOverlay.classList.add('overlay');
    document.body.append(button);
    document.body.append(divOverlay);
    return {
      button,
      divOverlay
    }
  }
  // функция по клику на карточку с опредлением первой и второй нажатой карточки и  проверкой совпадения
  function flip(card) {
    if (!firstCard) {
      firstCard = card;
    } else {
        if (!secondCard) {
          secondCard = card
      }
    }
    checkCards(card)
    restart()
  }
  // функция проверки совпадения, использующаяся в функции flip
  function checkCards() {
    if (firstCard && secondCard) {
      if (firstCard.cardNumber === secondCard.cardNumber) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
      } else {
        setTimeout(() => {
          firstCard.open = false;
          secondCard.open = false;
          firstCard = null;
          secondCard = null;
        }, 1500);
      }
    }
  }

  // функция рестарта игры - удаления контейнера игре после того как все карты открыты
  // условие проверки все ли карты содержат класс автивности в контейнере - если выполняется - создаем кнопку "сыграть еще раз"
  function restart() {
    let formGame = document.querySelector('.form-game');
    let gameContainer = document.querySelector('.game-container');
    let cards = document.querySelectorAll('.card');
    let gameContainerArr = Array.from(cards);
    if (gameContainerArr.every(n => n.classList.contains('card--active'))) {
      let restartButton = createRestartButton();
      restartButton.button.addEventListener('click', function(){
        gameContainer.remove()
        formGame.classList.remove('hidden')
        restartButton.button.remove()
        restartButton.divOverlay.remove()
        restartButton.divOverlay.classList.add('hidden')
      })
    }
  }
  // функция таймера "время вышло"
  function timeIsOut(count) {
    setTimeout(() => {
      const gameContainer = document.querySelector('.game-container');
      const formGame = document.querySelector('.form-game');
      let restartButton = createRestartButton();
      let div = document.createElement('div')
      div.textContent = 'Время вышло((';
      restartButton.button.append(div)
      restartButton.button.addEventListener('click', function() {
        gameContainer.remove()
        formGame.classList.remove('hidden')
        restartButton.button.remove()
        restartButton.divOverlay.remove()
        restartButton.divOverlay.classList.add('hidden')
      })
    }, count);
  }

  // Инициализация игры
  document.addEventListener('DOMContentLoaded', function() {
    // Вывод формы в начале
    let formGame = createFormGame();
    // событие на клик по кнопке формы - "Начать игру"
    formGame.button.addEventListener('click', function(e) {
      // удаляем перезагрузку страницы по клику
      e.preventDefault();
      // вводим переменную со значение в инпуте, введенного пользователем
      let inputValue = formGame.input.value;
      // вводим условия введения в поле ввода корректных числе (данных) - от 2 до 10 и четное!
      if ((inputValue >=2) && (inputValue <=10) && ((inputValue % 2) == 0)) {
        // вычисляем значение amountNumber, необходимого для формирования начального массива чисел, в зависимости от того что ввел пользвоатель
        let amountNumber = Math.pow(inputValue, 2) / 2;
        // создаем начальный массив с помощью глобальной функцией и аргументом amountNumber в зависимости от ввода пользвоателя
        let initialArrayNumber = getArrayOfNumber(amountNumber);
        // перемешиваем полученный массив чисел
        let ArrayOfShuffleNumbers = shuffle(initialArrayNumber);
        // создаем игру - контейнер с карточками на основе полученного перемешанного массива? присваиваем переменной знаечние в зависимости от выбранной радиокнопки
        let gameContainer = formGame.radioButtonWithImage.checked ?  createGameCards(ArrayOfShuffleNumbers, true) : createGameCards(ArrayOfShuffleNumbers);
        // добавляем к контейнеру игры класс (grid) в зависимости от значения в поле ввода, введеного пользователем (определет размер игрового поля)
        gameContainer.classList.add(`grid-${inputValue}`)
        // gameContainer.classList.remove('hidden');
        // добавляем класс "невидимости" для формы после создания игры
        formGame.form.classList.add('hidden')
        // добавляем функцию таймера - по окончаию времени игра остановится (если нужно) - по условию если пользователь выбрал эту опцию, по умолчанию таймер на минуту
        if (formGame.checkboxForTimeout.checked) {
          if (formGame.timeoutInput.value && (formGame.timeoutInput.value > 0)) {
            let count = formGame.timeoutInput.value * 1000
            timeIsOut(count);
          } else {
            timeIsOut(60000);
          }
        }
      } else {
        // блок ИЛИ в случае если ввод в инпуте некорректный (вне диапазона от 2 до 10 или если нечетное число)
          formGame.input.value = 4;
      }
    })
  })
})();
