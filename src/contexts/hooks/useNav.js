import { useState } from 'react';

export default function useNav() {
  const [openNav, setOpenNav] = useState(false);
  const [openManager, setOpenManager] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClickNav = () => {
    setOpenNav(!openNav);
  };

  const handleClickManager = () => {
    setOpenManager(!openManager);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return { openNav, openManager, loading, handleClickNav, handleClickManager, stopLoading };
}