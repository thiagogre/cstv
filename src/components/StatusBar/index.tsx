import React from 'react';
import {StatusBar as StatusBarComponent} from 'react-native';

import {dark} from '../../theme';

const StatusBar = () => (
  <StatusBarComponent
    barStyle="light-content"
    backgroundColor={dark.BACKGROUND_COLOR}
  />
);

export default StatusBar;
