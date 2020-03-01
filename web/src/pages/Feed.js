import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

import api from '../services/api';

const PostList = styled.section`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 30px;
`;

const Post = styled.article`
  background-color: #fff;
  border: 1px solid #ddd;
  margin-top: 30px;
  border-radius: 5px;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div``;

const Name = styled.p`
  font-size: 13px;
`;

const Location = styled.p`
  font-size: 11px;
  color: #666;
  margin-top: 3px;
`;

const Icon = styled.img`
  height: 20px;
  margin-right: 10px;
`;

const MoreIcon = styled.img`
  width: 20px;
`;

const Footer = styled.footer`
  padding: 15px;
`;

const Image = styled.img`
  max-width: 100%;
  width: 100%;
`;

const Actions = styled.div`
  margin-bottom: 10px;
`;

const Likes = styled.strong`
  margin-bottom: 5px;
  font-size: 13px;
  display: block;
`;

const Description = styled.div`
  font-size: 13px;
  margin-bottom: 5px;
`;

const Hashtags = styled.div`
  font-size: 12px;
  color: #095fcf;
`;

const LikeButton = styled.button`
  background-color: transparent;
  border: 0;
`;

const Feed = () => {
  const handleLike = async id => await api.post(`/posts/${id}/like`);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const socket = io('http://localhost:4000');

      socket.on('post', post => setPosts(posts => [post, ...posts]));

      socket.on('like', likedPost =>
        setPosts(posts => posts.map(post => (likedPost._id === post._id ? likedPost : post)))
      );

      const { data } = await api.get('/posts');
      console.log(data);

      setPosts(data);
    })();
  }, []);

  return (
    <PostList>
      {posts.map(post => (
        <Post key={post._id}>
          <Header>
            <UserInfo>
              <Name>{post.author}</Name>

              <Location>{post.location}</Location>
            </UserInfo>

            <MoreIcon src={more} />
          </Header>

          <Image src={`http://localhost:4000/files/${post.image}`} />

          <Footer>
            <Actions>
              <LikeButton onClick={() => handleLike(post._id)}>
                <Icon src={like} />
              </LikeButton>
              <Icon src={comment} />
              <Icon src={send} />
            </Actions>

            <Likes>{post.likes} likes</Likes>

            <Description>{post.description}</Description>

            <Hashtags>{post.hashtags}</Hashtags>
          </Footer>
        </Post>
      ))}
    </PostList>
  );
};

export default Feed;
