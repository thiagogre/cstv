import * as React from 'react';
import {Animated, Image, View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1D1E20',
      }}>
      <Text style={{color: 'red'}}>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

type Props = {
  onAnimationEnd: () => void;
};
const AnimatedBootSplash = ({onAnimationEnd}: Props) => {
  const [opacity] = React.useState(() => new Animated.Value(1));

  const {container, logo /*, brand */} = BootSplash.useHideAnimation({
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

const BootSplashAnimation = ({callback}) => {
  return (
    <View style={{flex: 1}}>
      <AnimatedBootSplash onAnimationEnd={callback} />
    </View>
  );
};

const App = () => {
  const [isBootSplashVisible, setIsBootSplashVisible] = React.useState(true);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#1D1E20'} />
      {isBootSplashVisible ? (
        <BootSplashAnimation callback={() => setIsBootSplashVisible(false)} />
      ) : (
        <NavigationContainer
          onReady={() => {
            BootSplash.hide();
          }}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
