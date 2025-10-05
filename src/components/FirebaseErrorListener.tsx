// src/components/FirebaseErrorListener.tsx
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useUser } from '@/firebase';

function FirebaseErrorListener() {
  const { user } = useUser();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      // Stringify the context and user details
      const errorDetails = JSON.stringify(
        {
          ...error.context,
          auth: user // Automatically include current user's auth state
        },
        null,
        2
      );

      // Create a new Error with the enriched message
      const enrichedError = new Error(`${error.message}\n${errorDetails}`);
      enrichedError.stack = error.stack; // Preserve the original stack trace

      // Throw the enriched error to be caught by Next.js's overlay
      // This must be asynchronous to allow the error boundary to catch it
      setTimeout(() => {
        throw enrichedError;
      }, 0);
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [user]);

  return null; // This component does not render anything
}

// Only run this component in development
export default process.env.NODE_ENV === 'development' ? FirebaseErrorListener : () => null;
