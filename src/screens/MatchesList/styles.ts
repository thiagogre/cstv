import styled from 'styled-components/native';

export const MatchesList = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.BACKGROUND_COLOR};
`;

export const MatchesContainer = styled.View`
  flex: 1;
  margin: 24px 24px 0 24px;
`;

export const ScrollView = styled.ScrollView``;

export const Cards = styled.View`
  flex: 1;
`;

export const Card = styled.TouchableOpacity<{isFirst: boolean}>`
  ${props => (props.isFirst ? `margin: 24px 0` : `margin-bottom: 24px`)};
  border-radius: 16px;
  background-color: ${props => props.theme.BACKGROUND_LIGHT_COLOR};
`;

export const CardHeader = styled.View`
  align-self: flex-end;
`;

export const CardBody = styled.View`
  align-self: center;
  padding: 18.5px;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.DIVIDER};
`;

export const CardFooter = styled.View`
  padding: 8px 16px;
`;

export const LeagueSerie = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ImageBase = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export const LeagueImage = styled(ImageBase)``;

export const Void = styled(ImageBase)`
  border-radius: 8px;
  background-color: ${props => props.theme.VOID_IMAGE};
`;

export const StatusLabel = styled.View<{status: 'running' | 'not_started'}>`
  padding: 8px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 16px;
  background-color: ${props =>
    props.status === 'running'
      ? props.theme.STATUS_RUNNING
      : props.theme.STATUS_NOT_STARTED};
`;
