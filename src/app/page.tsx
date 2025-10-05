
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot';
import HeroSection from '@/components/sections/hero-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Award, PartyPopper, Users } from 'lucide-react';
import ImpactSection from '@/components/sections/impact-section';
import CommunitySection from '@/components/sections/community-section';
import ServicesSection from '@/components/sections/services-section';
import PortfolioSection from '@/components/sections/portfolio-section';
import { AnimatedSection } from '@/components/animated-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const communityPillars = [
  {
    icon: <PartyPopper className="h-8 w-8 text-primary" />,
    title: "Global Events",
    description: "From hackathons to workshops, we host events that bring the community together to learn and innovate.",
    href: "/events"
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "University Chapters",
    description: "Our university chapters are the heart of our community, led by passionate students on a local level.",
    href: "/chapter"
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Industry Sponsors",
    description: "We partner with leading companies to create unique opportunities and experiences for our members.",
    href: "/sponsors"
  }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ImpactSection />
        <CommunitySection />
        <div className="py-12 md:py-16 bg-card">
            <ServicesSection />
             <div className="text-center mt-12">
                <Button asChild>
                    <Link href="/service">
                        Explore All Services <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
        <div className="py-12 md:py-16">
            <PortfolioSection />
            <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/portfolio">
                        View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
        
        <AnimatedSection id="community-pillars" className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold font-headline">
                  Join Our Thriving Community
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  Connect, learn, and grow with a network of passionate tech enthusiasts. Become part of something bigger.
                </p>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {communityPillars.map((pillar) => (
                  <Card key={pillar.title} className="text-center transition-transform transform hover:-translate-y-2 bg-card/50 border-border/50 hover:border-primary/50 shadow-lg hover:shadow-primary/20">
                    <CardHeader className="items-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        {pillar.icon}
                      </div>
                      <CardTitle className="mt-4">{pillar.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{pillar.description}</p>
                      <Button variant="link" asChild className="mt-4">
                        <Link href={pillar.href}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
        </AnimatedSection>
        
        <AnimatedSection id="sponsor-cta" className="py-12 md:py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold font-headline">
                Become a Sponsor
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Connect with emerging tech talent and showcase your brand to our vibrant community. Partner with us to inspire the next wave of innovation and gain visibility.
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/sponsors">
                    Sponsorship Opportunities <ArrowRight className="ml-2 h-5 w-5" />
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
