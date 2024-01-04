import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MatchesList from '../screens/MatchesList';

const Stack = createNativeStackNavigator();

const PublicRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MATCHES_LIST" component={MatchesList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PublicRoutes;
