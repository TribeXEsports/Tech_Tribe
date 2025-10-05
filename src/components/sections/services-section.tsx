
import { AnimatedSection } from '@/components/animated-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, PenTool, Settings } from 'lucide-react';
import Link from 'next/link';

const servicesData = [
  {
    icon: <Code className="w-10 h-10 text-primary" />,
    title: 'Website Development',
    description: 'We build modern, responsive, and high-performing websites to establish your online presence.',
    href: "/service"
  },
  {
    icon: <PenTool className="w-10 h-10 text-primary" />,
    title: 'Brand & Logo Design',
    description: 'Crafting unique logos, banners, and posters that tell your brand\'s story.',
    href: "/service"
  },
  {
    icon: <Settings className="w-10 h-10 text-primary" />,
    title: 'Business Automation',
    description: 'Streamline your workflow with custom automations tailored to your specific business needs.',
    href: "/service"
  },
];

export default function ServicesSection() {
  return (
    <AnimatedSection id="freelance-services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Freelance Agency Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            From stunning websites to powerful automation, we bring your vision to life with skill, passion, and creativity sourced from our talented community.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
             <Link href={service.href} key={service.title}>
                <Card className="h-full bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                    <CardHeader className="items-center text-center">
                        {service.icon}
                        <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
