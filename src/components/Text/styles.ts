import styled from 'styled-components/native';

import {fontSize} from '../../theme';

export const Text = styled.Text<{
  size?: number;
  color?: string;
  spacing?: string;
  bold?: boolean;
  right?: boolean;
}>`
  font-size: ${props => props.size || fontSize.NORMAL}px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  color: ${props => props.color || props.theme.PRIMARY_TEXT};
  margin: ${props => props?.spacing || 0};
  text-align: ${props => (props.right ? 'right' : 'left')};
`;
