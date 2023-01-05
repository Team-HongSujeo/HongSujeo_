import axios from 'axios';
// Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리
// 쉽게 말해서 백엔드랑 프론트엔드랑 통신을 쉽게하기 위해 Ajax와 더불어 사용함


import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from './types';
import { USER_SERVER } from '../components/Config.js';

// type: 액션의 종류를 한번에 식별할 수 있는 문자열 혹은 심볼
// payload: 액션의 실행에 필요한 임의의 데이터

export function loginUser(dataToSubmit) {
    // server 폴더에 있는 index.js에서 app.post가 있는 위치에 설정된 경로인 /api/users/login과 똑같이 맞춰준다.
    // 여기서 request는 백엔드에서 가져온 모든 데이터
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

// RegisterPage의 registerUser와 동일한 이름을 갖도록 한다
export function registerUser(dataToSubmit) {
    // server 폴더에 있는 index.js에서 app.post가 있는 위치에 설정된 경로인
    // /api/users/register와 경로를 똑같이 맞춰준다
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}



export function auth() {
    // get 메소드에서는 parameter를 필요로 하지 않는다
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data)

    return {
        type: AUTH_USER, // return된 type은 type.js에서 정의됨
        payload: request
    }
} 

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}