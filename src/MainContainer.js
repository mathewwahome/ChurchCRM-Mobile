import React from 'react';
import DrawerNavigator from './navigation/DrawerNavigator';

const MainContainer = ({userId, reloadNotes, setReloadNotes, setUserId}) => {
  return (
    <DrawerNavigator
      userId={userId}
      reloadNotes={reloadNotes}
      setReloadNotes={setReloadNotes}
      setUserId={setUserId}
    />
  );
};

export default MainContainer;
