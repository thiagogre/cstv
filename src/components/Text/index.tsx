import React from 'react';
import {Text as TextComponent, TextStyle} from 'react-native';

const Text = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  props: TextStyle;
}) => {
  return <TextComponent {...props}>{children}</TextComponent>;
};

export default Text;
