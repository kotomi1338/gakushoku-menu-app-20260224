# ステップ3「どうして！？2人の変更がコンフリクトしてマージできなくなっちゃった！」

今回は、AさんとBさんはそれぞれ別のタスクをもらって開発を進めている場面です。
チーム開発では、お互いが別々の開発をしていると、コンフリクトが起きることがあります。

そのときにどうなるのかを体験していきましょう。

## 3-1 🔹 Aさんのタスク「一覧画面に金額を表示する変更」

イシューを作成します。（時間がなかったらスキップ）

```bash
git switch main
git pull
git switch -c feature/display-price
```

<details open><summary>main.jsを変更します</summary>

```js
// ローカルストレージから読み込むだけ
function getMenus() {
  return JSON.parse(localStorage.getItem('menus')) || [];
}

// 日付ごとにグループ化
function groupMenusByDate(menus) {
  return menus.reduce((grouped, menu) => {
    (grouped[menu.date] = grouped[menu.date] || []).push(menu);
    return grouped;
  }, {});
}

// メニューを日付ごとに表示
function displayMenusByDate() {
  const menus = getMenus();
  const groupedMenus = groupMenusByDate(menus);
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = '';

  Object.keys(groupedMenus).sort().forEach(date => {
    const dateSection = document.createElement('div');
    dateSection.className = 'date-card';

    const dateTitle = document.createElement('div');
    dateTitle.className = 'date-title';
    dateTitle.textContent = date;
    dateSection.appendChild(dateTitle);

    groupedMenus[date].forEach(menu => {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';
      menuItem.textContent = menu.price
        ? `${menu.name}（${menu.price}円）`
        : `${menu.name}（価格未設定）`;
      dateSection.appendChild(menuItem);
    });

    menuList.appendChild(dateSection);
  });
}

window.onload = displayMenusByDate;
```

</details>

コミット&プッシュをします。

```bash
git add .
git commit -m "一覧画面に金額を表示する変更"
git push origin feature/display-price
```

PRを作成します。まだマージはしません。


## 3-2 🔹 Bさんのタスク「いいね機能の見た目実装」

イシューを作成します。（時間がなかったらスキップ）

```bash
git switch main
git pull
git switch -c feature/display-good
```

<details open><summary>main.jsを変更します</summary>

```js
// ローカルストレージから読み込むだけ
function getMenus() {
  return JSON.parse(localStorage.getItem('menus')) || [];
}

// 日付ごとにグループ化
function groupMenusByDate(menus) {
  return menus.reduce((grouped, menu) => {
    (grouped[menu.date] = grouped[menu.date] || []).push(menu);
    return grouped;
  }, {});
}

// メニューを日付ごとに表示
function displayMenusByDate() {
  const menus = getMenus();
  const groupedMenus = groupMenusByDate(menus);
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = '';

  Object.keys(groupedMenus).sort().forEach(date => {
    const dateSection = document.createElement('div');
    dateSection.className = 'date-card';

    const dateTitle = document.createElement('div');
    dateTitle.className = 'date-title';
    dateTitle.textContent = date;
    dateSection.appendChild(dateTitle);

    groupedMenus[date].forEach(menu => {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';
      menuItem.textContent = `${menu.name} 👍3件`;
      dateSection.appendChild(menuItem);
    });

    menuList.appendChild(dateSection);
  });
}

window.onload = displayMenusByDate;

```

</details>

コミット&プッシュをします。

```bash
git add .
git commit -m "いいね機能の見た目実装"
git push origin feature/display-good
```

PRを作成します。まだマージはしません。

## 3-3 🔹 AさんのPRをマージします。

マージしてみましょう。

## 3-4 🔹 BさんのPRを確認してみましょう。

おや……！？マージ出来ない！！！

## 3-5 🔹 Aさんの変更とBさんの変更のコンフリクトを解消

- GitHubの「Resolve conflicts」ボタンを押して解消画面を開く
- 正しく両方の変更を統合して保存
- 「Mark as resolved」→「Commit merge」

## 3-6 🔹 コンフリクト解消後の動作確認

コンフリクト解消後、ローカルで動作確認を行うことを忘れずにやりましょう。

コンフリクト解消後の作業ブランチの最新にローカル環境に持ってくる

```bash
git pull origin feature/display-good
```

動作確認を行って、問題ないことを確認しましょう。

もし、ここで不具合になっていたりしたら、追加で修正のコミットを行うと良いでしょう。

## 3-7 🔹 PRをマージ

BさんのPRをマージします。

### 💡 コンフリクトは怖くない！

- チーム開発をしていれば、コンフリクトは起きます。
  - 仕事でも時々あります。。
- 重要なのは、**起きた後に冷静に対応すること**です。
- コンフリクト＝失敗 ではありません！

### 💬 コンフリクトを正しく解消するコツ

- どの変更がどちらのブランチから来たか必ず確認しましょう。
- **お互いの意図を尊重しながら統合**することが大事です。（片方を消すだけにしない）
- 必ずローカルで**動作確認**してからマージしましょう。

最初から完璧を目指さず、**ミスが起きたら一緒に直していく**という意識でチーム開発に取り組んでほしいです！
