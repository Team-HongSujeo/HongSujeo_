/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };
  // userData가 존재하고, isAuth(로그인)된 상태라면
  // (로그아웃 안하고 껐다가 다시 켜면 이미 로그인 된 상태로 시작. 쿠키에 로그인 데이터 저장)
  if (user.userData && user.userData.isAuth) { // userData는 user_reducer.js와 연관, isAuth는 client의 !response.payload.isAuth에서도 등장.
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          {/* a href를 통해, 업로드를 누르면 어느 endpointer로 이동할지 경로 설정 */}
          <a href="/product/upload">업로드</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    )
  } else {  // 로그인 안했을 때 우측 상단에 보이는 메뉴들
    return (
      <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/login">로그인</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="/register">회원가입</a>
      </Menu.Item>
    </Menu>
    )
  }



  // 아직 로그인하지 않았을 때 우측 상단에 보이는 메뉴들
  // if (user.userData && !user.userData.isAuth) {  
  //   return (
  //     <Menu mode={props.mode}>
  //       <Menu.Item key="mail">
  //         <a href="/login">로그인</a>
  //       </Menu.Item>
  //       <Menu.Item key="app">
  //         <a href="/register">회원가입</a>
  //       </Menu.Item>
  //     </Menu>
  //   )
  // } else {  // 로그인 했을 때 우측 상단에 보이는 메뉴들
  //   return (
  //     <Menu mode={props.mode}>
  //       <Menu.Item key="upload">
  //         <a href="/product/upload">업로드</a>
  //       </Menu.Item>
  //       <Menu.Item key="logout">
  //         <a onClick={logoutHandler}>로그아웃</a>
  //       </Menu.Item>
  //     </Menu>
  //   )
  // }
}

export default RightMenu;