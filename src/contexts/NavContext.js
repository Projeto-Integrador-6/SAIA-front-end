import { createContext } from 'react';

import useNav from './hooks/useNav';

const NavContext = createContext();

function NavProvider({ children }) {
  const {
    openNav, openTeacher, openManager, loading, handleClickNav, handleClickTeacher, handleClickManager, stopLoading
  } = useNav();

  return (
    <NavContext.Provider value={{ openNav, openTeacher, openManager, loading, handleClickNav, handleClickTeacher, handleClickManager, stopLoading  }}>
      {children}
    </NavContext.Provider>
  );
}

export { NavContext, NavProvider };