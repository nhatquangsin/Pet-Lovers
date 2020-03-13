import React from 'react';

import styled from 'styled-components';
import moment from 'moment';
import { IoIosHeartEmpty } from "react-icons/io";

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
  color: #999;

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

const POST_TYPE = [
  'Nhận nuôi',
  'Tìm người nuôi',
];

function Post(props) {
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
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px', color: '#666' }}>
          Địa chỉ:&nbsp;<Address>{props.address}</Address>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Like>
            <IoIosHeartEmpty />{props.likes}
          </Like>
        </div>
      </div>
    </PostContainer>
  );
}

export default Post;
