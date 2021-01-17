const quiz = [
  {
    question: '『枕草子』で「冬は〇〇〇」。〇に入る言葉は？',
    answers: [
      'あけぼの',
      '夜',
      '夕暮れ',
      'つとめて'
    ],
    correct: 'つとめて'
  },
  {
    question: 'アメリカの中央情報局を指す「CIA」の真ん中の「I」は何の略？',
    answers: [
      'infomation',
      'inteligence',
      'integration',
      'internatinal'
    ],
    correct: 'inteligence'
  }
];

const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.getElementsByTagName('button');
let buttonLength = $button.length;

// クイズの問題分、選択肢を定義
const setupQuiz = () => {
  document.getElementById('js-question').textContent = 'Q' + (quizIndex + 1) + '：' + quiz[quizIndex].question;
  let buttonIndex = 0;
  while (buttonIndex < buttonLength) {
    $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
    buttonIndex++;
  }
};
setupQuiz();

// ボタンイベント
const clickHandler = (e) => {
  console.log(e);
  if (quiz[quizIndex].correct === e.target.textContent) {
    window.alert('正解!');
    score++;
  } else {
    window.alert('不正解!');
  }

  quizIndex++;

  if (quizIndex < quizLength) {
    setupQuiz();
  } else {
    // document.getElementById("js-result").textContent = '終了!あなたの正解数は' + score + '/' + quizLength + 'です！';
    location.replace('../html/quizResult.html');

    // document.getElementById('js-result').textContent = '終了';
  }
};

// ボタンをクリックしたら正誤判定
handleIndex = 0;
while (handleIndex < buttonLength) {
  $button[handleIndex].addEventListener('click', clickHandler);
  handleIndex++;
};