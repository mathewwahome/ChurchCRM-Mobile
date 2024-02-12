import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  notesContainer: {
    marginBottom: 20,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#087E8B',
    textAlignVertical: 'center',
    flexDirection: 'row',
  },
  notesDateText: {
    position: 'absolute',
    bottom: 35,
    left: 10,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notesTopic: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
 

});
export {styles};
