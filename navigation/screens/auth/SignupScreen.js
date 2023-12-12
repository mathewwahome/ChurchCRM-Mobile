import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    img_view: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      width: 150,
      height: 150,
      resizeMode: "contain",
    },

    login_view: {
      paddingTop: 80,
      paddingBottom: 80,
      width: "100%",
    },
    login_text: {
      fontSize: 20,
      fontFamily: "sans-serif",
      fontWeight: "900",
      color: "blue",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "white",
      backgroundColor: "gray",
      borderRadius: 5,
      padding: 10,
      marginTop: 20,
    },
    input: {
      flex: 1,
      marginLeft: 10,
    },
    iconContainer: {
      position: "absolute",
      right: 10,
    },
    icon: {
      width: 20,
      height: 20,
      resizeMode: "contain",
    },
  });

  //auth functionality
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    try {
      const response = await axios.post("apiurl/register", {
        name,
        email,
        password,
      });

      const token = response.data.token;

      
    } catch (error) {
      console.error("Registration failed:", error.response.data.errors);
    }
  };
  //end auth functionality

  return (
    <View style={{ padding: 20 }}>
      <ScrollView>
        {/* the logo */}
        <View style={styles.img_view}>
          <Image
            style={styles.img}
            source={require("../../../assets/images/kcc-logo.png")}
          />
        </View>

        <View style={styles.login_view}>
          <SafeAreaView style={styles.login_form}>
            <Text style={styles.login_text}>Sign up</Text>
            <View style={styles.inputContainer}>
              <Icon name="person" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
            </View>
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
              <Icon name="phone" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="phone"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="eye" size={20} color="black" style={styles.icon} />
              <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Pressable
              onPress={handleRegister}
              style={{
                paddingVertical: 10,
                width: "100%",
                height: "auto",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "lightblue",
                marginTop: 30,
                borderRadius: 30,
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Sign up</Text>
            </Pressable>
            <Text
              style={{
                color: "blue",
                fontWeight: "900",
                fontSize: 18,
                alignSelf: "center",
                marginTop: 30,
              }}
            >
              Have an account? Log in
            </Text>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
}
