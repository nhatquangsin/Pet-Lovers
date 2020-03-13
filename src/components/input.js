import React from 'react';

import styled from 'styled-components';

import { useFetch } from '../hooks';

const InputContainer = styled.input`
  width: ${props => props.width || '300px'};
  height: ${props => props.height || '40px'};
  border-width: ${props => props.borderWidth || '1px'};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;
  font-size: 18px;
  margin: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-style: solid;
`;

function Input(props) {
  return (
    <InputContainer
      type={props.password ? 'password' : 'text'}
      onChange={props.onChange}
    />
  );
}

export default Input;
