import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Button,
  ScrollView,
  View,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import handleLogin from '../../hooks/HandleApis';
import Icon from '../../ui/components/icon';
import {accent, black } from '../../utilities/colors';

export default function LoginScreen({setUserId}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigation = useNavigation();

  const onPressLogin = () => {
    handleLogin(email, password, setUserId, navigation);
  };

  return (
    <View style={{padding: 60}}>
      <ScrollView>
        <View style={styles.img_view}>
          <Image
            style={styles.img}
            source={require('../../assets/images/kcc-logo.png')}
          />
        </View>

        <View style={styles.login_view}>
          <SafeAreaView style={styles.login_form}>
            <Text style={styles.login_text}>Enter Email & Password</Text>
            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconContainer}>
                <Icon
                  name={email ? 'visibility-off' : 'visibility'}
                  size={20}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <Pressable
              onPress={onPressLogin}
              style={{
                paddingVertical: 10,
                width: '100%',
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'lightblue',
                marginTop: 30,
                borderRadius: 30,
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>Login</Text>
            </Pressable>
            <Text
              style={{
                color: accent,
                textDecorationLine: 'underline',
                fontWeight: '500',
                fontSize: 18,
                alignSelf: 'center',
                marginTop: 30,
              }}>
              Forgot password?
            </Text>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  img_view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 150,
    // resizeMode: "contain",
  },

  login_view: {
    paddingTop: 40,
    paddingBottom: 80,
    width: '100%',
  },
  login_text: {
    fontSize: 18,
    fontFamily: 'sans-serif',
    fontWeight: '700',
    color: black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
  icon: {
    width: 20,
    height: 20,
    // resizeMode: "contain",
  },
});
