import React, { useState } from 'react';

import styled from 'styled-components';
import axios from 'axios';

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

const ImageContainer = styled.form`
  display: flex;
  flex-direction: row;
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
  const [images, setImages] = useState([]);

  const senId = localStorage.getItem('userId');

  const onPostSubmit = async () => {
    const formData = new FormData();

    images.forEach((image, i) => {
      formData.append(i, image);
    });

    const uploadResponse = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    const result = await uploadResponse.json();
    const uploadedImages = result.dataList.map(data => data.url);

    const postResponse = await axios({
      method: 'POST',
      url: `${API_URL}/posts`,
      data: {
        postType,
        content,
        senId,
        images: uploadedImages,
      },
    });

    if (postResponse.status === 200) {
      window.location.reload();
    }
  }

  return (
    <NewPostContainer>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <ContentInput
          placeholder='Tình trạng thú cưng của bạn?'
          value={content}
          onChange={event => setContent(event.target.value)}
        />
        {
          images && images.map((image, i) =>
            <img src={URL.createObjectURL(image)} key={i} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
          )
        }
      </div>
      <ActionBar>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <ImageContainer
            style={{ width: '40px', height: '40px', borderRadius: '20px' }}
            onClick={() => document.getElementById('imageInput').click()}
          >
            <FiImage size='30' color='#8900B0' />
            <input
              type='file'
              id='imageInput'
              onChange={event => setImages([...images, event.target.files[0]])}
              multiple
              hidden
            />
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
          onClick={() => onPostSubmit()}
        />
      </ActionBar>
    </NewPostContainer>
  );
}

export default NewPost;

