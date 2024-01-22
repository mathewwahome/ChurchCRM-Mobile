import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 20,
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  dataDate: {
    color: '#A29E90',
    fontSize: 13,
    fontWeight: '700',
    paddingTop: 7,
  },
  dataTopic: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '800',
    paddingTop: 7,
    paddingBottom: 7,
  },
  dataParagraph: {
    fontSize: 12,
    fontWeight: '600',
  },
});
export {styles};
