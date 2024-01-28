import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
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
  const {userId} = props;
  console.log(userId);
  const[data, setData] = useState([]);
  const handleSignOut = () => {
    console.log('Signing out...');
    // setUserId(null);
    // navigation.navigate('LoginScreen');
  };
  useEffect(() => {
    if (userId) {
      fetch(`${BASE_URL}/api/profile/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          console.log('User Data:', data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <View style={styles.itemContainer}>
          <Image
            source={require('../assets/images/one.jpg')}
            style={styles.image_logo}
          />
        </View>
        <Text style={styles.NameText}>
          {data.name}
          <Icon name="person" style={styles.icon} />
        </Text>
        <Text style={styles.EmailText}>
          Admin@gmail.com
          <Icon name="person" style={styles.icon} />
        </Text>
      </View>

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
      <View style={styles.footer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = ({userId, reloadNotes, setReloadNotes}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId !== undefined) {
      console.log('user id container:', userId);

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
      drawerContent={props => <CustomDrawerContent userId={userId} />}>
      <Drawer.Screen
        name="HomeTabs"
        children={() => (
          <BottomTabNavigator
            userId={userId}
            reloadNotes={reloadNotes}
            setReloadNotes={setReloadNotes}
          />
        )}
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
        initialParams={{userId: userId}}
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

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#087E8B',
  },
  NameText: {
    fontSize: 18,
    fontWeight: '900',
    paddingStart: 20,
    color: 'white',
    padding: 10,
  },
  EmailText: {
    fontSize: 18,
    fontWeight: '900',
    paddingStart: 20,
    color: 'white',
    padding: 10,
  },
  content: {
    flex: 4,
  },
  containerSection: {
    // flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: '#000000',
  },
  image_logo: {
    borderWidth: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#087E8B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
  },
  text: {
    color: '#000000',
  },
});

export default DrawerNavigator;
