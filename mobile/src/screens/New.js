import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-picker';

import api from '../services/api';

const Container = styled.KeyboardAvoidingView.attrs({})`
  flex: 1;
  padding: 20px;
`;

const FileButton = styled.TouchableOpacity`
  border: 1px dashed #ddd;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const FileButtonText = styled.Text`
  color: #999;
`;

const FileButtonImage = styled.Image`
  width: 40px;
  height: 40px;
`;

const Input = styled.TextInput`
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
`;

const Submit = styled.TouchableOpacity`
  background-color: purple;
  padding: 15px;
  text-align: center;
  border-radius: 5px;
  margin-top: 10px;
`;

const SubmitText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

const New = ({ navigation }) => {
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [fileText, setFileText] = useState('Select image');
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null);

  const selectImage = () =>
    ImagePicker.showImagePicker(
      {
        title: 'Select Image'
      },
      upload => {
        const { error, didCancel, fileName, data, uri, type } = upload;

        if (error) return Alert.alert('Error while selecting image.');
        if (didCancel) return;

        setFileText(fileName);
        setImageUri(`data:image/jpeg;base64,${data}`);

        const name = fileName ? `${fileName.split('.')[0]}.jpg` : `${new Date().getTime()}.jpg`;

        const image = {
          uri,
          type,
          name
        };

        setImage(image);
      }
    );

  const submit = async () => {
    const formData = new FormData();

    formData.append('author', author);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('hashtags', hashtags);
    formData.append('image', image);

    await api.post('/posts', formData);

    navigation.navigate('Feed');
  };

  return (
    <Container>
      <FileButton onPress={selectImage}>
        <FileButtonText>{fileText}</FileButtonText>
        {imageUri && <FileButtonImage source={{ uri: imageUri }} />}
      </FileButton>

      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Author name"
        placeholderTextColor="#999"
        value={author}
        onChangeText={setAuthor}
      />

      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Picture location"
        placeholderTextColor="#999"
        value={location}
        onChangeText={setLocation}
      />

      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Description"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
      />

      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Hashtags"
        placeholderTextColor="#999"
        value={hashtags}
        onChangeText={setHashtags}
      />

      <Submit onPress={submit}>
        <SubmitText>Share</SubmitText>
      </Submit>
    </Container>
  );
};

New.navigationOptions = {
  headerTitle: 'New post'
};

export default New;
