/** 定数を定義 */
const $sazaeStandBy = document.getElementById('sazaeStandBy');
const initSazaeStandBy = $sazaeStandBy.style.display;
const $sazaeRock = document.getElementById('sazaeRock');
const initSazaeRock = $sazaeRock.style.display;
const $sazaeScissors = document.getElementById('sazaeScissors');
const initSazaeScissors = $sazaeScissors.style.display;
const $sazaePaper = document.getElementById('sazaePaper');
const initSazaePaper = $sazaePaper.style.display;

const $messageArea = document.getElementById('messageArea');

const $rockButton = document.getElementById('rock');
const $scissorsButton = document.getElementById('scissors');
const $paperButton = document.getElementById('paper');

// 画面を初期化
initializeDisplay();
/* ボタンイベントを定義 */
$rockButton.addEventListener('click', rockEvent);
$scissorsButton.addEventListener('click', scissorsEvent);
$paperButton.addEventListener('click', paperEvent);

/**
 * 画面を初期化する
 */
function initializeDisplay() {
    // サザエ初期画面を表示する
    $sazaeStandBy.style.display = initSazaeStandBy;
    // サザエを非表示にする
    $sazaeRock.style.display = 'none';
    $sazaeScissors.style.display = 'none';
    $sazaePaper.style.display = 'none';
    // じゃんけんボタンを活性にする
    $rockButton.removeAttribute('disabled');
    $scissorsButton.removeAttribute('disabled');
    $paperButton.removeAttribute('disabled');
    // メッセージを挿入
    $messageArea.innerHTML = '来週もまた観てくださいね～♪じゃんけん～？'
}

/**
 * Rock button event
 */
function rockEvent() {
    // サザエ(パー)を表示する
    $sazaePaper.style.display = initSazaePaper;
    displayPlayerLose();
}

/**
 * Scissors button event
 */
function scissorsEvent() {
    // サザエ(グー)を表示する
    $sazaeRock.style.display = initSazaePaper;
    displayPlayerLose();
}

/**
 * Paper button event
 */
function paperEvent() {
    // サザエ(チョキ)を表示する
    $sazaeScissors.style.display = initSazaePaper;
    displayPlayerLose();
}

/**
 * プレイヤーが負けたときの共通処理
 */
function displayPlayerLose() {
    // サザエ初期画面を非表示にする
    $sazaeStandBy.style.display = 'none';
    // じゃんけんボタンを非活性にする
    $rockButton.setAttribute('disabled', true);
    $scissorsButton.setAttribute('disabled', true);
    $paperButton.setAttribute('disabled', true);
    // メッセージを挿入
    $messageArea.innerHTML = 'ポン。お前の負け。何で負けたか明日までに考えてこい？'
}
