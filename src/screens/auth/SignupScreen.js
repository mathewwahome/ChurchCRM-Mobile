import React, {useState} from 'react';
import {
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import handleRegister from '../../hooks/HandleSignup';
import Logo from '../../utilities/Logo';
import CustomTextInput from '../../hooks/CustomTestInput';
import {styles} from '../../assets/css/AuthScreens';

import Icon from 'react-native-vector-icons/Ionicons';
export default function SignupScreen({setUserId}) {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmpassword: '',
  });

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const registerUser = () => {
    handleRegister(
      userData.name,
      userData.email,
      userData.phone,
      userData.password,
      userData.confirmpassword,

      // loggedUser,
    );
  };

  // setUserId(loggedUser);

  return (
    <View style={{padding: 20}}>
      <ScrollView>
        <View style={styles.signup_img}>
          <Logo styles={styles.signup_img} />
        </View>

        <View style={styles.login_view}>
          <SafeAreaView style={styles.login_form}>
            <Text style={styles.login_text}>Sign up</Text>
            <View>
              <CustomTextInput
                iconName="person"
                placeholder="Name"
                value={userData.name}
                onChangeText={text =>
                  setUserData(data => ({...data, name: text}))
                }
              />

              <CustomTextInput
                iconName="email"
                placeholder="Email"
                value={userData.email}
                onChangeText={text =>
                  setUserData(data => ({...data, email: text}))
                }
              />

              <CustomTextInput
                iconName="phone"
                placeholder="Phone"
                value={userData.phone}
                onChangeText={text =>
                  setUserData(data => ({...data, phone: text}))
                }
              />

              <CustomTextInput
                iconName="lock"
                placeholder="Password"
                secureTextEntry
                value={userData.password}
                onChangeText={text =>
                  setUserData(data => ({...data, password: text}))
                }
              />
              <CustomTextInput
                iconName="lock"
                placeholder="Forgot Password"
                secureTextEntry
                value={userData.confirmpassword}
                onChangeText={text =>
                  setUserData(data => ({...data, confirmpassword: text}))
                }
              />
            </View>
            <TouchableOpacity
              onPress={registerUser}
              title="Submit"
              style={styles.signup_btn}>
              <Text style={{...styles.auth_btn_text, color: '#ffffff'}}>
                Sign up
              </Text>
            </TouchableOpacity>

            <View style={styles.account_container}>
              <Text style={styles.account}>Have an account?</Text>
              <Pressable onPress={handleLogin}>
                <Text style={styles.login_link}> Log in</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
}
