
'use client'
// src/app/layout.tsx
import { Provider } from 'react-redux';
import store from '../redux/store';
import { SnackbarProvider } from 'notistack';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-gray-100'>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            {children}
          </SnackbarProvider>
        </Provider>
      </body>
    </html>
  );
}
