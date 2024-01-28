import React, {useEffect} from 'react';
import DrawerNavigator from './navigation/DrawerNavigator';

const MainContainer = ({userId, reloadNotes, setReloadNotes}) => {
  useEffect(() => {
    if (userId !== undefined) {
      console.log('UserId:', userId);
    }
  }, [userId]);

  return <DrawerNavigator userId={userId} reloadNotes={reloadNotes} setReloadNotes={setReloadNotes}/>;
};

export default MainContainer;
