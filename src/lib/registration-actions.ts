'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

export type RegistrationFormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
};

function getFirebase() {
    const { firestore } = initializeFirebase();
    return { firestore };
}

export async function submitRegistrationForm(
  prevState: RegistrationFormState,
  formData: FormData
): Promise<RegistrationFormState> {
  'use server';

  const eventId = formData.get('eventId') as string;
  if (!eventId) {
    return { message: 'Event ID is missing.', status: 'error' };
  }

  const { firestore } = getFirebase();
  const rawFormData: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    if (key !== 'eventId') {
      rawFormData[key] = value;
    }
  }

  try {
    await addDoc(collection(firestore, "registrations"), {
      eventId,
      formData: rawFormData,
      submittedAt: serverTimestamp(),
    });
    
    return {
      message: 'Thank you for registering! We will be in touch with more details.',
      status: 'success',
    };

  } catch (error) {
    console.error("Error submitting registration:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
    return { 
        message: `An unexpected error occurred: ${errorMessage}`,
        status: 'error',
    }
  }
}
