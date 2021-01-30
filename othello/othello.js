// 定数を定義
const edgeLength = 8;
const black = 1;
const white = -1;
// 初期変数を定義
let turn = 0; // ターン 1:黒、-1:白
let $alertArea = document.getElementById("alertArea");
let $turnArea = document.getElementById("turnArea");
// 盤面の状況を二次元配列で定義
let boardArray = new Array(edgeLength);
for (let x = 0; x < boardArray.length; x++) {
    boardArray[x] = new Array(edgeLength);
}

// HTMLで定義したテーブルを取得
let $board = document.getElementById("field");

// 取得したテーブルに盤面生成
createBoard();

// 盤面を初期化する
initializeBoard();

// クリックした時に実行されるイベント
for (let x = 0; x < edgeLength; x++) {
    for (let y = 0; y < edgeLength; y++) {
        let selectedCell = $board.rows[x].cells[y];
        selectedCell.onclick = function () {
            // クリックされた場所に石がない場合は、その場所にターン側の石が置けるかチェックし
            // 置ける場合は、盤面を更新。相手のターンへ移る
            if (boardArray[this.parentNode.rowIndex][this.cellIndex] == 0) {
                if (checkReverse(this.parentNode.rowIndex, this.cellIndex) > 0) {
                    setBoard();
                    changeTurn();
                }
            }
        };
    }
}

// テーブルで盤面を作成する処理
function createBoard() {
    for (let x = 0; x < edgeLength; x++) {
        let tr = document.createElement("tr");
        $board.appendChild(tr);
        for (let y = 0; y < edgeLength; y++) {
            let td = document.createElement("td");
            tr.appendChild(td);
        }
    }
}

// 盤面を初期化する処理
function initializeBoard() {
    // 全てをクリア
    for (let x = 0; x < edgeLength; x++) {
        for (let y = 0; y < edgeLength; y++) {
            boardArray[x][y] = 0;
        }
    }
    // 初期状態：真ん中に白黒を配列
    boardArray[edgeLength / 2 - 1][edgeLength / 2 - 1] = white;
    boardArray[edgeLength / 2 - 1][edgeLength / 2] = black;
    boardArray[edgeLength / 2][edgeLength / 2 - 1] = black;
    boardArray[edgeLength / 2][edgeLength / 2] = white;

    setBoard();

    // ターンも初期化
    turn = 0;
    changeTurn();

    // メッセージ挿入
    document.getElementById("alertArea").textContent = "START!!";
}

// 盤面状況(配列)を実際の盤面へ反映させる処理
function setBoard() {
    let stone = "";
    for (let x = 0; x < edgeLength; x++) {
        for (let y = 0; y < edgeLength; y++) {
            switch (boardArray[x][y]) {
                case 0:
                    stone = "";
                    break;
                case white:
                    stone = "○";
                    break;
                case black:
                    stone = "●";
                    break;
            }
            $board.rows[x].cells[y].innerText = stone;
        }
    }
    return true;
}

// ターンを変更する処理
function changeTurn() {
    if (turn == 0) {
        // 0は最初として、メッセージのみで処理終了
        turn = black;
        $turnArea.textContent = 'Turn : Black';
        return;
    }
    document.getElementById('alertArea').textContent = '';

    // ターンを変更
    turn = turn * -1;
    // ターンを交代して、置けるところがあるか確認する
    // 現状の配置をバックアップ
    let buffBoard = new Array(edgeLength);
    let puttableCount = 0;
    for (let i = 0; i < boardArray.length; i++) {
        buffBoard[i] = new Array(edgeLength);
    }
    for (let x = 0; x < edgeLength; x++) {
        for (let y = 0; y < edgeLength; y++) {
            buffBoard[x][y] = boardArray[x][y];
        }
    }

    // 左端からすべてのマスの確認を行う
    let whiteCount = 0;
    let blackCount = 0;
    for (let x = 0; x < edgeLength; x++) {
        for (let y = 0; y < edgeLength; y++) {
            // 空白マスのみおけるのでチェック
            // それ以外は石の数を加算
            switch (boardArray[x][y]) {
                case 0:
                    puttableCount += checkReverse(x, y);
                    // バックアップから元に戻す
                    for (let i = 0; i < edgeLength; i++) {
                        for (let ii = 0; ii < edgeLength; ii++) {
                            boardArray[i][ii] = buffBoard[i][ii];
                        }
                    }
                    break;
                case white:
                    whiteCount++;
                    break;
                case black:
                    blackCount++;
                    break;
            }
        }
    }

    // 盤面が埋まったらゲーム処理終了
    if ((whiteCount + blackCount) == (edgeLength * edgeLength) || whiteCount == 0 || blackCount == 0) {
        if (whiteCount == blackCount) {
            $turnArea.innerHTML = 'DRAW';
        } else if (whiteCount > blackCount) {
            $turnArea.innerHTML = 'Winner Black!!!    Black:' + blackCount
                + ' vs White:' + whiteCount;
            return;
        } else {
            $turnArea.innerHTML = 'Winner White!!!    Black:' + blackCount
                + ' vs White:' + whiteCount;
            return;
        }
    } else {
        // 置ける場所がない場合は、ターンを相手に戻す
        if (puttableCount == 0) {
            switch (turn) {
                case white:
                    $alertArea.textContent = 'There is no place to put White.';
                    turn = turn * -1;
                    break;
                case black:
                    $alertArea.textContent = 'There is no place to put Black.';
                    turn = turn * -1;
                    break;
            }
        }
    }

    // ターンを表示する
    switch (turn) {
        case -1:
            $turnArea.textContent = "Turn : White";
            break;
        case 1:
            $turnArea.textContent = "Turn : Black";
            break;
    }
}

