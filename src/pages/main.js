import React from 'react';

import styled from 'styled-components';
import { navigate } from 'hookrouter';

import { useFetch } from '../hooks';
import { API_URL } from '../constants/url';
import { Navigation } from '../components/navigation';
import { Trending } from '../components/trending';
import { NewFeed } from '../components/newfeed';
import Post from '../components/post';
import Button from '../components/button';

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

function Main() {
  const [data, loading] = useFetch(
    API_URL + '/posts'
  );

  console.log(data);
  const userFullname = localStorage.getItem('userFullname');

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  if (localStorage.getItem('token')) {
    return (
      <MainContainer>
        <Navigation width='25%'>
          <div>Home</div>
          <div>Profile</div>
        </Navigation>
        <NewFeed width='50%'>
          <div style={{ position: 'relative', top: 0, padding: '10px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Home</div>
          </div>
          {data.dataList && data.dataList.map(post =>
            <Post
              key={post._id}
              postType={post.postType}
              user={post.user}
              title={post.name}
              content={post.content}
              createdAt={post.createdAt}
              likes={post.likes}
              address={post.address}
            />
          )}
        </NewFeed>
        <Trending width='25%'>
          <div style={{ padding: '10px' }}>{userFullname}</div>
          <div style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingRight: '10px',
            paddingRight: '10px'
          }}>
            <Button text='Logout' width='100%' height='40px' margin='0px' onClick={() => logout()} />
          </div>
        </Trending>
      </MainContainer>
    );
  } else {
    return (
      <Button text='Please login' onClick={() => navigate('/')}/>
    );
  }
}

export default Main;
