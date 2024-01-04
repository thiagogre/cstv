import React, {Fragment} from 'react';
import {ActivityIndicator, RefreshControl} from 'react-native';
import {format, isToday, isTomorrow} from 'date-fns';
import {ptBR} from 'date-fns/locale';

import api from '../../api';
import {fontSize} from '../../theme';
import {useTheme} from '../../hooks';

import Text from '../../components/Text';
import Team from '../../components/Team';
import Loading from '../../components/Loading';

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
  const formatDate = React.useCallback((date?: string) => {
    if (!date) {
      return '--';
    }

    if (isToday(new Date(date))) {
      return format(new Date(date), "'Hoje', HH:mm", {locale: ptBR});
    } else if (isTomorrow(new Date(date))) {
      return format(new Date(date), "EEE', 'HH:mm", {locale: ptBR});
    } else {
      return format(new Date(date), 'dd.MM HH:mm', {locale: ptBR});
    }
  }, []);

  return (
    <S.StatusLabel status={status}>
      <Text size={fontSize.TINY}>
        {status === 'running' ? 'AGORA' : formatDate(beginAt)}
      </Text>
    </S.StatusLabel>
  );
};

const Card = ({data, isFirst}) => {
  const id = React.useId();

  return (
    <S.Card isFirst={isFirst} onPress={() => {}}>
      <S.CardHeader>
        <StatusLabel beginAt={data?.begin_at} status={data?.status} />
      </S.CardHeader>
      <S.CardBody>
        <S.Teams>
          {data?.opponents?.length > 0 &&
            data.opponents.map(({opponent}, i) => (
              <Fragment key={id + '-' + i}>
                <Team url={opponent?.image_url} name={opponent?.name} />
                {i < data.opponents.length - 1 && (
                  <Text spacing={'0 20px'}>vs</Text>
                )}
              </Fragment>
            ))}
        </S.Teams>
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
  const {theme} = useTheme();
  const id = React.useId();
  const [loading, setLoading] = React.useState(true);
  const [infinityScrollLoading, setInfinityScrollLoading] =
    React.useState(false);
  const [matches, setMatches] = React.useState<any[] | null>(null);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  //         `https://api.pandascore.co/csgo/matches?filter[status]=not_started,running&sort=begin_at&page=1&page[size]=5`,

  //           `https://api.pandascore.co/csgo/teams?filter[id]=129160`,

  const scrollViewRef = React.useRef(null);

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

        // if (!data?.length) {
        //   setHasNextPage(false);
        // }

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
              ref={scrollViewRef}
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
