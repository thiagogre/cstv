import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MatchesList from '../screens/MatchesList';
import MatchDetail from '../screens/MatchDetail';

import {useTheme} from '../hooks';
import {dark, light} from '../theme';

const Stack = createNativeStackNavigator();

const PublicRoutes = () => {
  const {theme} = useTheme();

  const navOptions = React.useMemo(
    () => ({
      headerStyle: {
        backgroundColor:
          theme === 'dark' ? dark.BACKGROUND_COLOR : light.BACKGROUND_COLOR,
        borderBottomWidth: 0,
        elevation: 0,
        height: Platform.OS === 'android' ? 50 : 80,
      },
      headerTintColor:
        theme === 'dark' ? dark.PRIMARY_TEXT : light.PRIMARY_TEXT,
      headerShadowVisible: false,
    }),
    [theme],
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MATCHES_LIST">
        <Stack.Screen
          name="MATCHES_LIST"
          component={MatchesList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MATCH_DETAIL"
          component={MatchDetail}
          options={{
            ...navOptions,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PublicRoutes;
