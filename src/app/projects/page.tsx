
'use client'

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot';
import PortfolioSection from '@/components/sections/portfolio-section';

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <PortfolioSection isPage={true} />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
