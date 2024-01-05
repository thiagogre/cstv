import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';

import {formatDate} from '../../utils/date';
import api from '../../api';
import {useTheme} from '../../hooks';
import {dark, fontSize, light} from '../../theme';

import Teams from '../../components/Teams';
import Text from '../../components/Text';
import Loading from '../../components/Loading';

import * as S from './styles';

const Player = ({name, avatarUrl, nickname, borderSide}) => {
  const {theme} = useTheme();

  return (
    <S.Player borderSide={borderSide}>
      <S.PlayerAbsolute borderSide={borderSide}>
        {borderSide === 'left' ? (
          <>
            {avatarUrl ? <S.Avatar source={{uri: avatarUrl}} /> : <S.Void />}
            <S.Right>
              <Text bold size={fontSize.MEDIUM}>
                {nickname}
              </Text>
              <Text
                color={
                  theme === 'dark' ? dark.SECONDARY_TEXT : light.SECONDARY_COLOR
                }>
                {name}
              </Text>
            </S.Right>
          </>
        ) : (
          <>
            <S.Right>
              <Text bold right size={fontSize.MEDIUM}>
                {nickname}
              </Text>
              <Text
                right
                color={
                  theme === 'dark' ? dark.SECONDARY_TEXT : light.SECONDARY_COLOR
                }>
                {name}
              </Text>
            </S.Right>
            {avatarUrl ? <S.Avatar source={{uri: avatarUrl}} /> : <S.Void />}
          </>
        )}
      </S.PlayerAbsolute>
    </S.Player>
  );
};

const MatchDetail = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const {data} = route.params;

  const id = React.useId();
  const [loading, setLoading] = React.useState(false);
  const [teams, setTeams] = React.useState<any[]>([]);

  const getData = React.useCallback(async (teamId: string) => {
    if (!teamId) {
      return;
    }

    setLoading(true);

    try {
      const {data: res} = await api.get(
        `https://api.pandascore.co/csgo/teams?filter[id]=${teamId}`,
      );

      setLoading(false);
      return res ?? [];
    } catch (e) {
      setLoading(false);

      console.error(e);
    }
  }, []);

  React.useEffect(() => {
    navigation.setParams({
      headerTitle: data?.league?.name + ' - ' + data?.serie?.full_name,
    });
  }, []);

  React.useEffect(() => {
    (async () => {
      if (data?.opponents?.length) {
        const [teamOne, teamTwo] = await Promise.all(
          data.opponents.map(({opponent}) => getData(opponent.id)),
        );
        setTeams([...teamOne, ...teamTwo]);
      }
    })();
  }, [getData, data]);

  return (
    <S.MatchDetail>
      <S.CenterContainer>
        <Teams opponents={data?.opponents} />
        <Text bold spacing="20px 0 0 0">
          {data?.status === 'running' ? 'AGORA' : formatDate(data?.begin_at)}
        </Text>
      </S.CenterContainer>
      {loading ? (
        <Loading />
      ) : (
        <S.Players>
          <S.ScrollView showsVerticalScrollIndicator={false}>
            <S.TeamsContainer>
              {teams?.length > 1 &&
                teams.map((team, i) => (
                  <S.TeamContainer key={id + '-' + i}>
                    {team?.players?.map((player, j) => (
                      <Player
                        key={id + '-' + i + j}
                        name={player.first_name + ' ' + player.last_name}
                        nickname={player.name}
                        avatarUrl={player.image_url}
                        borderSide={i === 0 ? 'right' : 'left'}
                      />
                    ))}
                  </S.TeamContainer>
                ))}
            </S.TeamsContainer>
          </S.ScrollView>
        </S.Players>
      )}
    </S.MatchDetail>
  );
};

export default MatchDetail;
