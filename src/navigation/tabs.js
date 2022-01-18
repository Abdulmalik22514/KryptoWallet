import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Portfolio, Market, Profile} from '../screens/index';
import {COLORS, icons} from '../constants/index';
import {TabIcon} from '../components';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabBarCustomButton}>
      {children}
    </TouchableOpacity>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 140,
          backgroundColor: COLORS.primary,
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon focused={focused} icon={icons.home} label={'Home'} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                focused={focused}
                icon={icons.briefcase}
                label={'Portfolio'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                focused={focused}
                isTrade={true}
                icon={icons.trade}
                label={'Trade'}
              />
            );
          },
          tabBarButton: props => {
            return (
              <TabBarCustomButton
                {...props}
                onPress={() => console.log('Trade Button')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon focused={focused} icon={icons.market} label={'Market'} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                focused={focused}
                icon={icons.profile}
                label={'Profile'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarCustomButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Tabs;
