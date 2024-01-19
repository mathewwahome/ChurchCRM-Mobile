import React from 'react';
import {View, TextInput} from 'react-native';
import {styles} from '../assets/css/AuthScreens';
import Icon from '../ui/components/icon';
const CustomTextInput = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={20} color="black" style={styles.icon} />
      <TextInput
        style={styles.login_input}
        placeholder={placeholder}
        placeholderTextColor={'#b7b7b7'}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomTextInput;
