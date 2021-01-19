const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.getElementById('choices').getElementsByTagName('button');
const buttonLength = $button.length;

const $quizArea = document.getElementById('quizArea');
const initQuizArea = $quizArea.style.display;
const $resultArea = document.getElementById('resultArea');
const initResultArea = $resultArea.style.display;

// resultAreaを非表示にする
$resultArea.style.display = 'none';

// クイズの問題分、選択肢を定義
setupQuiz = () => {
  document.getElementById('js-question').textContent = 'Q' + (quizIndex + 1) + '： ' + quiz[quizIndex].question;
  let buttonIndex = 0;
  while (buttonIndex < buttonLength) {
    $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
    buttonIndex++;
  }
};
setupQuiz();

// ボタンイベント
clickHandler = (e) => {
  if (quiz[quizIndex].correct === e.target.textContent) {
    window.alert('正解！');
    score++;
  } else {
    window.alert('残念。正解は「' + quiz[quizIndex].correct + '」');
  }

  quizIndex++;

  if (quizIndex < quizLength) {
    setupQuiz();
  } else {
    // quizAreaを非表示にする
    $quizArea.style.display = 'none';
    // resultAreaを表示する
    $resultArea.style.display = initResultArea;
    // 結果を表示する
    document.getElementById('js-result').textContent
      = 'あなたの正解数は' + score + ' / ' + quizLength + 'です！';
  }
};

// Choices clickEvent
handleIndex = 0;
while (handleIndex < buttonLength) {
  $button[handleIndex].addEventListener('click', clickHandler);
  handleIndex++;
};

// Retire clickEvent
document.getElementById('Retire')
  .addEventListener('click', () => {
    if (confirm('終了しますか??')) {
      window.location.replace('./index.html');
    }
  });

// Retry clickEvent
document.getElementById('Retry')
  .addEventListener('click', () => {
    // quizAreaを表示する
    $quizArea.style.display = initQuizArea;
    // resultAreaを非表示にする
    $resultArea.style.display = 'none';
    /* 初期化 */
    quizIndex = 0;
    score = 0;

    setupQuiz();
  });

// Menu clickEvent
document.getElementById('Menu')
  .addEventListener('click', () => {
    window.location.replace('./index.html');
  });