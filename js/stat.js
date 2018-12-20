'use strict';

var CLOUD_X = 100; // координата X начала облака
var CLOUD_Y = 10; // координата Y начала облака
var CLOUD_WIDTH = 420; // Ширина облака
var CLOUD_HEIGTH = 270; // Высота облака
var CLOUD_PADDING_X = 55; // Горизонтальный внутренний отступ облака
var CLOUD_PADDING_Y = 30; // Вертикальный внутренний отстпу облака
var TEXT_HEIGHT = 20; // Высота одной текстовой строки
var HISTOGRAM_HEIGTH = 150; // Максимальная высота гистограммы
var COLUMN_WIDTH = 40; // Ширина колонки гистограммы для одного пользователя
var COLUMN_GAP = 50; // Отступ между колонками в гистограмме

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGTH);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getArrayStrings = function (str) {
  var arrStrings = str.split('\n');
  return arrStrings;
};

var renderHeading = function (ctx, str) {
  var lines = getArrayStrings(str);
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], CLOUD_X + CLOUD_PADDING_X, CLOUD_Y + CLOUD_PADDING_Y + (TEXT_HEIGHT * i));
  }
};

window.renderStatistics = function (ctx, names, times) {
  var heading = 'Ура вы победили!\nСписок результатов:'; // Задаем строку поздравления
  var numberHeaderLines = getArrayStrings(heading).length; // Получаем количество строк в заголовке для дальнейших подсчетов
  var histogramY = CLOUD_Y + CLOUD_PADDING_Y + (TEXT_HEIGHT * numberHeaderLines) + TEXT_HEIGHT; // Получаем верхнюю координату для гистограммы относительно того, сколько будет строк в заголовке поздравления и добавляем еще отступ(TEXT_HEIGHT) для размещения резульатта
  var maxTime = getMaxElement(times); // Получаем максимальное время среди всех игроков

  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)'); // рисуем тень облака
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); // рисуем фон облака
  renderHeading(ctx, heading); // рисуем заголовк поздравления

  ctx.font = '16px PT Mono';
  for (var i = 0; i < names.length; i++) {
    var paddingTopHistogram = HISTOGRAM_HEIGTH - (HISTOGRAM_HEIGTH * times[i]) / maxTime; // подсчет отступа для выравнивания блоков по нижней линии
    var playerX = CLOUD_X + CLOUD_PADDING_X + (COLUMN_WIDTH + COLUMN_GAP) * i; // Т.к. код повторяется для каждого элемента, вынес в отдельную переменную координату X для отдельного игрока

    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], playerX, histogramY + HISTOGRAM_HEIGTH + TEXT_HEIGHT);
    // Вопрос: Т.к. нам надо еще округлить время, будет ли правильнее убрать выражение(Math.round(times[i])) в переменную, а сюда вставлять саму переменную, для читабельности?
    ctx.fillText(Math.round(times[i]), playerX, histogramY + paddingTopHistogram - 10);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var randomOpacity = Math.ceil((Math.random() * 10)) / 10;
      ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';
    }

    ctx.fillRect(playerX, histogramY + paddingTopHistogram, COLUMN_WIDTH, (HISTOGRAM_HEIGTH * times[i]) / maxTime);
  }
};
