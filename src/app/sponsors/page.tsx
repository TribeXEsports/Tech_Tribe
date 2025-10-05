"use client";

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot';
import { AnimatedSection } from '@/components/animated-section';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Users, Zap } from 'lucide-react';

// The 'whySponsor' data remains as it explains the benefits to potential sponsors.
const whySponsor = [
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: 'Access Top Talent',
    description: 'Connect with thousands of skilled and passionate students, developers, and designers from our global community.',
  },
  {
    icon: <Eye className="w-8 h-8 text-primary" />,
    title: 'Brand Visibility',
    description: 'Showcase your brand, products, and APIs to a large, engaged audience through our hackathons, workshops, and online platforms.',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Community Engagement',
    description: 'Position your company as a leader in the tech ecosystem and give back to the community by supporting educational initiatives.',
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: 'Drive Innovation',
    description: 'Inspire creative solutions and see innovative applications of your technology by providing challenges and prizes at our events.',
  },
];


export default function SponsorsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <AnimatedSection id="sponsors-hero" className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-headline">
                Become a Sponsor
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                Partner with Tech Tribe to connect with top tech talent, enhance your brand, and support the next generation of innovators.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="why-sponsor" className="pt-0 py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground sm:text-4xl font-headline">Why Sponsor Tech Tribe?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {whySponsor.map((item, index) => (
                        <Card key={index} className="text-center bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20 p-4">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/10 rounded-full inline-flex">
                                    {item.icon}
                                </div>
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AnimatedSection>
        
        {/* START: Updated "Our Sponsors" section */}
        <AnimatedSection id="founding-partner" className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-foreground sm:text-4xl font-headline">Be Our Founding Partner</h2>
                </div>
                <div className="mt-8 max-w-4xl mx-auto text-center bg-card/50 p-8 rounded-lg border border-dashed border-border/50">
                    <p className="text-lg text-muted-foreground">
                        We are actively seeking our inaugural sponsors to build a foundational partnership. This is a unique opportunity to gain prominent visibility and be featured as a key supporter from the very beginning. Your collaboration will be instrumental in launching our community's initiatives.
                    </p>
                </div>
            </div>
        </AnimatedSection>
        {/* END: Updated "Our Sponsors" section */}

        <AnimatedSection id="become-a-sponsor" className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center bg-card/80 border border-border/50 p-8 md:p-12 rounded-lg shadow-xl">
                    <h3 className="text-2xl md:text-3xl font-bold font-headline">Ready to Partner With Us?</h3>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        We offer a variety of sponsorship packages and are happy to create a custom one that fits your company's goals. Let's talk.
                    </p>
                    <Button asChild className="mt-8 font-bold" size="lg">
                        <Link href="/contact?subject=sponsorship-inquiry">Contact Our Partnerships Team</Link>
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
