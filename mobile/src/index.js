import React from 'react';
import RootNavigator from './navigator';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

export default () => <RootNavigator />;
