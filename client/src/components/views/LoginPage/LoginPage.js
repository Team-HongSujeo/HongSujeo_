// 로그인 및 쿠키 관리(Remember Me 버튼) 페이지

//import  Axios  from 'axios';
import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom'; // V6로 넘어오면서 history.push가 navigate로 바뀜
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import Icon from '@ant-design/icons';
//import Auth from '../../../hoc/auth';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false; // 1. rememberMe가 있으면 rememberMeChecked = true, 없으면 false

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe) // rememberMe의 상태를 토글
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';  // 3. rememberMe가 있으면 쿠키에서 가져온다



  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('이메일이 유효하지 않거나 이미 사용 중입니다')
          .required('이메일을 입력해주세요'),
        password: Yup.string()
          .min(6, '비밀번호는 최소 6글자여야 합니다')
          .required('비밀번호를 입력해주세요'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  // 이전코드: window.localStorage.setItem('rememberMe', values.id); 
                  //!!!!values.id이 아니라 values.email로 바꿔줘야 제대로 remember me 동작!!!!
                  window.localStorage.setItem('rememberMe', values.email);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                navigate("/");
              } else {
                setFormErrorMessage('등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다')
              }
            })
            .catch(err => {
              setFormErrorMessage('등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          //dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          //handleReset,
        } = props;
        return (
          <div className="app">

            <Title level={2}>로그인</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>

              <Form.Item required>
                <Input
                  id="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="이메일 입력"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="비밀번호 입력"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
                {/* handleRememberMe는 체크박스 토글 역할, 체크박스가 체크되어있으면 rememberMe 실행 */}
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >로그인 상태 유지</Checkbox>
                <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                  비밀번호 찾기
                </a>
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    로그인
                </Button>
                </div>
                또는 <a href="/register">회원가입하기</a>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );

};

export default LoginPage

/*
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

*/