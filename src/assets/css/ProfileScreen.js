import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#087E8B',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 30,
    paddingStart: 20,
    textAlign: 'right',
    color: 'white',
    padding: 10,
  },
  content: {
    flex: 4,
  },
  containerSection: {
    // flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: '#000000',
  },
  image_logo: {
    borderWidth: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#087E8B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
  },
  text: {
    color: '#000000',
  },
});
export {styles};
