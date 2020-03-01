import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const Container = styled.div`
  margin: 20px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;

  input {
    width: 100%;
    border: none;
    outline: none;
    display: block;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 10px 15px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  input[type='submit'] {
    background-color: blueviolet;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
  }
`;

export default ({ history }) => {
  const [image, setImage] = useState('');

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(document.getElementById('form'));
    formData.append('image', image);

    await api.post('/posts', formData);

    history.push('/');
  };

  return (
    <Container>
      <Form id="form" onSubmit={onSubmit}>
        <input type="file" onChange={e => setImage(e.target.files[0])} />

        <input type="text" name="author" placeholder="Autor" />
        <input type="text" name="location" placeholder="Location" />
        <input type="text" name="description" placeholder="Description" />
        <input type="text" name="hashtags" placeholder="Hashtags" />

        <input type="submit" value="Enviar" />
      </Form>
    </Container>
  );
};
