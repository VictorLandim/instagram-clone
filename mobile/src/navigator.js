import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Feed from './screens/Feed';
import New from './screens/New';

import Logo from './assets/logo.png';

export default createAppContainer(
  createStackNavigator(
    {
      Feed,
      New
    },
    {
      initialRouteName: 'Feed',
      defaultNavigationOptions: {
        headerTitle: <Image source={Logo} />,
        headerTintColor: '#000',
        headerTitleContainerStyle: {
          paddingLeft: 20
        },
        headerRightContainerStyle: { paddingRight: 20 }
      },
      mode: 'modal'
    }
  )
);
