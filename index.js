const container = document.querySelector(".container__inner"),
  countDiv = document.querySelector(".count"),
  startTest = document.querySelector(".start__test"),
  timer = document.querySelector(".time");

let count = 0;
let startDate;
let timeOfTest;
let timerInterval;

const question = [
  {
    text: "В каком году была Бородинская битва?",
    img: "./borodino.jpg",
    answers: ["1945", "1917", "1812", "1807"],
    right: 2,
  },
  {
    text: "Какая опреационная система используется в компьютерах Apple?",
    answers: ["MacOS", "Windows", "IOS", "Android"],
    right: 0,
  },
  {
    text: "В каком году началась Великая Отечественная война?",
    img: "./vov.jpg",
    answers: ["1945", "1939", "1941", "1943"],
    right: 2,
  },
  {
    text: 'Кто автор цитаты "государство - это я!"?',
    answers: ["В.Ленин", "Людовик XIV", "Николай II", "Фридрих Барбаросса"],
    right: 1,
  },
  {
    text: 'Автор произведения "Преступление и наказание"?',
    img: "./90.jpeg",
    answers: ["А.Пушкин", "К.Маркс", "М.Лермонтов", "Ф.Достоевский"],
    right: 3,
  },
  {
    text: "Язык гипертекстовой разметки:",
    answers: ["JavaScript", "HTML", "JAVA", "C++"],
    right: 1,
  },
  {
    text: "В честь чего был назван язык Python?",
    answers: ["ТВ передачи", "Змеи", "Слона", "Фамилии разработчика"],
    img: "./py.png",
    right: 0,
  },
  {
    text: "Как называлась первая ядерная бомба, сброшенная на Хиросиму?",
    img: "./Little_boy.jpg",
    answers: ["Толстяк", "Здоровяк", "Добряк", "Малыш"],
    right: 3,
  },
  {
    text: "Как звали короля, завоевавшего Англию в 1066 году?",
    answers: ["Иоанн", "Карл", "Вильгельм", "Георг"],
    img: "./wilgelm.webp",
    right: 2,
  },
  {
    text: "Какую битву проиграл Ганнибал Сципиону?",
    answers: ["При Каннах", "При Заме", "При Гавгамелах", "При Риме"],
    img: "./hanibal.jpg",
    right: 1,
  },
  {
    text: "Как звали любимого коня Александра Великого?",
    img: "./0-1.jpg",
    answers: ["Буцефал", "Боцык", "Тхожей", "Филипп"],
    right: 0,
  },
  {
    text: "Как звали коня Сосруко?",
    answers: ["Шхьоуей", "Боцык", "Тхожей", "Армес"],
    right: 2,
  },
  {
    text: "Какой герой нартского эпоса погиб от стрелы?",
    img: "./badinoko.jpg",
    answers: ["Бадыноко", "Ашамаз", "Сосруко", "Бэтэрэз"],
    right: 0,
  },
  {
    text: "Что означает имя Кухулин?",
    answers: ["Бык Кулана", "Лев Кулана", "Пес Кулана", "Орел Кулана"],
    right: 2,
  },
  {
    text: "В какой спецификации JS появились классы?",
    answers: ["ES6", "ES7", "ES8", "ES5"],
    right: 0,
  },
  {
    text: 'Верно ли сравнение: "ёжик" > "яблоко" в JS?',
    answers: ["да", "нет", "Зависит от локальных настроек браузера."],
    right: 0,
  },
];

let questions = [];
questions = newArr();

function newArr() {
  for (let j = questions.length; j < 3; j++) {
    let item = Math.floor(Math.random() * question.length);
    if (questions.includes(question[item])) {
      item = Math.floor(Math.random() * question.length);
    }
    if (!questions.includes(question[item])) {
      questions.push(question[item]);
    }
    if (questions.length < 5) {
      item = Math.floor(Math.random() * question.length);
      if (questions.includes(question[item])) {
        item = Math.floor(Math.random() * question.length);
      }
      if (!questions.includes(question[item])) {
        questions.push(question[item]);
      }
    }
  }
  console.log(questions);
  return questions;
}

countDiv.innerHTML = 1 + " из " + questions.length;

let currentQues = 0;

const itemRender = ({ text, answers, img }) => {
  const ques = answers.map((i, index) => {
    let a = `<div class='q_item item${index}'>${i}</div>`;
    return a;
  });

  const image = img ? `<div class='image'><img src=${img} ></div>` : "";

  const item = `
        ${image}
        <div class='answer'>${text}</div>
        <div class='ques'>
            ${ques}
        </div>
    `;
  return item.split(",").join("");
};

const clickHandler = (e, c) => {
  let item = document.querySelector(`.item${e}`);
  if (e === questions[c].right) {
    count++;
    item.classList.add("right");
  } else {
    item.classList.add("wrong");
  }
  document.querySelector(`.item${questions[c].right}`).classList.add("right");

  currentQues++;

  if (currentQues + 1 <= questions.length)
    countDiv.innerHTML = currentQues + 1 + " из " + questions.length;
  setTimeout(() => next(currentQues), 1000);
};

const render = (c) => {
  startDate = new Date();
  container.innerHTML = itemRender(questions[c]);
  questions[c].answers.forEach((i, index) => {
    let item = document.querySelector(`.item${index}`);
    item.addEventListener("click", () => clickHandler(index, c), {
      once: true,
    });
    item.removeEventListener("click", () => clickHandler(index, c));
  });
};

function next(e) {
  if (e >= questions.length) {
    end();
  }

  render(e);
}

countDiv.addEventListener("click", () => {
  currentQues++;
  if (currentQues + 1 <= questions.length)
    countDiv.innerHTML = currentQues + 1 + " из " + questions.length;
  setTimeout(() => next(currentQues), 500);
});

function end() {
  // let stopDate = new Date()
  // timeOfTest = stopDate - startDate
  if (startDate > 59) {
    timeOfTest =
      Math.floor(startDate / 60) + " минут, " + (startDate % 60) + " секунд";
  } else {
    timeOfTest = startDate + " секунд";
  }

  let res = `
        <div class='result'>
            Правильные ответы: ${count} из ${questions.length}
        </div>
        <div onclick='retry()' class = 'endBtn'>Попробовать еще раз</div>
        <div class='date'>Время теста: ${timeOfTest}</div>
    `;

  container.innerHTML = res;
  countDiv.innerHTML = "";
  clearInterval(timerInterval);
}

function retry() {
  startDate = new Date();
  currentQues = 0;
  count = 0;

  questions = [];
  questions = newArr();
  console.log(questions);
  tick();
  render(0);
}

function start() {
  newArr();
  render(0);
  tick();
}

function tick() {
  let i = 0;
  timerInterval = setInterval(() => {
    i++;
    if (i > 59) {
      timer.innerHTML =
        "Время теста: " +
        Math.floor(i / 60) +
        " минут, " +
        (i % 60) +
        " секунд";
    } else {
      timer.innerHTML = "Время теста: " + i + " секунд";
    }

    startDate = i;
  }, 1000);
  return timerInterval;
}

newArr();

startTest.addEventListener("click", start);
