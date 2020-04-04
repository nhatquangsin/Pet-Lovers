import React from 'react';

import { navigate } from 'hookrouter';

import { MainContainer, NavigateTab } from './main';
import { Navigation } from '../components/navigation';
import { GoHome } from "react-icons/go";
import { API_URL } from '../constants/url';
import { useFetch } from '../hooks';
import { Row } from '../components/row';

function Friends(props) {
  const { userId } = props;

  const [data, loading] = useFetch(
    `${API_URL}/friends/${userId}`
  );

  return (
    <MainContainer>
      <Navigation width='25%'>
        <NavigateTab onClick={() => navigate('/main')}>
          <GoHome style={{ paddingRight: '5px' }} size={30} />
            Trang chủ
        </NavigateTab>
      </Navigation>
      <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        {data.data && data.data.map(friend => (
          <div key={friend._id} style={{ padding: '10px', width: '100%' }}>
            <Row left={friend.fullname} right="" />
            <Row left={friend.email} right={friend.phone} />
          </div>
        ))}
      </div>
    </MainContainer>
  );
}

export default Friends;
