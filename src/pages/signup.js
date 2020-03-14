import React, { useState } from 'react';

import styled from 'styled-components';
import { navigate } from 'hookrouter';

import Button from '../components/button';
import Input from '../components/input';
import { InputForm } from './login';
import { usePostData } from '../hooks';
import { API_URL } from '../constants/url';

const SignupContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");

  const [res, signup] = usePostData({
    url: API_URL + '/users',
    data: {
      fullname,
      email,
      phone,
      role: "User",
      password,
    }
  }, (res) => {
    navigate('/');
  });

  return (
    <SignupContainer>
      <h1>Đăng ký</h1>
      <InputForm>
        Email
        <Input value={email} onChange={event => setEmail(event.target.value)} />
      </InputForm>
      <InputForm>
        Mật khẩu
        <Input password value={password} onChange={event => setPassword(event.target.value)} />
      </InputForm>
      <InputForm>
        Tên
        <Input value={fullname} onChange={event => setFullname(event.target.value)} />
      </InputForm>
      <InputForm>
        Số điện thoại
        <Input value={phone} onChange={event => setPhone(event.target.value)} />
      </InputForm>
      <div>
        <Button
          text="Đăng ký"
          onClick={() => {
            signup();
          }}
        />
      </div>
    </SignupContainer>
  );
}

export default Signup;
