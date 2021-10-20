import { createContext } from 'react';

import useNav from './hooks/useNav';

const NavContext = createContext();

function NavProvider({ children }) {
  const {
    openNav, openManager, loading, handleClickNav, handleClickManager, stopLoading
  } = useNav();

  return (
    <NavContext.Provider value={{ openNav, openManager, loading, handleClickNav, handleClickManager, stopLoading  }}>
      {children}
    </NavContext.Provider>
  );
}

export { NavContext, NavProvider };