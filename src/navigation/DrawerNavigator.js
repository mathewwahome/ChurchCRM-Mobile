import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import BottomTabNavigator from './BottomTabNavigator';
import ProfileScreen from '../screens/auth/ProfileScreen';
import More from '../screens/More';
import {BASE_URL} from '../hooks/HandleApis';
const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      {Object.entries(props.descriptors).map(([key, descriptor], index) => {
        const focused = index === props.state.index;
        return (
          <DrawerItem
            key={key}
            label={() => (
              <Text
                style={
                  focused ? styles.drawerLabelFocused : styles.drawerLabel
                }>
                {descriptor.options.title}
              </Text>
            )}
            onPress={() =>
              descriptor.navigation.navigate(descriptor.route.name)
            }
            style={[
              styles.drawerItem,
              focused ? styles.drawerItemFocused : null,
            ]}
          />
        );
      })}
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = ({userId}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId !== undefined) {
      console.log('user id caontainer:', userId);

      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = async userId => {
    try {
      const response = await fetch(`${BASE_URL}/api/profile/${userId}`);
      const userData = await response.json();

      setUserData(userData);

      console.log('User Data:', userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: '#087E8B',
          height: 50,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.headerLeft}>
            <Icon name="bars" size={20} color="#ffffff" />
          </TouchableOpacity>
        ),
      })}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          headerRight: () => (
            <View style={styles.headerRight}>
              <Icon name="bell" size={20} color="#fff" />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{userId: userId}}
        options={{
          title: 'ProfileScreen',
          labelStyle: styles.drawerLabelWhite,
          headerTitle: () => (
            <Text style={styles.headerTitle}>ProfileScreen</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="More"
        component={More}
        options={{
          title: 'More',
          labelStyle: styles.drawerLabelWhite,
          headerTitle: () => <Text style={styles.headerTitle}>More</Text>,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 15,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 15,
  },
  drawerLabel: {
    fontSize: 14,
    color: '#000000',
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  drawerLabelWhite: {
    color: '#ffffff',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center',
  },
  drawerItemFocused: {
    backgroundColor: '#087E8B',
  },
});

export default DrawerNavigator;
