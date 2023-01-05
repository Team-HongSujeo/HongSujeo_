import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="home">
      {/*  버튼 누르면 LandingPage로 갈 수 있도록 href지정 */}
      <a href="/">홈으로</a> 
    </Menu.Item>
    <Menu.Item key="favorite">
        <a href="/favorite">즐겨찾기</a>
      </Menu.Item>
  </Menu>
  )
}

export default LeftMenu