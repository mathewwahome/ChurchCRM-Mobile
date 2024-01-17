import * as React from "react";
import {
  StyleSheet,
  Image,
  Text,
  Button,
  ImageBackground,
  ScrollView,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./assets/css/AuthScreens";
import { dailyVerse } from "./hooks/HandleApis";
import { useState, useEffect } from "react";
import Logo from "./utilities/Logo";

export default function LandingScreen() {
  const navigation = useNavigation();
  const handleSignUp = () => {
    navigation.navigate("SignupScreen");
  };
  const handleLogin = () => {
    navigation.navigate("LoginScreen");
  };
  const screens = () => {
    navigation.navigate('MainContainer');
  };

  return (
    <View style={styles.landing_screen_container}>
      <ScrollView>
        <View style={styles.img_view}>
          <Logo styles={styles.img}/>
        </View>
        <View style={styles.auth_btn}>
          <TouchableOpacity onPress={handleLogin} style={styles.authentication_buttons}>
            <Text style={styles.auth_btn_text}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignUp} style={styles.signin}>
            <Text style={{ ...styles.auth_btn_text, color: "#0A7E8B" }}>Sign up</Text>
          </TouchableOpacity>

          <Pressable onPress={screens}>
            <Text style={styles.forgot_password}>Forgot password?</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}