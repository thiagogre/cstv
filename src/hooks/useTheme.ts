import React from 'react';

import {storage} from '../storage';

const useTheme = () => {
  const [theme, setTheme] = React.useState(
    storage.getString('@cstv:theme') ?? 'dark',
  );

  const toggleTheme = () => {
    const themeValue = theme === 'dark' ? 'light' : 'dark';
    storage.set('@cstv:theme', themeValue);
    setTheme(themeValue);
  };

  return {theme, setTheme, toggleTheme};
};

export default useTheme;
