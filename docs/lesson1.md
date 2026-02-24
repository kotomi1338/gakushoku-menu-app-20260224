# ステップ1「IssueとPRを作成してレビューするチーム開発」

## 1-1 🔹 Issueを作成

- GitHubのリポジトリでIssueを作成する
  - タイトル：【管理画面】価格入力欄を追加する
  - 説明：「メニュー登録時に『価格』も保存できるようにします」

<details open><summary>タイトル</summary>

```md
【管理画面】価格入力欄を追加する
```

</details>

<details open><summary>内容</summary>

```md
## 背景・概要

今は「メニュー名」と「日付」しか保存できない状態です。

しかし、実際の学食メニューには「価格」も表示してほしいので、
登録時に「価格」も一緒に保存できるように機能追加を行います。


## やること
- [ ] `admin.html` に「価格」用の入力欄を追加する
- [ ] `admin.js` で入力された価格情報も一緒に保存できるようにする
- [ ] 保存された価格情報がLocalStorageに反映されることを確認する

## メモ
- 数値での入力を想定していますが、今回の対応ではバリデーションは設けません（今後検討）。
- 価格欄のプレースホルダは「価格（円）」と表示します。

```

</details>

## 1-2 🔹 ブランチを切る

```bash
git switch -c feature/admin-add-price
```

## 1-3 🔹 コードを修正

ここは今回の本題ではないのでコピペで行きます🙏

### admin.html を修正

<details open><summary>admin.html</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>管理者用メニュー追加</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>🔧 メニュー管理画面</h1>
  </header>

  <main>
    <div id="admin-form">
      <input type="text" id="menu-name" placeholder="メニュー名">
      <input type="date" id="menu-date">
      <input type="number" id="menu-price" placeholder="価格（円）">
      <button id="add-menu-btn">メニュー追加</button>
    </div>

    <div id="menu-list-admin"></div>
  </main>

  <script src="scripts/admin.js"></script>
</body>
</html>

```

</details>

### style.css を修正

<details open><summary>style.css</summary>

```css
#admin-form input[type="text"],
#admin-form input[type="date"],
#admin-form input[type="number"] {
  padding: 10px;
  width: 200px;
  border: 2px solid #ff6f00;
  border-radius: 5px;
  font-size: 1em;
}
```

</details>

### admin.js を修正

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
  const menuName = document.getElementById('menu-name').value;
  const menuDate = document.getElementById('menu-date').value;
  const menuPrice = document.getElementById('menu-price').value;

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

## 1-5 🔹 コミット

```bash
git add .
git commit -m "管理画面に価格入力欄を追加"
```

## 1-6 🔹 プッシュ

```bash
git push origin feature/admin-add-price
```
または
```bash
git push
```

## 1-7 🔹 GitHubでPR作成
- タイトル：管理画面に価格入力欄を追加
- 説明：admin.html、admin.jsに価格入力欄を追加しました

<details open><summary>タイトル</summary>

やった変更を完結に書くことがポイント！

```md
管理画面に価格入力欄を追加
```

</details>

<details open><summary>内容</summary>

```md
## 背景・概要

Issues: （ここにIssuesのリンクを貼る）

今は「メニュー名」と「日付」しか保存できない状態です。

しかし、実際の学食メニューには「価格」も表示してほしいので、
登録時に「価格」も一緒に保存できるように機能追加を行います。


## 実装したこと
- [x] `admin.html` に「価格」用の入力欄を追加する
- [x] `admin.js` で入力された価格情報も一緒に保存できるようにする
- [x] 保存された価格情報がLocalStorageに反映されることを確認する

```

## 1-8 🔹 PRをレビュー＆マージ

- GitHub上で確認し、問題なければmainにマージする。
- チームメンバーの1人以上はレビューをする（コードを読む）など、ルールを決めると良いでしょう。

### 💡 さらにチーム開発で出来ると良いポイント

- PRを出す前に **自分でレビュー** をする癖をつけましょう。
- PRを見る観点として、「コードの内容」だけでなく「PRのタイトルや説明」も確認しましょう。
- GitHubのレビュー機能にある **Approve（承認）** ボタンを使い、
  「Approveが付いたらマージOK」というルールをチームで決めても良いです。
- PRマージ後は、 **作業用ブランチを削除（Delete branch）** してリポジトリを整理しておくと良いでしょう。
