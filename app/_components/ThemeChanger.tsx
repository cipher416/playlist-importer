'use client';

import { useTheme } from 'next-themes'

export default function ThemeChanger() {
  const {theme, setTheme} = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'forest' ? 'emerald' : 'forest');
  };
  
  return (
    <input type="checkbox" className="toggle toggle-success"  onClick={toggleTheme}/>
  );

}