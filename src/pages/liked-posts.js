import React from 'react';

import { navigate } from 'hookrouter';

import { MainContainer, NavigateTab } from './main';
import { Navigation } from '../components/navigation';
import { GoHome } from "react-icons/go";
import { API_URL } from '../constants/url';
import { useFetch } from '../hooks';
import { NewFeed } from '../components/newfeed';
import Post from '../components/post';

function LikedPosts(props) {
  const { userId } = props;

  const [data, loading] = useFetch(`${API_URL}/users/${userId}/liked-posts`);
  console.log(data);

  return (
    <MainContainer>
      <Navigation width='25%'>
        <NavigateTab onClick={() => navigate('/main')}>
          <GoHome style={{ paddingRight: '5px' }} size={30} />
            Trang chủ
        </NavigateTab>
      </Navigation>
      <NewFeed width='50%'>
        <div style={{ position: 'relative', top: 0, padding: '10px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Pet Lovers</div>
        </div>
        {data.data && data.data.map(post => (<Post
          key={post._id}
          id={post._id}
          isLiked
          {...post}
        />))}
      </NewFeed>
    </MainContainer>
  );
}

export default LikedPosts;
