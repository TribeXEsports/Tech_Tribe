'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot';
import { AnimatedSection } from '@/components/animated-section';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const companyPartners = [
   { name: 'Blockchain Orbit', logoUrl: '/partner/comp/blockchain_rbit.jpg', hint: 'Blockchain Orbit logo' },
    { name: 'BNG Esports', logoUrl: '/partner/comp/BNG_Esports.jpg', hint: 'BNG Esports logo' },
    { name: 'Edutech Life', logoUrl: '/partner/comp/Edutech_life.jpg', hint: 'Edutech Life logo' },
    { name: 'Growbinar', logoUrl: '/partner/comp/Growbinar.jpg', hint: 'Growbinar logo' },
    { name: 'ISKCON Gurugram', logoUrl: '/partner/comp/iscon_gurugram.jpg', hint: 'ISKCON Gurugram logo' },
    { name: 'TechFest IIT Bombay', logoUrl: '/partner/comp/TechFest_IIT_BOMBAY.jpg', hint: 'TechFest IIT Bombay logo' }
];

const universityChapters = [
    { name: 'K.R. Mangalam University', logoUrl: '/partner/uni/K_R_MANGALAM_UNIVERSITY.png', hint: 'K.R. Mangalam University logo' },
    { name: 'Manav Rachna University', logoUrl: '/partner/uni/MANAV_RACHNA_UNIVERSITY.png', hint: 'Manav Rachna University logo' }
];


// Animation Variants for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
    }
  },
};


export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <AnimatedSection id="partners-hero" className="relative text-center py-20 md:py-28 overflow-hidden">
             <div
              aria-hidden="true"
              className="absolute inset-0 top-1/2 -z-10 h-[200%] -translate-y-1/2"
            >
              <div className="mx-auto h-full w-full max-w-7xl">
                <div className="h-full w-full [mask-image:radial-gradient(50%_40%_at_50%_50%,rgba(0,10,25,0.8)_0%,transparent_100%)] bg-gradient-to-tr from-primary/20 to-primary/5" />
              </div>
            </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
                className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-headline"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Our Partners & Chapters
            </motion.h1>
            <motion.p 
                className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                We are proud to collaborate with leading companies and have active chapters at universities worldwide, all dedicated to fostering the next generation of tech talent.
            </motion.p>
          </div>
        </AnimatedSection>

        <AnimatedSection id="company-partners" className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl font-headline">Company Partners</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Our hackathons, workshops, and community events are made possible by the generous support of our industry partners.
              </p>
            </div>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {companyPartners.map((partner) => (
                <motion.div key={partner.name} variants={itemVariants}>
                  <Card className="group relative bg-card/50 h-full border-border/30 overflow-hidden shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-1">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4 aspect-[4/3]">
                      <div className="relative w-full h-16 transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src={partner.logoUrl}
                            alt={`${partner.name} Logo`}
                            fill
                            className="object-contain"
                            data-ai-hint={partner.hint}
                        />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm mt-2">{partner.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center mt-12">
                <Button asChild size="lg" className="font-semibold">
                    <Link href="/contact?subject=partnership-proposal">
                        Become a Sponsor <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="university-chapters" className="bg-card/40 py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl font-headline">University Chapters</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Our community is growing on campuses around the globe, led by passionate students who are the heart of Tech Tribex.
              </p>
            </div>
             <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
              {universityChapters.map((chapter) => (
                <motion.div key={chapter.name} variants={itemVariants}>
                    <Card className="group relative bg-background/50 h-full border-border/30 overflow-hidden shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-1">
                        <CardContent className="p-6 flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <Image
                                    src={chapter.logoUrl}
                                    alt={`${chapter.name} Logo`}
                                    fill
                                    className="object-cover rounded-full"
                                    data-ai-hint={chapter.hint}
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">{chapter.name}</h3>
                                <p className="text-muted-foreground mt-1">Official University Chapter</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
              ))}
            </motion.div>
             <div className="text-center mt-12">
                <Button asChild size="lg" className="font-semibold">
                    <Link href="/contact?subject=start-a-chapter">
                        Start a Chapter <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}