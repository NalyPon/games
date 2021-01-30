/** プレイヤーのステータス */
const playerData = {
    name: "プレイヤー",
    hp: 100,
    attack: 7,
    defence: 2
}

/** 敵のステータス */
const enemiesData = [
    {
        name: "スライム",
        hp: 50,
        attack: 4,
        defence: 1
    },
    {
        name: "ゴブリン",
        hp: 60,
        attack: 5,
        defence: 1
    },
    {
        name: "サイクロプス",
        hp: 80,
        attack: 6,
        defence: 2
    }
];

// ダメージ範囲
const damageRange = 0.2;
// クリティカルヒット確率
const criticalHitRate = 0.1;
// ログ用の連番
let logIndex = 0;

/** 討伐数の情報 */
let defeatEnemies = 0;
let targetEnemies = 3;

// 敵の最大HPを取得する
for (let i = 0; i < enemiesData.length; i++) {
    enemiesData[i].maxHp = enemiesData[i].hp;
}

let enemyIndex = 0
// 敵を選択
let enemyData = enemiesData[enemyIndex];

// プレイヤーの最大HPを取得
playerData.maxHp = playerData.hp;

/* プレイヤー情報を表示 */
insertText("playerName", playerData.name);
insertText("currentPlayerHp", playerData.hp);
insertText("maxPlayerHp", playerData.maxHp);

/* 敵の情報を表示 */
insertText("enemyName", enemyData.name);
insertText("currentEnemyHp", enemyData.hp);
insertText("maxEnemyHp", enemyData.maxHp);

/** 討伐数を表示 */
insertText('defeatEnemies', defeatEnemies);
insertText('targetEnemies', targetEnemies);

/** 攻撃ボタンクリック時のイベント設定 */
document.getElementById("attack").addEventListener("click", attackEvent);

/** 次へ進むボタンクリックのイベント設定 */
document.getElementById("modalNextButton").addEventListener("click", nextButtonEvent);

/**
 * 攻撃ボタンのイベント
 */
function attackEvent() {
    /** 勝利・敗北フラグ */
    let victory = false;
    let defeat = false;

    /** ログに表示する名前 */
    const playerName = '<span style="color: blue">' + playerData.name + '</span>';
    const enemyName = '<span style="color: red">' + enemyData.name + '</span>';

    let additionalLog = '';

    /** プレイヤー => 敵 の処理 */
    let playerDamage = damageCaluculation(playerData.attack, enemyData.defence);
    if (Math.random() < criticalHitRate) {
        playerDamage *= 3;
        additionalLog = 'クリティカルヒット！'
    } else {
        additionalLog = '';
    }
    enemyData.hp -= playerDamage;
    document.getElementById("currentEnemyHpGaugeValue").style.width = enemyData.hp / enemyData.maxHp * 100 + "%";
    insertText("currentEnemyHp", enemyData.hp);
    insertLog(playerName + 'の攻撃！' + additionalLog + enemyName + 'に' + playerDamage + 'のダメージ！');
    if (enemyData.hp <= 0) {
        victory = true;
        document.getElementById("currentEnemyHpGaugeValue").style.width = "0%";
        enemyData.hp = 0;
        insertText("currentEnemyHp", enemyData.hp);

        showModal(enemyData.name + "を倒した!");
    }

    if (!victory) {
        /** 敵 =>プレイヤー の処理 */
        let enemyDamage = damageCaluculation(enemyData.attack, playerData.defence);
        if (Math.random() < criticalHitRate) {
            enemyDamage *= 3;
            additionalLog = 'クリティカルヒット！'
        } else {
            additionalLog = '';
        }
        playerData.hp -= enemyDamage;
        document.getElementById("currentPlayerHpGaugeValue").style.width = playerData.hp / playerData.maxHp * 100 + "%";
        insertText("currentPlayerHp", playerData.hp);
        insertLog(enemyName + 'の攻撃！' + additionalLog + playerName + 'に' + enemyDamage + 'のダメージ！');
        if (playerData.hp <= 0) {
            defeat = true;
            document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";
            playerData.hp = 0;
            insertText("currentPlayerHp", playerData.hp);

            showModal(enemyData.name + "に負けた…", 'Give Up...');
        }
    }

    /* 決着がついたらAttackボタンを非活性にする */
    if (victory || defeat) {
        this.classList.add("deactive");
    }

    if (victory) {
        defeatEnemies++;
        insertText('defeatEnemies', defeatEnemies);

        // 目標討伐数に達した場合
        if (defeatEnemies == targetEnemies) {
            showModal('ゲームクリア！', 'Back to Menu');
        }
    }
}

/**
 * 次へ進むボタンのイベント
 */
function nextButtonEvent() {
    // 次の敵へ
    enemyData = enemiesData[++enemyIndex];
    /* 敵の情報を表示 */
    insertText("enemyName", enemyData.name);
    insertText("currentEnemyHp", enemyData.hp);
    insertText("maxEnemyHp", enemyData.maxHp);
    document.getElementById("currentEnemyHpGaugeValue").style.width = "100%";


    document.getElementById('mask').classList.remove('active');
    document.getElementById('modal').classList.remove('active');
    document.getElementById('attack').classList.remove("deactive");
}

/**
 * ダメージを計算する
 * @param {*} attack 
 * @param {*} defence 
 */
function damageCaluculation(attack, defence) {
    const maxDamage = attack * (1 + damageRange);
    const minDamage = attack * (1 - damageRange);
    const attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage);

    const damage = attackDamage - defence;
    if (damage < 1) {
        return 0
    } else {
        return damage;
    }
}

/**
 * HTMLのidにテキストを挿入する
 * @param {ID} id 
 * @param {String} text 
 */
function insertText(id, text) {
    document.getElementById(id).textContent = text;
}

/**
 * ログを表示する
 * @param {*} texts 
 */
function insertLog(texts) {
    const $logsElement = document.getElementById("logs");
    const $createLog = document.createElement("li");
    $createLog.innerHTML = ++logIndex + ": " + texts;
    $logsElement.insertBefore($createLog, $logsElement.firstChild);
}

/**
 * モーダルを表示する
 */
function showModal(title, endButtonText) {
    document.getElementById('mask').classList.add('active');
    document.getElementById('modal').classList.add('active');
    document.getElementById('modalTitle').textContent = title;
    if (endButtonText) {
        document.getElementById('modalNextButton').classList.add('hidden');
        document.getElementById('modalEndGame').classList.remove('hidden');
        insertText('modalEndButton', endButtonText);
    }
}
