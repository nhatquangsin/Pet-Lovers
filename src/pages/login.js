import React, { useState } from 'react';

import styled from 'styled-components';
import { navigate } from 'hookrouter';

import Button from '../components/button';
import Input from '../components/input';
import { usePostData } from '../hooks';
import { API_URL } from '../constants/url';
import { query } from '../utils/query';

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 420px;
  height: 50px;
`;

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signin = async () => {
    const res = await query({
      method: 'POST',
      url: API_URL + '/users/signin',
      data: {
        email,
        password,
      },
    });

    if (res && res.data.status === 200) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userFullname', res.data.user.fullname);
      localStorage.setItem('userEmail', res.data.user.email);
      localStorage.setItem('userPhone', res.data.user.phone);
      localStorage.setItem('userRole', res.data.user.role);
      localStorage.setItem('userId', res.data.user._id);
      localStorage.setItem('friends', res.data.friends);

      navigate('/main');
    } else {
      setError('Email hoặc mật khẩu không hợp lệ');
    }
  }

  return (
    <LoginContainer>
      <h1>Mạng xã hội dành cho những người yêu thú cưng</h1>
      <LoginForm>
        <InputForm>
          Email
          <Input value={email} onChange={event => {
            setEmail(event.target.value);
            setError('');
          }} />
        </InputForm>
        <InputForm>
          Mật Khẩu
          <Input value={password} onChange={event => {
            setPassword(event.target.value);
            setError('');
          }} password />
        </InputForm>
        <div>
          <Button text='Đăng nhập'
            onClick={() => {
              if (email === '' || password === '') {
                setError('Vui lòng nhập email và mật khẩu');
              }
              signin();
            }}
          />
          <Button text='Đăng ký' onClick={() => navigate('/signup', true)} />
        </div>
        {error !== '' ? <div style={{ color: 'red' }}>{error}</div> : <></>}
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
