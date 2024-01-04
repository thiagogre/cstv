import React from 'react';
import Text from '../Text';

import * as S from './styles';

type Props = {
  url?: string;
  name: string;
};
const Team = (props: Props) => {
  const {url, name} = props;

  return (
    <S.Team>
      {url ? <S.TeamImage source={{uri: url}} /> : <S.Void />}
      <Text>{name}</Text>
    </S.Team>
  );
};

export default Team;
