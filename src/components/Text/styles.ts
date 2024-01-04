import styled from 'styled-components/native';

import {fontSize} from '../../theme';

export const Text = styled.Text<{
  size?: number;
  color?: string;
  spacing?: string;
}>`
  font-size: ${props => props.size || fontSize.NORMAL}px;
  color: ${props => props.color || props.theme.PRIMARY_TEXT};
  margin: ${props => props?.spacing || 0};
`;
