'use strict';

var GOODS_KINDS = 26;
var GOODS_IN_BASKET = 3;
var GOODS_AMOUNT_MIN = 0;
var GOODS_AMOUNT_MAX = 20;
var GOODS_PRICE_MIN = 100;
var GOODS_PRICE_MAX = 1500;
var GOODS_WEIGHT_MIN = 30;
var GOODS_WEIGHT_MAX = 300;
var GOODS_RATING_MIN = 1;
var GOODS_RATING_MAX = 5;
var GOODS_VOTES_MIN = 20;
var GOODS_VOTES_MAX = 900;
var GOODS_ENERGY_MIN = 70;
var GOODS_ENERGY_MAX = 500;
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

var getRandomText = function (arr) {
  var contents = [];
  var ingredientsNum = getRandomNumber(INGREDIENTS_MIN, arr.length);

  for (var i = 0; i < ingredientsNum; i++) {
    contents.push(arr[i]);
  }

  return contents.join(', ');
};

var getGoodsList = function (goodsNum) {
  var goodsList = [];

  for (var i = 0; i < goodsNum; i++) {
    var goodsItem = {
      name: getRandomValue(names),
      picture: getRandomValue(pictures),
      amount: getRandomNumber(GOODS_AMOUNT_MIN, GOODS_AMOUNT_MAX),
      price: getRandomNumber(GOODS_PRICE_MIN, GOODS_PRICE_MAX),
      weight: getRandomNumber(GOODS_WEIGHT_MIN, GOODS_WEIGHT_MAX),
      rating: {
        value: getRandomNumber(GOODS_RATING_MIN, GOODS_RATING_MAX),
        number: getRandomNumber(GOODS_VOTES_MIN, GOODS_VOTES_MAX)
      },
      nutritionFacts: {
        sugar: getRandomBoolean(),
        energy: getRandomNumber(GOODS_ENERGY_MIN, GOODS_ENERGY_MAX),
        contents: getRandomText(ingredients)
      }
    };

    goodsList.push(goodsItem);
  }

  return goodsList;
};

var createCard = function (cardData) {
  var card = cardTemplate.cloneNode(true);
  var cardImg = card.querySelector('.card__img');
  var cardRating = card.querySelector('.stars__rating');
  var sugarPresence = (cardData.nutritionFacts.sugar) ? 'Содержит сахар. ' : 'Без сахара. ';

  if (cardData.amount <= 5 && cardData.amount >= 1) {
    card.classList.remove('card--in-stock');
    card.classList.add('card--little');
  } else if (cardData.amount === 0) {
    card.classList.remove('card--in-stock');
    card.classList.add('card--soon');
  }

  card.querySelector('.card__title').textContent = cardData.name;
  cardImg.src = 'img/cards/' + cardData.picture;
  cardImg.alt = cardData.name;
  card.querySelector('.card__price').innerHTML = cardData.price
  + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + cardData.weight + ' Г</span>';

  if (cardData.rating.value < GOODS_RATING_MAX) {
    cardRating.classList.remove('stars__rating--five');
    cardRating.classList.add('stars__rating--' + ratings[cardData.rating.value]);
    cardRating.textContent = (cardData.rating.value > GOODS_RATING_MIN) ? 'Рейтинг: ' + cardData.rating.value + ' звезды' : 'Рейтинг: ' + cardData.rating.value + ' звезда';
  }

  card.querySelector('.star__count').textContent = '(' + cardData.rating.number + ')';
  card.querySelector('.card__characteristic').textContent = sugarPresence + cardData.nutritionFacts.energy + ' ккал';
  card.querySelector('.card__composition-list').textContent = cardData.nutritionFacts.contents;

  return card;
};

var createChosenCard = function (cardData) {
  var chosenCard = chosenCardTemplate.cloneNode(true);
  var chosenCardImg = chosenCard.querySelector('.card-order__img');

  chosenCard.querySelector('.card-order__title').textContent = cardData.name;
  chosenCard.querySelector('.card-order__price').textContent = cardData.price + ' ₽';
  chosenCardImg.src = 'img/cards/' + cardData.picture;
  chosenCardImg.alt = cardData.name;

  return chosenCard;
};

var renderCards = function (goodsNum, createCardItem) {
  var cards = getGoodsList(goodsNum);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < cards.length; i++) {
    var card = createCardItem(cards[i]);
    fragment.appendChild(card);
  }

  return fragment;
};

var addCards = function () {
  var goodsCatalog = document.querySelector('.catalog__cards');

  goodsCatalog.appendChild(renderCards(GOODS_KINDS, createCard));
  goodsCatalog.classList.remove('catalog__cards--load');
  goodsCatalog.querySelector('.catalog__load').classList.add('visually-hidden');
};

var addChosenCards = function () {
  var chosenGoodsList = document.querySelector('.goods__cards');

  chosenGoodsList.appendChild(renderCards(GOODS_IN_BASKET, createChosenCard));
  chosenGoodsList.classList.remove('goods__cards--empty');
  chosenGoodsList.querySelector('.goods__card-empty').classList.add('visually-hidden');
};

addCards();
addChosenCards();
