'use strict';

var GOODS_KINDS = 26;
var GOODS_IN_BASKET = 3;
var GOODS_MIN = 0;
var GOODS_MAX = 20;
var GOOD_PRICE_MIN = 100;
var GOOD_PRICE_MAX = 1500;
var GOOD_WEIGHT_MIN = 30;
var GOOD_WEIGHT_MAX = 300;
var GOOD_RATING_MIN = 1;
var GOOD_RATING_MAX = 5;
var GOOD_VOTES_MIN = 20;
var GOOD_VOTES_MAX = 900;
var GOOD_ENERGY_MIN = 70;
var GOOD_ENERGY_MAX = 500;
var INGREDIENTS_MIN = 3;

var names = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];

var pictures = [
  'gum-cedar.jpg',
  'gum-chile.jpg',
  'gum-eggplant.jpg',
  'gum-mustard.jpg',
  'gum-portwine.jpg',
  'gum-wasabi.jpg',
  'ice-cucumber.jpg',
  'ice-eggplant.jpg',
  'ice-garlic.jpg',
  'ice-italian.jpg',
  'ice-mushroom.jpg',
  'ice-pig.jpg',
  'marmalade-beer.jpg',
  'marmalade-caviar.jpg',
  'marmalade-corn.jpg',
  'marmalade-new-year.jpg',
  'marmalade-sour.jpg',
  'marshmallow-bacon.jpg',
  'marshmallow-beer.jpg',
  'marshmallow-shrimp.jpg',
  'marshmallow-spicy.jpg',
  'marshmallow-wine.jpg',
  'soda-bacon.jpg',
  'soda-celery.jpg',
  'soda-cob.jpg',
  'soda-garlic.jpg',
  'soda-peanut-grapes.jpg',
  'soda-russian.jpg'
];

var ingredients = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var ratings = {
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four'
};

var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
var chosenCardTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomBoolean = function () {
  return Math.random() >= 0.5;
};

var getRandomText = function (arr, stringsMin) {
  var text = [];
  var randomLength = getRandomNumber(stringsMin, arr.length);

  for (var i = 0; i < randomLength; i++) {
    text.push(arr[i]);
  }

  return text.join(', ');
};

var getGoodsList = function () {
  var goodsList = [];

  for (var i = 0; i < GOODS_KINDS; i++) {
    var goodsItem = {
      name: getRandomValue(names),
      picture: getRandomValue(pictures),
      amount: getRandomNumber(GOODS_MIN, GOODS_MAX),
      price: getRandomNumber(GOOD_PRICE_MIN, GOOD_PRICE_MAX),
      weight: getRandomNumber(GOOD_WEIGHT_MIN, GOOD_WEIGHT_MAX),
      rating: {
        value: getRandomNumber(GOOD_RATING_MIN, GOOD_RATING_MAX),
        number: getRandomNumber(GOOD_VOTES_MIN, GOOD_VOTES_MAX)
      },
      nutritionFacts: {
        sugar: getRandomBoolean(),
        energy: getRandomNumber(GOOD_ENERGY_MIN, GOOD_ENERGY_MAX),
        contents: getRandomText(ingredients, INGREDIENTS_MIN)
      }
    };

    goodsList.push(goodsItem);
  }

  return goodsList;
};

var createCard = function (goodItem) {
  var card = cardTemplate.cloneNode(true);
  var cardImg = card.querySelector('.card__img');
  var cardRating = card.querySelector('.stars__rating');
  var sugarPresence = (goodItem.nutritionFacts.sugar) ? 'Содержит сахар. ' : 'Без сахара. ';

  if (goodItem.amount <= 5 && goodItem.amount >= 1) {
    card.classList.remove('card--in-stock');
    card.classList.add('card--little');
  } else if (goodItem.amount === 0) {
    card.classList.remove('card--in-stock');
    card.classList.add('card--soon');
  }

  card.querySelector('.card__title').textContent = goodItem.name;
  cardImg.src = 'img/cards/' + goodItem.picture;
  cardImg.alt = goodItem.name;
  card.querySelector('.card__price').innerHTML = goodItem.price
  + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + goodItem.weight + ' Г</span>';

  if (goodItem.rating.value < GOOD_RATING_MAX) {
    cardRating.classList.remove('stars__rating--five');
    cardRating.classList.add('stars__rating--' + ratings[goodItem.rating.value]);
    cardRating.textContent = (goodItem.rating.value > GOOD_RATING_MIN) ? 'Рейтинг: ' + goodItem.rating.value + ' звезды' : 'Рейтинг: ' + goodItem.rating.value + ' звезда';
  }

  card.querySelector('.star__count').textContent = '(' + goodItem.rating.number + ')';
  card.querySelector('.card__characteristic').textContent = sugarPresence + goodItem.nutritionFacts.energy + ' ккал';
  card.querySelector('.card__composition-list').textContent = goodItem.nutritionFacts.contents;

  return card;
};

var createChosenCard = function (goodItem) {
  var chosenCard = chosenCardTemplate.cloneNode(true);
  var chosenCardImg = chosenCard.querySelector('.card-order__img');

  chosenCard.querySelector('.card-order__title').textContent = goodItem.name;
  chosenCard.querySelector('.card-order__price').textContent = goodItem.price + ' ₽';
  chosenCardImg.src = 'img/cards/' + goodItem.picture;
  chosenCardImg.alt = goodItem.name;

  return chosenCard;
};

var getCardsFragment = function (goodsCount, createCardElement) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < goodsCount; i++) {
    var card = createCardElement(cards[i]);
    fragment.appendChild(card);
  }

  return fragment;
};

var renderCards = function () {
  var goodsCatalog = document.querySelector('.catalog__cards');

  goodsCatalog.appendChild(getCardsFragment(GOODS_KINDS, createCard));
  goodsCatalog.classList.remove('catalog__cards--load');
  goodsCatalog.querySelector('.catalog__load').classList.add('visually-hidden');
};

var renderChosenCards = function () {
  var chosenGoodsList = document.querySelector('.goods__cards');

  chosenGoodsList.appendChild(getCardsFragment(GOODS_IN_BASKET, createChosenCard));
  chosenGoodsList.classList.remove('goods__cards--empty');
  chosenGoodsList.querySelector('.goods__card-empty').classList.add('visually-hidden');
};

var cards = getGoodsList();
renderCards();
renderChosenCards();
