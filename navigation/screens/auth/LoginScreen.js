import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Image, Text, Button, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const styles = StyleSheet.create({
        img_view: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
        },
        img: {
            width: 150,
            height: 150,
            resizeMode: 'contain'
        },

        login_view: {
            paddingTop: 80,
            paddingBottom: 80,
            width: '100%',
        },
        login_text: {
            fontSize: 20,
            fontFamily: 'sans-serif',
            fontWeight: '900',
            color: 'blue',
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
            resizeMode: 'contain',
        },

    });

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const navigation = useNavigation();
    const handleMain = () => {
        navigation.navigate('MainContainer');
    };
    const ProfileScreen = () => {
        navigation.navigate('ProfileScreen');
    };
    const SettingScreen = () => {
        navigation.navigate('SettingScreen');
    };

    return (
        <View style={{ padding: 20, }}>
            <ScrollView>
                {/* the logo */}
                <View style={styles.img_view}>
                    <Image style={styles.img} source={require('../../../assets/images/kcc-logo.png')} />
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
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={20} color="black" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                                <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={20} color="black" style={styles.icon} />
                            </TouchableOpacity>
                        </View>

                        <Button onPress={handleMain} style={{ backgroundColor: 'lightblue', marginTop: 30, borderRadius: 30, }} title="Login" />

                        <Text style={{ color: 'blue', fontWeight: '900', fontSize: 18, alignSelf: 'center', marginTop: 30, }}>Forgot password?</Text>
                        <Text onPress={ProfileScreen}>ProfileScreen</Text>
                        <Text style={{ marginTop: 20, }} onPress={SettingScreen}>SettingScreen</Text>
                    </SafeAreaView>
                </View>
            </ScrollView>
        </View>
    );
}


