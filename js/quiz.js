const quiz = [
  {
    question: 'Instagramの名前の由来知ってる？',
    answers: [
      'instant telegram',
      'は？',
    ],
    correct: 'instant telegram'
  }, {
    question: 'なりこーって天才だよね？',
    answers: [
      'それな。',
      '大丈夫そ？',
    ],
    correct: 'それな。'
  }, {
    question: 'なりこーについてどう思う？',
    answers: [
      'くそ',
      'どう見ても世界一の男',
    ],
    correct: 'どう見ても世界一の男'
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
    document.getElementById("js-result").textContent = '終了!あなたの正解数は' + score + '/' + quizLength + 'です！';
    // document.getElementById('js-result').textContent = '終了';
    location.replace('../html/quizResult.html');
  }
};

// ボタンをクリックしたら正誤判定
handleIndex = 0;
while (handleIndex < buttonLength) {
  $button[handleIndex].addEventListener('click', clickHandler);
  handleIndex++;
};