import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import io from 'socket.io-client';

import api from '../services/api';

import camera from '../assets/camera.png';

import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

const Container = styled.View`
  flex: 1;
`;

const Post = styled.View`
  background-color: #fff;
  margin-bottom: 20px;
`;

const Header = styled.View`
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.View``;

const Name = styled.Text`
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;

const Location = styled.Text`
  font-size: 12px;
  color: #666;
`;

const MoreIcon = styled.Image`
  width: 20px;
`;

const Footer = styled.View`
  padding: 15px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 400px;
`;

const Actions = styled.View`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Icon = styled.Image`
  height: 20px;
  margin-right: 5px;
`;

const Likes = styled.Text`
  margin-bottom: 5px;
  font-size: 13px;
`;

const Description = styled.Text`
  font-size: 13px;
  margin-bottom: 5px;
`;

const Hashtags = styled.Text`
  font-size: 12px;
  color: #095fcf;
`;

const LikeButton = styled.TouchableOpacity`
  background-color: transparent;
  border: 0;
`;

const Feed = () => {
  const handleLike = async id => await api.post(`/posts/${id}/like`);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const socket = io('http://192.168.1.39:4000');

      socket.on('post', post => setPosts(posts => [post, ...posts]));
      socket.on('like', likedPost =>
        setPosts(posts => posts.map(post => (likedPost._id === post._id ? likedPost : post)))
      );

      const { data } = await api.get('/posts');

      setPosts(data);
    })();
  }, []);

  return (
    <Container>
      <FlatList
        data={posts}
        keyExtractor={post => post._id}
        renderItem={({ item: post }) => (
          <Post key={post._id}>
            <Header>
              <UserInfo>
                <Name>{post.author}</Name>

                <Location>{post.location}</Location>
              </UserInfo>

              <MoreIcon source={more} />
            </Header>

            <PostImage source={{ uri: `http://192.168.1.39:4000/files/${post.image}` }} />

            <Footer>
              <Actions>
                <LikeButton onPress={() => handleLike(post._id)}>
                  <Icon source={like} />
                </LikeButton>
                <Icon source={comment} />
                <Icon source={send} />
              </Actions>

              <Likes>{post.likes} likes</Likes>

              <Description>{post.description}</Description>

              <Hashtags>{post.hashtags}</Hashtags>
            </Footer>
          </Post>
        )}
      />
    </Container>
  );
};

Feed.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('New')}>
      <Image source={camera} />
    </TouchableOpacity>
  )
});

export default Feed;
