import * as React from 'react';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    padding: 20,
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
  },
  //The Body css
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: '900',
  },
});
export {styles};
