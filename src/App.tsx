import * as React from 'react';
import {Animated, Image} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {ThemeProvider} from 'styled-components';

import {dark, light} from './theme';
import {useTheme} from './hooks';

import StatusBar from './components/StatusBar';

import PublicRoutes from './routes/PublicRoutes';

import * as S from './styles';

type AnimatedBootSplashProps = {
  onAnimationEnd: () => void;
};
const AnimatedBootSplash = ({onAnimationEnd}: AnimatedBootSplashProps) => {
  const [opacity] = React.useState(() => new Animated.Value(1));

  const {container, logo} = BootSplash.useHideAnimation({
    manifest: require('../assets/bootsplash_manifest.json'),
    logo: require('../assets/bootsplash_logo.png'),
    statusBarTranslucent: true,
    navigationBarTranslucent: false,
    animate: () => {
      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 2000,
      }).start(onAnimationEnd);
    },
  });

  return (
    <Animated.View {...container} style={[container.style, {opacity}]}>
      <Image {...logo} />
    </Animated.View>
  );
};

type BootSplashAnimationProps = {
  callback: () => void;
};
const BootSplashAnimation = ({callback}: BootSplashAnimationProps) => {
  return (
    <>
      <StatusBar />
      <S.BootSplashContainer>
        <AnimatedBootSplash onAnimationEnd={callback} />
      </S.BootSplashContainer>
    </>
  );
};

const App = () => {
  const [isBootSplashVisible, setIsBootSplashVisible] = React.useState(true);
  const {theme} = useTheme();

  return (
    <S.App>
      {isBootSplashVisible ? (
        <BootSplashAnimation callback={() => setIsBootSplashVisible(false)} />
      ) : (
        <ThemeProvider theme={theme === 'dark' ? dark : light}>
          <StatusBar />
          <PublicRoutes />
        </ThemeProvider>
      )}
    </S.App>
  );
};

export default App;
