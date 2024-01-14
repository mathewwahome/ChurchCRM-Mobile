import * as React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  verseImage: {
    width: '100%',
    height: 20,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  TextStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  headingText: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 30,
    color: 'green',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  shareButtonContainer: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },

  shareButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'italic',
    textAlign: 'center',
  },
});
export {styles};
