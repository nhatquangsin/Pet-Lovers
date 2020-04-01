import React from 'react';

import styled from 'styled-components';

import { Row } from '../components/row';
import Button from './button';
import { query } from '../utils/query';
import { API_URL } from '../constants/url';

const Container = styled.div`
  width: ${props => props.width};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ProfileInformation(props) {
  const { user } = props;
  const userId = localStorage.getItem('userId');
  const friends = localStorage.getItem('friends').split(",");
  const isFriend = user && friends.includes(user._id);

  const ButtonStyle = {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: '10px',
    paddingRight: '10px'
  };

  const addFriend = async () => {
    const res = await query({
      method: 'POST',
      url: API_URL + '/friends',
      data: {
        userId,
        friendId: user._id,
      }
    });
  }

  if (user)
    return (<Container width="50%">
      <div style={{ position: 'relative', top: 0, padding: '10px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Thông tin cá nhân</div>
      </div>
      <div style={{ padding: '10px', width: '100%' }}>
        <Row left="Tên" right={user.fullname} />
        <Row left="Email" right={user.email} />
        <Row left="Số điện thoại" right={user.phone} />
        {isFriend ?
          <Row left="Mối quan hệ" right="Bạn bè" />
          : <></>}
      </div>
      {user._id !== userId && !isFriend ? <div style={ButtonStyle}>
        <Button
          text='Kết bạn'
          width='50%'
          height='40px'
          margin='0px'
          borderRadius='20px'
          backgroundColor='#999'
          color='#fff'
          onClick={() => addFriend()}
        />
      </div> : <div style={ButtonStyle}>
          <Button
            text='Huỷ kết bạn'
            width='50%'
            height='40px'
            margin='0px'
            borderRadius='20px'
            backgroundColor='#999'
            color='#fff'
          />
        </div>}
    </Container>);

  return (<div></div>);
}

export default ProfileInformation;
