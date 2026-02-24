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
