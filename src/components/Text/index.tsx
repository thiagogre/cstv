import React from 'react';

import * as S from './styles';

type Props = {
  children: React.ReactNode;
  color?: string;
  size?: number;
  spacing?: string;
};
const Text = (props: Props) => {
  const {children} = props;

  return <S.Text {...props}>{children}</S.Text>;
};

export default Text;
