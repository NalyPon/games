const $bombArea = document.getElementById('bombArea');
const initBombArea = $bombArea.style.display;
const $resultArea = document.getElementById('resultArea');
const initResultArea = $resultArea.style.display;


const edgeLength = 5;
const divStartTag = '<div class="mt-3 d-flex justify-content-center">';
const divEndTag = '</div>';
const buttonTag = '<button type="button" class="mx-2 btn btn-danger" style="width: 50px; height: 50px"></button>';

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
 * 整数乱数を生成
 */
getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

// resultAreaを非表示にする
$resultArea.style.display = 'none';
// 爆弾をランダムに設定
let bomb = getRandomInt(buttonLength) + 1;
console.log('ハズレ:' + bomb);

// ボタンイベント
clickHandler = (e) => {
    console.log(e.target.textContent);
    if (bomb == Number(e.target.textContent)) {
        // bombAreaを非表示にする
        $bombArea.style.display = 'none';
        // resultAreaを表示する
        $resultArea.style.display = initResultArea;
    } else {
        // ボタンを非表示にする
        e.target.style.visibility = 'hidden';
    }
};

// bomb click
handleIndex = 0;
while (handleIndex < buttonLength) {
    $button[handleIndex].textContent = handleIndex + 1;
    $button[handleIndex].addEventListener('click', clickHandler);
    handleIndex++;
};

// Retry clickEvent
document.getElementById('retry')
    .addEventListener('click', () => {
        // bombAreaを表示する
        $bombArea.style.display = initBombArea;
        // resultAreaを非表示にする
        $resultArea.style.display = 'none';
        // 爆弾をランダムに設定
        bomb = getRandomInt(buttonLength) + 1;
        console.log('ハズレ:' + bomb);
        // ボタンを全て表示する
        buttonIndex = 0;
        while (buttonIndex < buttonLength) {
            $button[buttonIndex].style.visibility = "visible";
            buttonIndex++;
        };
    });

// Menu clickEvent
document.getElementById('menu')
    .addEventListener('click', () => {
        window.location.replace('./index.html');
    });