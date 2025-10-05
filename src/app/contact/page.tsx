
'use client';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot';
import ContactSection from '@/components/sections/contact-section';
import { Suspense } from 'react';


function ContactPageContent() {
  return (
    <>
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageContent />
    </Suspense>
  )
}
