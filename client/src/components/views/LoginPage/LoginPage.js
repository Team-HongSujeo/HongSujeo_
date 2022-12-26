//import  Axios  from 'axios';
import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import Icon from '@ant-design/icons';
//import Auth from '../../../hoc/auth';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
        email: Email,
        password: Password
    }
    
    
    dispatch(loginUser(body))
      .then(response => {
        
        if (response.payload.loginSuccess) {
            navigate('/');
        } else {
            alert('Error')
        }
      }
    )

  }


  return (
    <div className="app">

    <Title level={2}>Log In</Title>
      <form style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={onSubmitHandler}
      >
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler} />
          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler} />
          <br />
          <button type="submit">
              Login
          </button>
      </form>
    </div>
  )
}

export default LoginPage