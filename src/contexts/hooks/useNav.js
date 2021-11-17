import { useState } from 'react';

export default function useNav() {
  const [openNav, setOpenNav] = useState(true);
  const [openTeacher, setOpenTeacher] = useState(false);
  const [openManager, setOpenManager] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClickNav = () => {
    setOpenNav(!openNav);
  };

  const handleClickTeacher = () => {
    setOpenTeacher(!openTeacher);
  };

  const handleClickManager = () => {
    setOpenManager(!openManager);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return { openNav, openTeacher, openManager, loading, handleClickNav, handleClickTeacher, handleClickManager, stopLoading };
}