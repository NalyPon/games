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

// 問題文と選択肢を表示
setupQuiz();

// 選択肢ボタンのイベントを定義
handleIndex = 0;
while (handleIndex < buttonLength) {
  $button[handleIndex].addEventListener('click', clickHandler);
  handleIndex++;
};

/**
 * 問題文、選択肢を画面に表示
 */
function setupQuiz() {
  document.getElementById('js-question').textContent = 'Q' + (quizIndex + 1) + '： ' + quiz[quizIndex].question;
  let buttonIndex = 0;
  while (buttonIndex < buttonLength) {
    $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
    buttonIndex++;
  }
};

// 選択肢ボタンイベント
function clickHandler(e) {
  let resultMessage = null;
  if (quiz[quizIndex].correct === e.target.textContent) {
    resultMessage = '正解！';
    score++;
  } else {
    resultMessage = '残念！正解は「' + quiz[quizIndex].correct + '」'
  }
  window.alert(resultMessage + '\n\n解説：' + quiz[quizIndex].explanation);

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

// Retire button Event
function retireEvent() {
  if (confirm('終了しますか??')) {
    window.location.replace('../index.html');
  }
}