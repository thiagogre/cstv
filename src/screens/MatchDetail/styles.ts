import styled from 'styled-components/native';

export const MatchDetail = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.BACKGROUND_COLOR};
`;

export const CenterContainer = styled.View`
  align-items: center;
  margin: 24px 0;
`;

export const ScrollView = styled.ScrollView``;

export const Players = styled.View``;

export const Player = styled.View<{borderSide: 'left' | 'right'}>`
  margin-bottom: 12px;
  background-color: ${props => props.theme.BACKGROUND_LIGHT_COLOR};
  ${props =>
    props.borderSide === 'left'
      ? 'border-top-left-radius: 8px;border-bottom-left-radius: 8px;margin-left: 6px;'
      : 'border-top-right-radius: 8px;border-bottom-right-radius: 8px;margin-right: 6px;'}
`;

export const PlayerAbsolute = styled.View<{borderSide: 'left' | 'right'}>`
  flex-direction: row;
  align-items: center;
  ${props =>
    props.borderSide === 'left'
      ? 'justify-content: flex-start;'
      : 'justify-content: flex-end;'}
`;

export const Right = styled.View``;

const ImageBase = styled.Image`
  width: 49.5px;
  height: 49.5px;
  margin-bottom: 10px;
  margin: 0 12px 10px 12px;
  border-radius: 8px;
`;

export const Avatar = styled(ImageBase)``;

export const Void = styled(ImageBase)`
  background-color: ${props => props.theme.VOID_IMAGE};
`;

export const TeamsContainer = styled.View`
  flex-direction: row;
`;
export const TeamContainer = styled.View`
  flex: 1;
`;
