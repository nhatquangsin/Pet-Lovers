import React from 'react';

import { navigate } from 'hookrouter';

import { useFetch } from '../hooks';
import { API_URL } from '../constants/url';
import { MainContainer, NavigateTab } from './main';
import { GoHome } from "react-icons/go";
import { Navigation } from '../components/navigation';
import ProfileInformation from '../components/profile-information';

function Profile(props) {
  const [data, loading] = useFetch(
    API_URL + '/users/' + props.userId
  );

  return (
    <MainContainer>
      <Navigation width='25%'>
        <NavigateTab onClick={() => navigate('/main')}>
          <GoHome style={{ paddingRight: '5px' }} size={30} />
            Trang chủ
        </NavigateTab>
      </Navigation>
      <ProfileInformation
        user={data.data}
      />
    </MainContainer>
  );
}

export default Profile;
