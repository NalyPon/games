const $manualArea = document.getElementById('manualArea');
const initManualArea = $manualArea.style.display;
const $bombArea = document.getElementById('bombArea');
const initBombArea = $bombArea.style.display;
const $failureArea = document.getElementById('failureArea');
const initFailureArea = $failureArea.style.display;
const $successArea = document.getElementById('successArea');
const initSuccessArea = $successArea.style.display;

const edgeLength = 4;
const divStartTag = '<div class="mt-3 d-flex justify-content-center">';
const divEndTag = '</div>';
const buttonTag = '<button type="button" class="mx-2 btn btn-warning text-warning" style="width: 50px; height: 50px"></button>';

let success = true;

// 残りのボタンの数
let remaingButtons = edgeLength * edgeLength;

/* ボタンタグを書き込む */
let bombAreaText = "";
for (i = 0; i < edgeLength; i++) {
    bombAreaText += divStartTag;
    for (j = 0; j < edgeLength; j++) {
        bombAreaText += buttonTag;
    }
    bombAreaText += divEndTag;
}
$bombArea.innerHTML = bombAreaText;

const $button = document.getElementById('bombArea').
    getElementsByTagName('button');
const buttonLength = $button.length;

/**
 * integer乱数を生成
 */
getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

// successAreaを非表示にする
$successArea.style.display = 'none';
// failureAreaを非表示にする
$failureArea.style.display = 'none';
// 爆弾をランダムに設定
let bomb = getRandomInt(buttonLength) + 1;
console.log('ハズレ:' + bomb);

// ボタンイベント
clickHandler = (e) => {
    if (bomb == Number(e.target.textContent)) {
        // ハズレボタンを赤にする
        $button[bomb - 1].classList.replace('btn-warning', 'btn-danger');
        $button[bomb - 1].classList.replace('text-warning', 'text-danger');
        // 全ボタンを非活性にする
        let buttonIndex = 0
        for (buttonIndex; buttonIndex < buttonLength; buttonIndex++) {
            $button[buttonIndex].setAttribute("disabled", true);
        }
        // failureAreaを表示する
        $failureArea.style.display = initFailureArea;
        // 成功フラグをfalseに
        success = false;
    } else {
        // ボタンを非表示にする
        e.target.style.visibility = 'hidden';
        remaingButtons--;
        // ボタンが残り1つならばクリア
        if (remaingButtons == 1) {
            // ハズレボタンを緑にする
            $button[bomb - 1].classList.replace('btn-warning', 'btn-success');
            $button[bomb - 1].classList.replace('text-warning', 'text-success');
            // ハズレボタンを非活性にする
            $button[bomb - 1].setAttribute("disabled", true);
            // successAreaを表示する
            $successArea.style.display = initSuccessArea;
            // 成功フラグをtrueに
            success = true;
        }
    }
};

// bomb click
for (handleIndex = 0; handleIndex < buttonLength; handleIndex++) {
    $button[handleIndex].textContent = handleIndex + 1;
    $button[handleIndex].addEventListener('click', clickHandler);
};

// Replay clickEvent
document.getElementById('replay')
    .addEventListener('click', () => {
        // bombAreaを表示する
        $bombArea.style.display = initBombArea;
        if (success) {
            // successAreaを非表示にする
            $successArea.style.display = 'none';
            // ハズレボタンを黄色に戻す
            $button[bomb - 1].classList.replace('btn-success', 'btn-warning',);
            $button[bomb - 1].classList.replace('text-success', 'text-warning');
        } else {
            // failureAreaを非表示にする
            $failureArea.style.display = 'none';
            // ハズレボタンを黄色に戻す
            $button[bomb - 1].classList.replace('btn-danger', 'btn-warning',);
            $button[bomb - 1].classList.replace('text-danger', 'text-warning');
        }
        // ボタンを全て表示し活性にする
        for (buttonIndex = 0; buttonIndex < buttonLength; buttonIndex++) {
            $button[buttonIndex].style.visibility = "visible";
            $button[buttonIndex].removeAttribute("disabled");
        }
        // 残りのボタンの数を初期化
        remaingButtons = edgeLength * edgeLength;
        // 爆弾をランダムに設定
        bomb = getRandomInt(buttonLength) + 1;
        console.log('ハズレ:' + bomb);
    });

// Menu clickEvent
document.getElementById('menu')
    .addEventListener('click', () => {
        window.location.replace('./index.html');
    });