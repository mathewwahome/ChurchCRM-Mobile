import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
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
  downloadNotesButton: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#087E8B',
    paddingVertical: 10,
  },
  downloadNotesText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
});
export {styles};
