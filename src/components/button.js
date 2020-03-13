import React from 'react';

import styled from 'styled-components';

import { useFetch } from '../hooks';

const ButtonContainer = styled.button`
  width: ${props => props.width || '200px'};
  height: ${props => props.height || '50px'};
  background-color: ${props => props.backgroundColor || '#ccffcc'};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${props => props.margin || '10px'};
  font-size: 18px;
  outline: none;
`;

function Button(props) {
  return (
    <ButtonContainer onClick={props.onClick} { ...props }>
      {props.text}
    </ButtonContainer>
  );
}

export default Button;
