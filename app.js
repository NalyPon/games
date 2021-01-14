const quiz = [
  {
    question: 'ゲーム市場、最も売れたゲーム機は次の内どれ？',
    answers: [
      'スーパーファミコン',
      'PlayStation',
      'Nintendo Switch',
      'Nintendo DS'
    ],
    correct: 'Nintendo DS'
  }, {
    question: '地球で一番高い山は？',
    answers: [
      '富士山',
      'K2',
      'エベレスト',
      'キリマンジャロ'
    ],
    correct: 'エベレスト'
  }, {
    question: 'OSI参照モデルのL4って何？',
    answers: [
      '物理層',
      'リンク層',
      'ネットワーク層',
      'トランスポート層'
    ],
    correct: 'トランスポート層'
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
  }
};

// ボタンをクリックしたら正誤判定
handleIndex = 0;
while (handleIndex < buttonLength) {
  $button[handleIndex].addEventListener('click', clickHandler);
  handleIndex++;
};