/** 手札オブジェクト */
const hands = {
    rock: 0,
    scissors: 1,
    paper: 2
}

const handsLength = Object.keys(hands).length;

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

// サザエの手札を非表示にする
$sazaeRock.style.display = 'none';
$sazaeScissors.style.display = 'none';
$sazaePaper.style.display = 'none';
// メッセージを挿入
$messageArea.innerHTML = 'じゃんけん～？'

/**
 * integer乱数を生成
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Rock button event
 */
function rockEvent() {
    // サザエの手札を取得
    let enemyHand = getEnemyHand();

    // 勝敗判定
    if (enemyHand == hands.rock) {
        drawEvent();
    }
    else if (enemyHand == hands.scissors) {
        winEvent();
    } else if (enemyHand == hands.paper) {
        loseEvent();
    }
}

/**
 * Scissors button event
 */
function scissorsEvent() {
    // サザエの手札を取得
    let enemyHand = getEnemyHand();

    // 勝敗判定
    if (enemyHand == hands.rock) {
        loseEvent();
    }
    else if (enemyHand == hands.scissors) {
        drawEvent();
    } else if (enemyHand == hands.paper) {
        winEvent();
    }
}

/**
 * Paper button event
 */
function paperEvent() {
    // サザエの手札を取得
    let enemyHand = getEnemyHand();

    // 勝敗判定
    if (enemyHand == hands.rock) {
        winEvent();
    }
    else if (enemyHand == hands.scissors) {
        loseEvent();
    } else if (enemyHand == hands.paper) {
        drawEvent();
    }
}

/**
 * サザエの手札を決定し、画面処理を行った後、手札の番号を返却する
 */
function getEnemyHand() {
    // サザエの手札を決定する
    let enemyHand = getRandomInt(handsLength);
    // サザエ画面リセット
    $sazaeStandBy.style.display = 'none';
    $sazaeRock.style.display = 'none';
    $sazaeScissors.style.display = 'none';
    $sazaePaper.style.display = 'none';

    // グー・チョキ・パーそれぞれの画面処理を行う
    if (enemyHand == hands.rock) {
        // サザエ(グー)を表示する
        $sazaeRock.style.display = initSazaeRock;
    }
    else if (enemyHand == hands.scissors) {
        // サザエ(チョキ)を表示する
        $sazaeScissors.style.display = initSazaeScissors;
    } else if (enemyHand == hands.paper) {
        // サザエ(チョキ)を表示する
        $sazaePaper.style.display = initSazaePaper;
    }

    return enemyHand;
}

/**
 * 勝利イベント
 */
function winEvent() {
    // じゃんけんボタンを非活性にする
    $rockButton.setAttribute('disabled', true);
    $scissorsButton.setAttribute('disabled', true);
    $paperButton.setAttribute('disabled', true);
    // メッセージを挿入
    $messageArea.innerHTML = 'ポン、あなたの勝ち。'
}

/**
 * あいこイベント
 */
function drawEvent() {
    // メッセージを挿入
    $messageArea.innerHTML = 'ポン、あいこで～？'
}

/**
 * 敗北イベント
 */
function loseEvent() {
    // じゃんけんボタンを非活性にする
    $rockButton.setAttribute('disabled', true);
    $scissorsButton.setAttribute('disabled', true);
    $paperButton.setAttribute('disabled', true);
    // メッセージを挿入
    $messageArea.innerHTML = 'ポン、お前の負け。何で負けたか明日までに考えてこい。'
}
