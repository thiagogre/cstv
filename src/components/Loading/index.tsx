import React from 'react';
import {ActivityIndicator} from 'react-native';

import {useTheme} from '../../hooks';

import * as S from './styles';

const Loading = () => {
  const {theme} = useTheme();

  return (
    <S.Loading>
      <ActivityIndicator
        color={theme === 'dark' ? 'white' : 'black'}
        size="large"
      />
    </S.Loading>
  );
};

export default Loading;
