"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '../animated-section';
// 1. Import the new animation library
import { TypeAnimation } from 'react-type-animation';

export default function HeroSection() {
  return (
    <AnimatedSection as="div" className="relative text-center pt-24 pb-20 md:pt-32 md:pb-28">
       <div
          aria-hidden="true"
          className="absolute inset-0 top-1/2 -z-10 h-full -translate-y-1/2"
        >
          <div className="mx-auto h-full w-full max-w-7xl">
            <div className="h-full w-full [mask-image:radial-gradient(50%_50%_at_50%_50%,rgba(0,10,25,0.7)_0%,transparent_100%)] bg-gradient-to-tr from-primary/30 to-primary/10" />
          </div>
        </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Added a fixed height to the h1 to prevent layout shift during animation */}
        <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline min-h-[100px] md:min-h-[170px] lg:min-h-[110px]">
          {/* 3. Replaced the old TypingAnimation with the new, continuous one */}
          <TypeAnimation
              sequence={[
                'We are a Tech Community.',
                1500, // wait 1.5s
                'We are Visionary Builders.',
                1500, // wait 1.5s
                'We are Creative Innovators.',
                1500, // wait 1.5s
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              speed={40}
              className="inline-block"
            />
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
          We are a collective of developers, designers, and strategists from the Tech Tribex community, dedicated to building exceptional digital solutions and fostering the next generation of tech talent.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="font-bold w-full sm:w-auto">
            <Link href="/contact?subject=schedule_call">Schedule a Call</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="font-bold w-full sm:w-auto">
            <Link href="#community-pillars">Join Community</Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}