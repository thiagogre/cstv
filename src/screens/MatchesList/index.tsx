import React from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import api from '../../api';
import {fontSize} from '../../theme';
import {formatDate} from '../../utils/date';

import Text from '../../components/Text';
import Loading from '../../components/Loading';
import Teams from '../../components/Teams';

import * as S from './styles';

const LeagueSerie = ({url, name}) => {
  return (
    <S.LeagueSerie>
      {url ? <S.LeagueImage source={{uri: url}} /> : <S.Void />}
      <Text size={fontSize.TINY}>{name}</Text>
    </S.LeagueSerie>
  );
};

const StatusLabel = ({status, beginAt}) => {
  return (
    <S.StatusLabel status={status}>
      <Text size={fontSize.TINY}>
        {status === 'running' ? 'AGORA' : formatDate(beginAt)}
      </Text>
    </S.StatusLabel>
  );
};

const Card = ({data, isFirst}) => {
  const navigation = useNavigation();

  return (
    <S.Card
      isFirst={isFirst}
      onPress={() => navigation.navigate('MATCH_DETAIL', {data})}>
      <S.CardHeader>
        <StatusLabel beginAt={data?.begin_at} status={data?.status} />
      </S.CardHeader>
      <S.CardBody>
        <Teams opponents={data?.opponents} />
      </S.CardBody>
      <S.Divider />
      <S.CardFooter>
        <LeagueSerie
          url={data?.league?.image_url}
          name={data?.league?.name + ' - ' + data?.serie?.full_name}
        />
      </S.CardFooter>
    </S.Card>
  );
};

const MatchesList = () => {
  const id = React.useId();
  const [loading, setLoading] = React.useState(true);
  const [infinityScrollLoading, setInfinityScrollLoading] =
    React.useState(false);
  const [matches, setMatches] = React.useState<any[] | null>(null);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  const handleScroll = event => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    if (
      [
        scrollY + scrollViewHeight >= contentHeight,
        !infinityScrollLoading,
        hasNextPage,
      ].every(Boolean)
    ) {
      setPage(prev => prev + 1);
    }
  };

  const getData = React.useCallback(
    async (reset?: boolean) => {
      setInfinityScrollLoading(true);

      try {
        let query = `https://api.pandascore.co/csgo/matches?filter[status]=not_started,running&sort=begin_at&page[number]=${page}&page[size]=5`;
        if (reset) {
          setPage(1);

          if (page === 1) {
            return getData();
          } else {
            return;
          }
        }

        const {data} = await api.get(query);

        if (!data?.length) {
          setHasNextPage(false);
        }

        setMatches(prev =>
          page === 1 ? data : prev ? [...prev, ...data] : data ?? [],
        );
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
      setInfinityScrollLoading(false);
    },
    [page],
  );

  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <S.MatchesList>
      <S.MatchesContainer>
        <Text size={fontSize.LARGE}>Partidas</Text>
        {!loading ? (
          matches?.length > 0 && (
            <S.ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              refreshControl={
                <RefreshControl
                  refreshing={infinityScrollLoading}
                  onRefresh={() => {
                    getData(true);
                  }}
                />
              }>
              <S.Cards>
                {matches.map((match, i) => (
                  <Card key={id + '-' + i} data={match} isFirst={i === 0} />
                ))}
              </S.Cards>
            </S.ScrollView>
          )
        ) : (
          <Loading />
        )}
      </S.MatchesContainer>
    </S.MatchesList>
  );
};

export default MatchesList;
