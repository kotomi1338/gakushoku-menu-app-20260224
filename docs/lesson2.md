# ステップ2「やらかした！mainにマージ&プッシュしてしまった場合のリカバリー方法」

今回はブランチを切るのを忘れて、mainで作業してしまう場面を再現します。

## 2-1 🔹 間違えてmainで作業＆コミット＆push

```bash
git branch   # * main であることを確認
```

```bash
git pull
```

### イシューを作成して実装

<details open><summary>タイトル</summary>

```md
【管理画面】メニューが空文字でも登録できてしまう不具合を修正する
```

</details>

<details open><summary>内容</summary>

```md
## 背景・概要

現在、管理画面でメニューを登録する際、メニュー名に空白だけを入力しても登録できてしまう問題があります。

このままだと、無効なデータ（空のメニュー）が登録されてしまい、一覧表示などで不具合の原因になります。

空白文字だけの入力では登録できないように、バリデーションを追加して修正します。

## やること
- [ ] admin.js で、メニュー名が空白のみの場合は登録処理をキャンセルする
- [ ] エラーメッセージ（例：「メニュー名を正しく入力してください」）を表示する
- [ ] 正常なメニュー登録ができることを確認する

## メモ
- メニュー名の前後の空白は除去してからチェックします（trim()を使用予定）。
- 価格や日付の入力チェックは今回の対応範囲外とします。

```

</details>

<details open><summary>admin.js</summary>

```js
// ローカルストレージから読み込む
function getMenus() {
  return JSON.parse(localStorage.getItem('menus')) || [];
}

// 保存する
function saveMenus(menus) {
  localStorage.setItem('menus', JSON.stringify(menus));
}

// メニュー管理画面に表示する
function displayMenusAdmin() {
  const menus = getMenus();
  const menuList = document.getElementById('menu-list-admin');
  menuList.innerHTML = '';

  menus.forEach(menu => {
    const menuDiv = document.createElement('div');
    menuDiv.className = 'menu-item';
    menuDiv.textContent = `${menu.name}（${menu.date}）（${menu.price ? menu.price + '円）' : '価格未設定）'}`;
    menuList.appendChild(menuDiv);
  });
}

// メニュー追加ボタン
document.getElementById('add-menu-btn').onclick = () => {
  const menuName = document.getElementById('menu-name').value.trim();
  const menuDate = document.getElementById('menu-date').value;
  const menuPrice = document.getElementById('menu-price').value;

  if (!menuName) {
    alert('メニュー名を正しく入力してください');
    return;
  }

  if (menuName && menuDate) {
    const menus = getMenus();
    menus.push({
      id: Date.now().toString(),
      name: menuName,
      date: menuDate,
      price: menuPrice
    });

    saveMenus(menus);
    displayMenusAdmin();

    // 入力欄クリア
    document.getElementById('menu-name').value = '';
    document.getElementById('menu-date').value = '';
    document.getElementById('menu-price').value = '';

    alert('メニューが追加されました！');
  } else {
    alert('すべて入力してください。');
  }
};

window.onload = displayMenusAdmin;
```

</details>

### コミット & プッシュ

ブランチがmainのまま、間違えてコミットします。

```bash
git add .
git commit -m "空白文字でメニュー名が登録できる不具合を修正（誤ってmainにコミット）"
```

mainにプッシュもしてしまいます。

```bash
git push origin main
```

## 2-2 🔹 リカバリ手順

### 2-2-1 コミットを取り消す（soft reset）

soft resetは、コミットした内容はそのままに、コミットだけを取り消すことができます。

```bash
git reset --soft HEAD~1
```

### 2-2-2 新しいブランチを作成

```bash
git switch -c fix/menu-name-input
```

### 2-2-3 コミットし直す

```bash
git commit -m "空白文字でメニュー名が登録できる不具合を修正"
```

### 2-2-4 ブランチをプッシュ

```bash
git push
```

## 2-3 🔹 GitHubでPR作成

いい感じに作成します。

## 2-4 🔹 PRをレビュー＆マージ

レビューしてマージのステップを踏みます。

## 💡 なぜこのリカバリ手順で大丈夫なのか？

### Gitは「履歴」と「作業内容」を分けて管理しているから

今回のリカバリでは、
- `git reset --soft HEAD~1` を使って、**直前のコミットだけを取り消し**ました
- ファイルの中身（変更内容）はそのまま保持されています

そのため、
**間違ってmainにpushしてしまっても、作業内容を失わずに正しいブランチを作り直してPRできる**のです！

### GitHub上のmainにpush履歴が残るけれど問題ない理由

- mainにpushされた記録は残りますが、その後正しい手順でブランチを切り、PR経由でマージすれば大きな問題にはなりません
  - **「ミスに気づいてもリカバリできること」** のほうが重要です
- 必要に応じてチームメンバーと相談して、強制的にmainを書き換えること（force push）もできますが、チーム開発においては、**あまり推奨されません**
  - Gitの履歴を理解していればやっても大丈夫ですが、基本的にはやらない方が良いでしょう。
