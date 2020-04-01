import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.width || '100%'};
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

export const Row = ({ left, right }) => {
  return (
    <Wrapper>
      <div>{left}:</div>
      <div>{right}</div>
    </Wrapper>
  )
}
