
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/chatbot';
import { AnimatedSection } from '@/components/animated-section';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Code, Lightbulb, Bot, Rocket, Briefcase, Settings } from 'lucide-react';

const services = [
  {
    title: 'Website Development',
    tags: ['Web', 'Development'],
    description: 'From simple landing pages to complex web applications, we build fast, scalable, and secure websites using the latest technologies like Next.js and React.',
    features: [
      'Responsive Design',
      'E-commerce Solutions',
      'Content Management Systems (CMS)',
      'Web Hosting & Deployment',
    ],
    icon: <Code className="w-8 h-8 text-primary" />,
    buttonLink: '/contact?service=Website+Development',
  },
  {
    title: 'Logo, Poster & Banner Design',
    tags: ['Design', 'Branding'],
    description: "Crafting a unique visual identity is key. Our designers create memorable logos, engaging posters, and professional banners that capture your brand's essence.",
    features: [
      'Brand Identity Kits',
      'Vector Logo Design',
      'Marketing & Event Materials',
      'Social Media Graphics',
    ],
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    buttonLink: '/contact?service=Design',
  },
  {
    title: 'Business Automation',
    tags: ['Automation', 'Productivity'],
    description: 'We identify bottlenecks in your workflow and build custom automation solutions to save you time and reduce manual effort, using APIs and modern scripting.',
    features: [
      'Workflow Automation',
      'API Integration',
      'Custom Scripts & Tools',
      'Data Processing',
    ],
    icon: <Settings className="w-8 h-8 text-primary" />,
    buttonLink: '/contact?service=Business+Automation',
  },
  {
    title: 'Online Business Solutions',
    tags: ['Startup', 'Business'],
    description: 'Launching a new online venture? We provide end-to-end solutions, from initial strategy and MVP development to scaling your platform for a growing user base.',
    features: [
      'MVP Development',
      'SaaS Solutions',
      'Platform Strategy',
      'Scalability Consulting',
    ],
    icon: <Rocket className="w-8 h-8 text-primary" />,
    buttonLink: '/contact?service=Online+Business+Solutions',
  },
];

const CTACard = () => (
    <div className="bg-card/50 rounded-2xl p-8 sm:p-12 border border-border/30 shadow-lg">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-3xl font-bold font-headline">Ready to Start a Project?</h3>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Let's talk about your ideas. Schedule a free, no-obligation call with our team to discuss how we can help you achieve your goals.
        </p>
        <Button size="lg" className="mt-8 font-bold" asChild>
          <Link href="/contact">Schedule Your Free Consultation</Link>
        </Button>
      </div>
    </div>
  );

export default function ServicePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <AnimatedSection id="service" className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Our Services
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Leverage the talent of our community to build your next big thing. We offer a range of services designed to bring your ideas to life.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
                {services.map((service, index) => (
                    <Card key={index} className="flex flex-col bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-primary/10 rounded-lg inline-flex mb-4">
                                    {service.icon}
                                </div>
                                <div className="flex gap-2">
                                {service.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                </div>
                            </div>
                            <CardTitle className="font-headline">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription>{service.description}</CardDescription>
                            <div className="mt-6">
                                <h4 className="font-semibold mb-3">Key Features:</h4>
                                <ul className="space-y-2">
                                    {service.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                                            <Check className="w-4 h-4 text-primary" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full font-bold" asChild>
                                <Link href={service.buttonLink}>
                                    Inquire about {service.title}
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

          </div>
        </AnimatedSection>
        <AnimatedSection id="cta" className="py-12 md:py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <CTACard />
            </div>
        </AnimatedSection>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
