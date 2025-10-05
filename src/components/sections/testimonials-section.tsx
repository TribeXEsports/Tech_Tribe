"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import React from "react";

const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "Innovate Inc.",
    quote: "Working with Tech Tribex has been a game-changer for our business. Their expertise and dedication are unmatched.",
    image: PlaceHolderImages.find(p => p.id === "testimonial1")!,
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "QuantumLeap",
    quote: "The team at Tech Tribex delivered a product that exceeded our expectations. Their attention to detail is incredible.",
    image: PlaceHolderImages.find(p => p.id === "testimonial2")!,
  },
    {
    id: "3",
    name: "Emily Rodriguez",
    company: "Creative Solutions",
    quote: "I was impressed by their ability to understand our vision and translate it into a beautiful, functional application.",
    image: PlaceHolderImages.find(p => p.id === "testimonial3")!,
  },
  {
    id: "4",
    name: "David Lee",
    company: "NextGen Corp.",
    quote: "Their team is not only highly skilled but also a pleasure to work with. I highly recommend them.",
    image: PlaceHolderImages.find(p => p.id === "testimonial4")!,
  }
];

const TestimonialsSection = React.forwardRef<HTMLDivElement, { className?: string }>(({ className, ...props }, ref) => {
    return (
        <AnimatedSection id="testimonials" className="bg-card py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                What Our Clients Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We are proud to have partnered with amazing companies.
            </p>
            </div>
            <div
            className="mt-12 relative m-auto w-full max-w-6xl overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[50px] sm:before:w-[100px] before:bg-[linear-gradient(to_right,hsl(var(--card))_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[50px] sm:after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,hsl(var(--card))_0%,rgba(255,255,255,0)_100%)] after:content-['']"
            >
            <div className="animate-scroll flex gap-8">
                {[...testimonialsData, ...testimonialsData].map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-full sm:w-[calc(50%-1rem)] md:w-[calc(100%/3-2rem)]">
                    <Card className="h-full border-border/50 bg-background/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                    <CardContent className="flex flex-col p-6 gap-6">
                        <p className="text-muted-foreground italic flex-grow">&quot;{testimonial.quote}&quot;</p>
                        <div className="flex items-center gap-4">
                        <Image
                            src={testimonial.image.imageUrl}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="rounded-full border-2 border-primary/50 object-cover"
                            data-ai-hint={testimonial.image.imageHint}
                        />
                        <div>
                            <p className="font-semibold font-headline">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
                ))}
            </div>
            </div>
        </div>
        </AnimatedSection>
    );
});
TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
