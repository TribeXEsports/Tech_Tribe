'use client';

import React, { useEffect, useState, useActionState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot';
import { AnimatedSection } from '@/components/animated-section';
import { submitRegistrationForm, type RegistrationFormState } from '@/lib/registration-actions';
import { Loader2 } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { collection, query, where, onSnapshot, DocumentData, orderBy, limit } from 'firebase/firestore';

type FormFieldType = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url';
  required: boolean;
};

type EventType = {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  fields: FormFieldType[];
};


export default function RegisterPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [activeEvent, setActiveEvent] = useState<EventType | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  const [state, formAction, isPending] = useActionState<RegistrationFormState, FormData>(
    submitRegistrationForm,
    { message: "", status: "idle" }
  );

  const formSchema = useMemo(() => {
    if (!activeEvent) return z.object({});
    const schemaObject = activeEvent.fields.reduce((acc, field) => {
      let fieldSchema;
      switch (field.type) {
        case 'email':
          fieldSchema = z.string().email("Please enter a valid email address.");
          break;
        default:
          fieldSchema = z.string();
      }
      if (field.required) {
        fieldSchema = fieldSchema.min(1, `${field.label} is required.`);
      } else {
        fieldSchema = fieldSchema.optional();
      }
      acc[field.name] = fieldSchema;
      return acc;
    }, {} as Record<string, z.ZodType<any, any>>);
    return z.object(schemaObject);
  }, [activeEvent]);

 const defaultValues = useMemo(() => {
    if (!activeEvent) return {};
    return activeEvent.fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {} as Record<string, string>);
}, [activeEvent]);


  const form = useForm({
    resolver: formSchema ? zodResolver(formSchema) : undefined,
    defaultValues: defaultValues,
  });
  
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);


  useEffect(() => {
    if (!firestore) return;
    setLoadingEvent(true);
    const q = query(collection(firestore, 'events'), orderBy('createdAt', 'desc'), limit(1));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setActiveEvent(null);
      } else {
        const eventDoc = snapshot.docs[0];
        setActiveEvent({ id: eventDoc.id, ...eventDoc.data() } as EventType);
      }
      setLoadingEvent(false);
    });
    return () => unsubscribe();
  }, [firestore]);

  useEffect(() => {
    if (state.status === 'success' && state.message) {
      toast({
        title: "Registration Submitted!",
        description: state.message,
      });
      form.reset();
    } else if (state.status === 'error' && state.message) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, form]);

  const renderField = (field: FormFieldType) => {
     return (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <Input type={field.type} placeholder={field.label} {...formField} value={formField.value ?? ''} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  
  if(loadingEvent) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <AnimatedSection id="register" className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <Card className="border-2 border-primary/20 bg-card/50 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold font-headline">
                  {activeEvent ? activeEvent.name : 'Event Registration'}
                </CardTitle>
                <CardDescription>
                  {activeEvent ? (activeEvent.description || 'Sign up for our event below.') : 'There are no events scheduled at the moment. Please check back later!'}
                </CardDescription>
              </CardHeader>
              {activeEvent && (
                <CardContent>
                  {activeEvent.isActive ? (
                    <Form {...form}>
                      <form action={formAction} className="space-y-6">
                        <input type="hidden" name="eventId" value={activeEvent.id} />
                        {activeEvent.fields.map(renderField)}
                        <Button type="submit" className="w-full font-bold !mt-8" disabled={isPending}>
                          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Register Now
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <div className="text-center text-muted-foreground p-8">
                        Registrations for this event are currently closed.
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
