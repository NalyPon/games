/** 定数を定義 */
const hands = [0, 2, 5];
const handsLength = hands.length;

const rock = 0;
const scissors = 2;
const paper = 5;

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

// あいこカウント
let drawCount = 0;

/** ボタンイベントを定義 */
$rockButton.addEventListener('click', function () {
    janken(rock);
});
$scissorsButton.addEventListener('click', function () {
    janken(scissors);
});
$paperButton.addEventListener('click', function () {
    janken(paper);
});

// サザエの手札を非表示にする
resetEnemyHand();

// メッセージを挿入
$messageArea.innerHTML = 'じゃんけん～？'

/**
 * integer乱数を生成
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * じゃんけんイベント
 * @param {number} playerHand プレイヤーの手札 
 */
function janken(playerHand) {
    // サザエの手札を取得
    let enemyHand = getEnemyHand();

    // あいこの場合
    if (playerHand == enemyHand) {
        draw();
    }

    let lower = playerHand < enemyHand;
    // あいこ以外の場合
    switch (playerHand + enemyHand) {
        // グーとチョキ or チョキとパー
        case (rock + scissors):
        case (scissors + paper):
            if (lower) {
                win();
            } else {
                lose();
            }
            break;
        // パーとグー
        case (paper + rock):
            if (lower) {
                lose();
            } else {
                win();
            }
    }

}

/**
 * サザエの手札を決定し、画面処理を行った後、手札の番号を返却する
 */
function getEnemyHand() {

    // サザエの手札を決定する
    let enemyHand = hands[getRandomInt(handsLength)];

    // サザエ画面リセット
    $sazaeStandBy.style.display = 'none';
    resetEnemyHand();

    // グー・チョキ・パーそれぞれの画面処理を行う
    switch (enemyHand) {
        case rock:
            // サザエ(グー)を表示する
            $sazaeRock.style.display = initSazaeRock;
            break;
        case scissors:
            // サザエ(チョキ)を表示する
            $sazaeScissors.style.display = initSazaeScissors;
            break;
        case paper:
            // サザエ(パー)を表示する
            $sazaePaper.style.display = initSazaePaper;
            break;
    }

    return enemyHand;
}

/**
 * あいこイベント
 */
function draw() {
    // あいこカウントをインクリメント
    drawCount++;
    // メッセージを挿入
    $messageArea.innerHTML = 'ポン、あいこで～？(' + drawCount + '回目)'
}

/**
 * 勝利イベント
 */
function win() {
    // じゃんけんボタンを非活性にする
    $rockButton.setAttribute('disabled', true);
    $scissorsButton.setAttribute('disabled', true);
    $paperButton.setAttribute('disabled', true);
    // メッセージを挿入
    $messageArea.innerHTML = 'ポン、あなたの勝ち。'
}

/**
 * 敗北イベント
 */
function lose() {
    // じゃんけんボタンを非活性にする
    $rockButton.setAttribute('disabled', true);
    $scissorsButton.setAttribute('disabled', true);
    $paperButton.setAttribute('disabled', true);
    // メッセージを挿入
    $messageArea.innerHTML = 'ポン、お前の負け。何で負けたか明日までに考えてこい。'
}

/**
 * サザエの手札を非表示にする
 */
function resetEnemyHand() {
    $sazaeRock.style.display = 'none';
    $sazaeScissors.style.display = 'none';
    $sazaePaper.style.display = 'none';
}

/** 
 * ビジーwaitを使う方法
 */
function sleep(waitMsec) {
    let startMsec = new Date();
    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
}