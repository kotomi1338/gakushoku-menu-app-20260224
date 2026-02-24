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
