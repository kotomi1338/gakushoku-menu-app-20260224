# 仮プロダクト「学食メニュー表示アプリ」

## ファイル作成

```bash
cd gakushoku-menu-app
mkdir scripts
touch index.html admin.html style.css scripts/main.js scripts/admin.js
```

```
gakushoku-menu-app
├── admin.html
├── index.html
├── scripts
│   ├── admin.js
│   └── main.js
└── style.css
```

<details><summary>index.html</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>学食メニュー（日付ごと）</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>🍽 学食メニュー（一覧）</h1>
  </header>

  <main>
    <div id="menu-list"></div>
  </main>

  <script src="scripts/main.js"></script>
</body>
</html>

```

</details>

<details><summary>admin.html</summary>

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
      <button id="add-menu-btn">メニュー追加</button>
    </div>

    <div id="menu-list-admin"></div>
  </main>

  <script src="scripts/admin.js"></script>
</body>
</html>

```

</details>

<details><summary>style.css</summary>

```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff8f0;
  color: #333;
  text-align: center;
  padding: 20px;
}

header {
  margin-bottom: 30px;
}

h1 {
  color: #ff6f00;
  font-size: 2em;
}

.date-card {
  background-color: #fff;
  padding: 20px;
  margin: 20px auto;
  width: 320px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 111, 0, 0.3);
}

.date-title {
  color: #ff8f33;
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 15px;
  border-bottom: 2px solid #ff6f00;
  padding-bottom: 5px;
}

.menu-item {
  background-color: #fff8f0;
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#admin-form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

#admin-form input[type="text"],
#admin-form input[type="date"] {
  padding: 10px;
  width: 200px;
  border: 2px solid #ff6f00;
  border-radius: 5px;
  font-size: 1em;
}

#add-menu-btn {
  background-color: #ff8f33;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

#add-menu-btn:hover {
  background-color: #ff6f00;
}

```

</details>


<details><summary>scripts/main.js</summary>

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
      menuItem.textContent = menu.name;
      dateSection.appendChild(menuItem);
    });

    menuList.appendChild(dateSection);
  });
}

window.onload = displayMenusByDate;

```

</details>


<details><summary>scripts/admin.js</summary>

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
    menuDiv.textContent = `${menu.name}（${menu.date}）`;
    menuList.appendChild(menuDiv);
  });
}

// メニュー追加ボタン
document.getElementById('add-menu-btn').onclick = () => {
  const menuName = document.getElementById('menu-name').value;
  const menuDate = document.getElementById('menu-date').value;

  if (menuName && menuDate) {
    const menus = getMenus();
    menus.push({
      id: Date.now().toString(),
      name: menuName,
      date: menuDate,
    });

    saveMenus(menus);
    displayMenusAdmin();

    // 入力欄クリア
    document.getElementById('menu-name').value = '';
    document.getElementById('menu-date').value = '';

    alert('メニューが追加されました！');
  } else {
    alert('すべて入力してください。');
  }
};

window.onload = displayMenusAdmin;

```

</details>


## Git管理

```bash
git init
```

## GitHubにリポジトリを作成

https://github.com/new

リポジトリを連携する
