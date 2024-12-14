import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Dimensions } from 'react-native';

import PocetniEkran from './screens/PocetniEkran';
import PopisEkran from './screens/PopisEkran';
import EkranDetalji from './screens/EkranDetalji';
import Profil from './screens/Profil';
import EkranIstrazi from './screens/EkranIstrazi';
import store from './store';
import Boje from './constants/Boje';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get('window');

const ucitajFontove = () => {
  return Font.loadAsync({
    Pacifico: require('./assets/Pacifico-Regular.ttf'),
    Ruluko: require('./assets/Ruluko-Regular.ttf'),
  });
};

function App() {
  const [fontUcitan, ucitano] = useState(false);

  if (!fontUcitan) {
    return (
      <AppLoading
        startAsync={ucitajFontove}
        onFinish={() => ucitano(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Boje.Plava,
            },
            headerTintColor: Boje.Bijela,
            headerTitleStyle: {
              fontFamily:'Ruluko',
            },
          }}>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Istraži" component={EkranIstrazi} />
          <Stack.Screen name="Detalji" component={EkranDetalji} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const TabNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Boje.Plava,
          },
          headerTitleStyle: {
            fontFamily: 'Ruluko',
          },
          headerTintColor: Boje.Bijela,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search';
            } else if (route.name === 'MyBooks') {
              iconName = focused ? 'user' : 'user';
            }

            return <Icon name={iconName} size={24} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Boje.Plava,
          inactiveTintColor: Boje.Bijela,
          style: styles.tabBar,
          labelStyle: styles.tabLabel,
        }}>
        <Tab.Screen
          name="Home"
          component={PocetniEkran}
          options={{ tabBarStyle: { backgroundColor: Boje.Matcha } }}
        />
        <Tab.Screen
          name="Search"
          component={PopisEkran}
          options={{ tabBarStyle: { backgroundColor: Boje.Matcha } }}
        />
        <Tab.Screen
          name="MyBooks"
          component={Profil}
          options={{ tabBarStyle: { backgroundColor: Boje.Matcha } }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '10%',
  },
  tabLabel: {
    fontSize: width * 0.04,
    fontFamily: 'Ruluko',
  },
});

export default App;