// 指定したセルにターン側の石が置けるか確認
function checkReverse(rowIndex, callIndex) {
    let puttableCount = 0;
    // 各方向へリーバース出来るか確認
    puttableCount += reverseLine(rowIndex, callIndex, -1, 0); //上
    puttableCount += reverseLine(rowIndex, callIndex, -1, 1); //右上
    puttableCount += reverseLine(rowIndex, callIndex, 0, 1); //右
    puttableCount += reverseLine(rowIndex, callIndex, 1, 1); //右下
    puttableCount += reverseLine(rowIndex, callIndex, 1, 0); //下
    puttableCount += reverseLine(rowIndex, callIndex, 1, -1); //左下
    puttableCount += reverseLine(rowIndex, callIndex, 0, -1); //左
    puttableCount += reverseLine(rowIndex, callIndex, -1, -1); //左上

    return puttableCount;
}

// 指定したセルから指定した方向へreverseを行う
function reverseLine(rowIndex, callIndex, addX, addY) {
    // 最初に今の盤状況を退避する
    let buffBoard = new Array(edgeLength);
    for (let i = 0; i < boardArray.length; i++) {
        buffBoard[i] = new Array(edgeLength);
    }
    for (let x = 0; x < edgeLength; x++) {
        for (let y = 0; y < edgeLength; y++) {
            buffBoard[x][y] = boardArray[x][y];
        }
    }
    let reversedCount = 0; // 裏返した数
    let reversable = 0; // 自分の色の石があるのか
    let xx = rowIndex; // 指定したセルの位置(行)
    let yy = callIndex; // 指定したセルの位置(列)
    // 指定したセルから指定された方向へ移動し
    // 完了条件になるまで石を裏返す
    while (true) {
        xx += addX;
        yy += addY;
        // 盤の端に到達したら抜ける
        if (xx < 0 || xx > edgeLength - 1 || yy < 0 || yy > edgeLength - 1) {
            break;
        }
        // 移動先のセルに石がなかったら抜ける
        if (boardArray[xx][yy] == 0) {
            break;
        }
        // 移動先のセルが自分自身であれば、石があった事を判定し抜ける
        if (boardArray[xx][yy] == turn) {
            reversable = 1;
            break;
        }
        // 上記以外は相手の石で有るので、裏返して裏返した件数を加算
        boardArray[xx][yy] = boardArray[xx][yy] * -1;
        reversedCount++;
    }
    // 裏返しを行ったが、移動先に自分の石がなかった場合は元に戻す
    if (reversedCount > 0) {
        if (reversable == 0) {
            for (let i = 0; i < edgeLength; i++) {
                for (let ii = 0; ii < edgeLength; ii++) {
                    boardArray[i][ii] = buffBoard[i][ii];
                    reversedCount = 0;
                }
            }
        } else {
            // ちゃんと裏返しが出来たら、置いた所に自分の石を置く
            boardArray[rowIndex][callIndex] = turn;
        }
    }

    // 最後に裏返しを行った件数を戻す
    return reversedCount;
}