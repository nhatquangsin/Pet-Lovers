import React, { useState } from 'react';

import styled from 'styled-components';
import moment from 'moment';
import { navigate } from 'hookrouter';

import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { POST_TYPE } from '../constants/index';
import { API_URL } from '../constants/url';
import { usePostData } from '../hooks';
import { query } from '../utils/query';

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

const UserFullname = styled.a`
  font-weight: bold;
  :hover {
    color: #555;
  }
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

  const onClickUsername = () => {
    navigate('/profile/' + props.user._id);
  }

  return (
    <PostContainer>
      <div style={{ padding: '10px', borderWidth: '1px', borderColor: '#cccccc', borderStyle: 'solid' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <UserInformation>
            <UserFullname onClick={() => onClickUsername()}>
              {props.user.fullname}
            </UserFullname>
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
        {props.user.phone &&
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px', color: '#666' }}>
            Số điện thoại:&nbsp;<Address>{props.user.phone}</Address>
          </div>
        }
        {
          props.images && props.images.map((image, i) =>
            <img src={image} key={i} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
          )
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
