import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, TouchableOpacity, StyleSheet, Image, Text, ImageBackground, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
    const navigation = useNavigation();

    const handleSignUp = () => {
        // Perform sign-up logic if needed
        // Navigate to the 'Main' screen
        navigation.navigate('MainContainer');
    };



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
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [phone, setPhone] = useState('');



    return (
        <View style={{ padding: 20, }}>
            <ScrollView>
                {/* the logo */}
                <View style={styles.img_view}>
                    <Image style={styles.img} source={require('../../../assets/images/kcc-logo.png')} />
                </View>

                <View style={styles.login_view}>
                    <SafeAreaView style={styles.login_form}>
                        <Text style={styles.login_text}>Sign up</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="person" size={20} color="black" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                            />
                        </View>
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
                            <Icon name="phone" size={20} color="black" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                            />

                        </View>

                        <Button onPress={handleSignUp}
                            style={{ backgroundColor: 'lightblue', marginTop: 30, borderRadius: 30, }} title='Sign up' />

                        <Text style={{ color: 'blue', fontWeight: '900', fontSize: 18, alignSelf: 'center', marginTop: 30, }}>Have an account? Log in</Text>
                    </SafeAreaView>

                </View>


            </ScrollView>
        </View>
    );
}


