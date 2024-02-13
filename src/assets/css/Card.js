import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    marginBottom: 20,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#087E8B',
    textAlignVertical: 'center',
  },

  notesDateText: {
    color: '#ffffff',
    position: 'absolute',
    bottom: 35,
    left: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  notesTopic: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  menuProvider: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  menuTrigger: {
    padding: 10,
  },
  menuOptions: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
});

export {styles};
