
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { usePathname } from 'next/navigation';
import { Badge } from "@/components/ui/badge";

const portfolioData: PortfolioItem[] = [
  { id: "1", title: "QuantumLeap Website", description: "A complete website redesign and development for a leading AI startup, focusing on performance, user engagement, and a modern aesthetic.", category: "Web Development", image: PlaceHolderImages.find(p => p.id === "portfolio1")!, tags: ["Web Development", "UI/UX"] },
  { id: "2", title: "Innovate Corp Branding", description: "Developed a new brand identity, including logo, color palette, typography, and marketing materials for a major tech corporation.", category: "Branding", image: PlaceHolderImages.find(p => p.id === "portfolio2")!, tags: ["Branding", "Design"] },
  { id: "3", title: "DataWeavers Automation", description: "Built custom internal tools to automate data processing and reporting, saving hundreds of operational hours per month.", category: "Automation", image: PlaceHolderImages.find(p => p.id === "portfolio3")!, tags: ["Automation", "Internal Tools"] },
  { id: "4", title: "Future Systems E-commerce", description: "Launched a full-featured e-commerce platform with custom checkout flows and advanced inventory management.", category: "E-commerce", image: PlaceHolderImages.find(p => p.id === "portfolio4")!, tags: ["E-commerce", "Web Development"] },
  { id: "5", title: "EcoBuilders Mobile App", description: "A cross-platform mobile app for a green construction company to manage projects, clients, and materials on the go.", category: "Mobile App", image: PlaceHolderImages.find(p => p.id === "portfolio5")!, tags: ["Mobile App", "Sustainability"] },
  { id: "6", title: "CloudPioneers Dashboard", description: "A real-time analytics dashboard for a cloud infrastructure provider, visualizing server loads, network traffic, and costs.", category: "Dashboard", image: PlaceHolderImages.find(p => p.id === "portfolio6")!, tags: ["Dashboard", "Data"] },
];

const categories = ["All", ...Array.from(new Set(portfolioData.map(item => item.category)))];

export default function PortfolioSection({ isPage = false }: { isPage?: boolean }) {
  const [filter, setFilter] = useState("All");

  const pathname = usePathname();
  const onPortfolioPage = pathname === '/portfolio' || pathname === '/projects';

  const isHomePage = pathname === '/';
  const projectsToShow = isHomePage ? portfolioData.slice(0, 2) : portfolioData;
  const dataToShow = onPortfolioPage || isPage ? projectsToShow : portfolioData.slice(0, 6);
  const filteredData = filter === "All" ? dataToShow : dataToShow.filter(item => item.category === filter);

  return (
    <AnimatedSection id="portfolio" className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            {isHomePage ? "Featured Projects" : "Our Work"}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {isHomePage 
              ? "A glimpse into the quality and creativity we bring to our clients, turning ambitious ideas into reality."
              : "We take pride in the solutions we've built. Explore some of our favorite projects that showcase our commitment to quality and innovation."
            }
          </p>
        </div>

        {(onPortfolioPage || isPage) && (
          <div className="mt-8 flex justify-center flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className="font-semibold"
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        <div className={cn(
          "mt-12 grid gap-8",
          isHomePage ? "sm:grid-cols-1 lg:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}>
          {filteredData.map(item => (
            <Link href="#" key={item.id}>
              <Card className="overflow-hidden group h-full flex flex-col bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={item.image.imageHint}
                  />
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex gap-2 mb-4">
                    {item.tags?.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm flex-grow">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
