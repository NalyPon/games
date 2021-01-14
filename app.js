const quiz = [
  {
    question: '地球で一番高い山は？',
    answers: [
      'K2',
      'エベレスト',
    ],
    correct: 'エベレスト'
  }, {
    question: 'アドレス長が128ビットなのは？',
    answers: [
      'IPv4',
      'IPv6',
    ],
    correct: 'IPv6'
  }, {
    question: '沼田の長所は？',
    answers: [
      '左ケツ',
      '右ケツ',
    ],
    correct: '左ケツ'
  }
];

const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.getElementsByTagName('button');
let buttonLength = $button.length;

// クイズの問題分、選択肢を定義
const setupQuiz = () => {
  document.getElementById('js-question').textContent = quiz[quizIndex].question;
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
    window.alert('終了!あなたの正解数は' + score + '/' + quizLength + 'です！');
    window.close();
  }
};

// ボタンをクリックしたら正誤判定
handleIndex = 0;
while (handleIndex < buttonLength) {
  $button[handleIndex].addEventListener('click', clickHandler);
  handleIndex++;
};