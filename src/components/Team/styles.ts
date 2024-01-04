import styled from 'styled-components/native';

export const Team = styled.View``;

const ImageBase = styled.Image`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
`;

export const TeamImage = styled(ImageBase)``;

export const Void = styled(ImageBase)`
  border-radius: 30px;
  background-color: ${props => props.theme.VOID_IMAGE};
`;
