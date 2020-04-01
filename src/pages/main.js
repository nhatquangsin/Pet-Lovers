import React from 'react';

import styled from 'styled-components';
import { navigate } from 'hookrouter';
import { GoHome, GoHeart } from "react-icons/go";

import { useFetch } from '../hooks';
import { API_URL } from '../constants/url';
import { Navigation } from '../components/navigation';
import { Trending } from '../components/trending';
import { NewFeed } from '../components/newfeed';
import Post from '../components/post';
import Button from '../components/button';
import NewPost from '../components/new-post';

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const NavigateTab = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  padding: 5px;
  padding-top: 10px;
  width: 200px;
  cursor: default;

  :hover {
    color: #CF31FF;
  }
`;

function Main() {
  const [data, loading] = useFetch(
    API_URL + '/posts'
  );
  console.log(data);

  const userFullname = localStorage.getItem('userFullname');
  const userEmail = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('userId');

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  const ButtonStyle = {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: '10px',
    paddingRight: '10px'
  };

  if (localStorage.getItem('token')) {
    return (
      <MainContainer>
        <Navigation width='25%'>
          <NavigateTab>
            <GoHome style={{ paddingRight: '5px' }} size={30} />
            Trang chủ
          </NavigateTab>
          <NavigateTab>
            <GoHeart style={{ paddingRight: '5px' }} size={30} />
            Quan tâm
          </NavigateTab>
        </Navigation>
        <NewFeed width='50%'>
          <div style={{ position: 'relative', top: 0, padding: '10px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Pet Lovers</div>
          </div>
          <NewPost />
          {data.dataList && data.dataList.map(post => {
            const likeUsers = post.likes.map(like => like.userId);

            return (<Post
              key={post._id}
              id={post._id}
              isLiked={likeUsers.includes(userId)}
              {...post}
            />);
          }
          )}
        </NewFeed>
        <Trending width='25%'>
          <div style={{ padding: '10px', paddingBottom: '0px', fontWeight: 'bold', fontSize: '18px' }}>{userFullname}</div>
          <div style={{ paddingRight: '10px', paddingBottom: '10px', fontSize: '16px', color: '#666' }}>{userEmail}</div>
          <div style={ButtonStyle}>
            <Button text='Đăng xuất' width='100%' height='40px' margin='0px' borderRadius='20px' onClick={() => logout()} backgroundColor='#8900B0' color='#fff' />
          </div>
        </Trending>
      </MainContainer>
    );
  } else {
    return (
      <Button text='Bạn chưa đăng nhập' onClick={() => navigate('/')} />
    );
  }
}

export default Main;
