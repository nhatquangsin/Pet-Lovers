import React, { useState } from 'react';

import styled from 'styled-components';
import { navigate } from 'hookrouter';

import Button from '../components/button';
import Input from '../components/input';
import { usePostData } from '../hooks';
import { API_URL } from '../constants/url';

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [res, signin] = usePostData({
    url: API_URL + '/users/signin',
    data: {
      email,
      password,
    }
  }, (res) => {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userFullname', res.data.user.fullname);
    localStorage.setItem('userEmail', res.data.user.email);
    localStorage.setItem('userPhone', res.data.user.phone);
    localStorage.setItem('userRole', res.data.user.role);
    localStorage.setItem('userId', res.data.user._id);

    navigate('/main');
  });

  return (
    <LoginContainer>
      <h1>Mạng xã hội dành cho những người yêu thú cưng</h1>
      <LoginForm>
        <InputForm>
          Email
          <Input value={email} onChange={event => setEmail(event.target.value)} />
        </InputForm>
        <InputForm>
          Mật Khẩu
          <Input value={password} onChange={event => setPassword(event.target.value)} password />
        </InputForm>
        <div>
          <Button text="Đăng nhập"
            onClick={() => {
              signin();
            }}
          />
          <Button text="Đăng ký" onClick={() => navigate('/signup', true)} />
        </div>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
