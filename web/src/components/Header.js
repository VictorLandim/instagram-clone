import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import camera from '../assets/camera.svg';

const Header = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const HeaderContent = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderImage = styled.img`
  max-width: 100%;
  height: 25px;
`;

export default () => (
  <Header>
    <HeaderContent>
      <Link to="/">
        <HeaderImage src={logo} />
      </Link>
      <Link to="/new">
        <HeaderImage src={camera} />
      </Link>
    </HeaderContent>
  </Header>
);
