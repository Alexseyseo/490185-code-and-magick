'use strict';

// 1
var modal = document.querySelector('.setup');
modal.classList.remove('hidden');

// 2
var getRandomName = function () {
  var name = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surname = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var randomName = name[(Math.floor(Math.random() * name.length))] + ' ' + surname[(Math.floor(Math.random() * surname.length))];
  return randomName;
};
var getRandomColorCoat = function () {
  var color = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var randomColor = color[(Math.floor(Math.random() * color.length))];
  return randomColor;
};
var getRandomColorEyes = function () {
  var color = ['black', 'red', 'blue', 'yellow', 'green'];
  var randomColor = color[(Math.floor(Math.random() * color.length))];
  return randomColor;
};
var createNewHeroes = function (countHeroes) {
  var arrHeroes = [];
  for (var i = 1; i <= countHeroes; i++) {
    var hero = {
      name: getRandomName(),
      coatColor: getRandomColorCoat(),
      eyesColor: getRandomColorEyes()
    };

    arrHeroes.push(hero);
  }

  return arrHeroes;
};
var heroes = createNewHeroes(4);

// 3
var t = document.querySelector('#similar-wizard-template');
var item = t.content.querySelector('.setup-similar-item');

var renderHero = function (hero) {
  var heroItem = item.cloneNode(true);
  heroItem.querySelector('.setup-similar-label').textContent = hero.name;
  heroItem.querySelector('.wizard-coat').style.fill = hero.coatColor;
  heroItem.querySelector('.wizard-eyes').style.fill = hero.eyesColor;
  return heroItem;
};

// 4
var listContent = modal.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();
for (var i = 0; i < heroes.length; i++) {
  fragment.appendChild(renderHero(heroes[i]));
}
listContent.appendChild(fragment);

// 5
document.querySelector('.setup-similar').classList.remove('hidden');
