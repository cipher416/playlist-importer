'use client';

import { useTheme } from 'next-themes'
import Image from "next/image";
import { useEffect, useState } from 'react';
type ThemedIconProps = {
  src: string;
}
export default function ThemedIcon({src}: ThemedIconProps) {
  const {theme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(()=> {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Image src={src} alt="icon" width={30} height={30} className={theme == 'forest' ? 'invert' : ''} priority />
  );

}