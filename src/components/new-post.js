import React, { useState } from 'react';

import styled from 'styled-components';

import { useFetch } from '../hooks';
import Button from './button';
import { FiImage } from 'react-icons/fi';
import { usePostData } from '../hooks';
import { POST_TYPE } from '../constants/index';
import { API_URL } from '../constants/url';

const NewPostContainer = styled.div`
  width: 96%;
  display: flex;
  flex-direction: column;
  padding: 2%;
  border: solid 1px #ccc;
`;

const ActionBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContentInput = styled.textarea`
  outline: none;
  font-size: 16px;
  height: ${props => props.height || '80px'};
  margin-bottom: 5px;
  border: none;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #F0BDFF;
  }
`;

const PostTypeSelect = styled.select`
  height: 30px;
  outline: none;
  margin: 5px;
`;

const PostTypeOption = styled.option``;

function NewPost() {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState(0);

  const senId = localStorage.getItem('userId');

  const [res, post] = usePostData({
    url: API_URL + '/posts',
    data: {
      postType,
      content,
      senId,
    }
  }, (res) => { 
    window.location.reload();
  });

  return (
    <NewPostContainer>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <ContentInput
          placeholder='Tình trạng thú cưng của bạn?'
          value={content}
          onChange={event => setContent(event.target.value)}
        />
      </div>
      <ActionBar>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <ImageContainer style={{ width: '40px', height: '40px', borderRadius: '20px' }} >
            <FiImage size='30' color='#8900B0' />
          </ImageContainer>
          <PostTypeSelect value={postType}
            onChange={event => setPostType(event.target.value)}
          >
            <PostTypeOption value={0}>{POST_TYPE[0]}</PostTypeOption>
            <PostTypeOption value={1}>{POST_TYPE[1]}</PostTypeOption>
          </PostTypeSelect>
        </div>
        <Button
          text='Đăng bài'
          margin='0px'
          width='100px'
          height='40px'
          backgroundColor='#8900B0'
          color='#fff'
          borderRadius='20px'
          onClick={() => post()}
        />
      </ActionBar>
    </NewPostContainer>
  );
}

export default NewPost;

