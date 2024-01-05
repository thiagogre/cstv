import React, {Fragment} from 'react';

import Team from '../Team';
import Text from '../Text';

import * as S from './styles';

const Teams = ({opponents}) => {
  const id = React.useId();

  return (
    <S.Teams>
      {opponents?.length > 0 &&
        opponents.map(({opponent}, i) => (
          <Fragment key={id + '-' + i}>
            <Team url={opponent?.image_url} name={opponent?.name} />
            {i < opponents.length - 1 && <Text spacing={'0 20px'}>vs</Text>}
          </Fragment>
        ))}
    </S.Teams>
  );
};

export default Teams;
