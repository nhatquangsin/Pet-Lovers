import React, { useState } from 'react';

import styled from 'styled-components';
import moment from 'moment';

import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { POST_TYPE } from '../constants/index';
import { API_URL } from '../constants/url';
import { usePostData } from '../hooks';

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UserInformation = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;

const UserFullname = styled.div`
  font-weight: bold;
`;

const PostTitle = styled.div``;

const Content = styled.div`
  margin-bottom: 5px;
`;

const Date = styled.div`
  margin-left: 10px;
  color: #888;
`;

const Like = styled.div`
  display: flex;
  flex-direction: row;
  width: 30px;
  padding: 10px;
  justify-content: space-between;
  border-radius: 5px;
  color: ${props => props.isLiked ? '#FF2F2F' : '#999'};

  :hover {
    background-color: #FFCDCD;
    color: #FF2F2F;
    transition: 1;
  }
`;

const Address = styled.div``;

const PostType = styled.div`
  background-color: ${props => props.postType === 0 ? '#F1D1FF' : '#B6FFD7'};
  color: ${props => props.postType === 0 ? '#D519FF' : '#008019'};
  padding: 10px;
  border-radius: 10px;
`;

function Post(props) {
  const [likes, setLikes] = useState(props.likes.length);
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const userId = localStorage.getItem('userId');

  const [likeResponse, like] = usePostData({
    url: API_URL + '/likes',
    data: {
      postId: props.id,
      userId,
    }
  }, (res) => { 
  });

  const [dislikeResponse, disLike] = usePostData({
    url: API_URL + '/likes/delete',
    data: {
      postId: props.id,
      userId,
    }
  }, (res) => { 
  });

  return (
    <PostContainer>
      <div style={{ padding: '10px', borderWidth: '1px', borderColor: '#cccccc', borderStyle: 'solid' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <UserInformation>
            <UserFullname>{props.user.fullname}</UserFullname>
            <Date>{moment(parseInt(props.createdAt)).format('MMM DD, HH:mm')}</Date>
          </UserInformation>
          <PostType postType={props.postType}>{POST_TYPE[props.postType]}</PostType>
        </div>

        <Content>{props.content}</Content>
        {props.address &&
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px', color: '#666' }}>
            Địa chỉ:&nbsp;<Address>{props.address}</Address>
          </div>
        }
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Like isLiked={isLiked} onClick={() => {
            if (isLiked) {
              disLike();
              setIsLiked(!isLiked);
              setLikes(likes - 1);
            } else {
              like();
              setIsLiked(!isLiked);
              setLikes(likes + 1)
            }
          }}>
            {
              isLiked ? <IoIosHeart /> : <IoIosHeartEmpty />
            }
            {likes}
          </Like>
        </div>
      </div>
    </PostContainer>
  );
}

export default Post;
