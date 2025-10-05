'use client';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';
import { useMemo } from 'react';
import FirebaseErrorListener from '@/components/FirebaseErrorListener';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { firebaseApp, firestore, auth } = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      firestore={firestore}
      auth={auth}
    >
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
}
