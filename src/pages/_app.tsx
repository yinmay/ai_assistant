import { AppProps } from "next/app";
import React,{useState} from "react";
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

// Use colorScheme prop directly on MantineProvider instead
export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <MantineProvider defaultColorScheme="dark">
            <Notifications position="top-right" zIndex={2000} />
      <Component {...pageProps} toggleColorScheme={toggleColorScheme}/>
      
    </MantineProvider>
  );
}